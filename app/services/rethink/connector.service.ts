import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';

// Utils
import { isAnUser, clearMyUsername, getUserMedia, splitFromURL } from '../../utils/utils';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';

import { IAlert, AlertType } from '../../models/app.models';
import { User } from '../../models/models';
import { NotificationService } from '../notification.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const STATUS = { INPROGRESS: 'in-progress', END: 'end'};

@Injectable()
export class ConnectorService {

  private hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector';
  private controllers: any = {};
  private hyperty: any;
  private hypertyVideo: any;

  private paramsSubscription: Subscription;

  private callInProgress = false;
  private _webrtcMode = 'offer';

  public get connectorMode(): string {
    return this._webrtcMode;
  }

  public set connectorMode(value) {
    this._webrtcMode = value;
  }

  private _localStream: Subject<MediaStream> = new Subject();
  private _remoteStream: ReplaySubject<MediaStream> = new ReplaySubject();

  private _connectorStatus: Subject<string> = new Subject<string>();

  private _mode: string;

  public get mode(): string {
    return this._mode;
  }

  public set mode(value: string) {
    console.log('[Connector Service] - set mode: ', value);
    this._mode = value;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private contactService: ContactService,
    private notificationService: NotificationService,
    private appService: RethinkService) {

      console.log('[Connector Service] - constructor', this.router);

      this.paramsSubscription = this.router.events.subscribe((event: NavigationEnd) => {

        if (event instanceof NavigationEnd) {
          console.log('[Connector Service] - query params changes:', event, event['action'], this.mode, this.callInProgress);
          if (!this.callInProgress) { this.acceptCall(); }
        }

      });

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyVideo) {

        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyVideo = hyperty.instance;
          this.hyperty = hyperty;
          this.prepareHyperty();
          resolve(this.hyperty);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        });
      } else {
        resolve(this.hyperty);
      }

    });
  }

  acceptCall() {

    console.log('[Connector Service] - AcceptCall: ', this.controllers, this.controllers.hasOwnProperty('ansewer'));
    console.log('[Connector Service] - AcceptCall: ', this._webrtcMode);

    if (this.controllers && this.controllers.hasOwnProperty('answer') && this._webrtcMode === 'answer') {

      let options = {video: true, audio: true};

      getUserMedia(options).then((mediaStream: MediaStream) => {
        this._localStream.next(mediaStream);
        return this.controllers[this._webrtcMode].accept(mediaStream);
      }).then((accepted) => {
        this.callInProgress = true;

        this._connectorStatus.next(STATUS.INPROGRESS);

        console.log('[Connector Service] - accept response:', this.mode);

      if (this.mode === 'audio') {
        this.controllers[this._webrtcMode].disableVideo();
      }

      }).catch((reason) => {
        console.error(reason);
      });

    } else {
      // console.error('error accepting call', this.controllers, this.controllers.hasOwnProperty('ansewer'), this._webrtcMode);
    }

  }

  prepareHyperty() {

    this.hypertyVideo.onInvitation((controller: any, identity: any) => {

      console.log('[Connector Service] - on Invitation:', controller, identity);

      let metadata = controller.dataObjectObserver.metadata;
      this.mode = controller.dataObjectObserver.data.mode;
      this._webrtcMode = 'answer';
      this.prepareController(controller);

      let currUser: User = this.contactService.getUser(identity.userURL);

      this.notificationService.addNotification(AlertType.QUESTION, {
        user: currUser,
        message: 'New call is incomming from ' + currUser.username,
        action: this._mode
      }, metadata, (alert: IAlert) => {
        this._notificationResponse(controller, alert, currUser);
      });

    });

  }

  private _notificationResponse(controller: any, response: IAlert, user: User) {

    console.log('[Connector Service] - notification response: ', response, this);

    if (response) {

      let navigationExtras: NavigationExtras = {
        queryParams: { 'action': this.mode }
      };

      let metadata = response.metadata;
      let currentUser = this.contactService.sessionUser.username;
      let paths: any = splitFromURL(metadata.name, currentUser);

      console.log('[Connector Service] -  navigate to: ', paths);
      console.log('[Connector Service] -  navigate to: ', paths.context, paths.task, paths.user);

      let navigationArgs = [paths.context];
      let userTo;

      if (isAnUser(paths.task)) {
        userTo = clearMyUsername(paths.task, currentUser);
      } else {
        navigationArgs.push(paths.task);
        userTo = clearMyUsername(paths.user, currentUser);
      }

      navigationArgs.push('user');
      navigationArgs.push(userTo);

      console.log('[Connector Service] -  navigate to path: ', navigationArgs);

      this.router.navigate(navigationArgs, navigationExtras);

    } else {
      controller.decline();
    }

  }

  connect(userURL: string, options: any, name: string, domain: string) {

    this._webrtcMode = 'offer';

    return getUserMedia(options).then((mediaStream: MediaStream) => {
      this._localStream.next(mediaStream);
      return this.hypertyVideo.connect(userURL, mediaStream, name, domain);
    }).then((controller: any) => {
      console.log('[Connector Service] - connect:', controller);

      this.callInProgress = true;

      this.prepareController(controller);

      return controller;
    }).catch((reason: any) => {
      console.error('reason:', reason);
    });

  }

  prepareController(controller: any) {

    console.log('[Connector Service - Prepare Controller] - mode: ' + this._webrtcMode + ' Controllers: ', this.controllers);
    this.controllers[this._webrtcMode] = controller;

    controller.onAddStream((event: any) => {
      console.log('[Connector Service - Add Stream] - Remote Stream:', event);
      this._remoteStream.next(event.stream);

      if (this.mode === 'audio') {
        controller.disableVideo();
      }

    });

    controller.onDisconnect((identity: any) => {
      console.log('[Connector Service - onDisconnect] - onDisconnect:', identity);

      let navigationExtras: NavigationExtras = {
        queryParams: {},
        relativeTo: this.route
      };

      this.router.navigate([], navigationExtras);
      this._connectorStatus.next(STATUS.END);
    });

  }

  getRemoteStream(): Observable<SafeUrl> {
    return this._remoteStream.map((stream: MediaStream) => {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
    }).publishReplay(1).refCount();
  }

  getLocalStream(): Observable<SafeUrl> {
    return this._localStream.map((stream: MediaStream) => {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
    }).publishReplay(1).refCount();
  }


  connectorStatus(): Subject<string> {
    return this._connectorStatus;
  }

  enableVideo() {
    this.controllers[this._webrtcMode].disableVideo(true);
  }

  disableVideo() {
    this.controllers[this._webrtcMode].disableVideo(false);
  }

  disableAudio() {
    this.controllers[this._webrtcMode].disableAudio();
  }

  mute() {
    this.controllers[this._webrtcMode].mute();
  }

  hangup() {
    this.callInProgress = false;
    this.controllers[this._webrtcMode].disconnect();
    this._connectorStatus.next(STATUS.END);
    this._remoteStream = new ReplaySubject();
    this.connectorMode = 'offer';

    console.log('[Connector Service - hangup]: ', this);
  }

}
