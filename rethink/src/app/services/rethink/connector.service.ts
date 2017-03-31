import { Injectable, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

// Utils
import { getUserMedia } from '../../utils/utils';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';

import { IAlert, AlertType } from '../../models/app.models';
import { User } from '../../models/models';
import { NotificationService } from '../notification.service';

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConnectorService {

  private hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector'
  private runtime: any;
  private _onInvitation: any;
  private controller: any;
  private hyperty: any
  private hypertyVideo: any

  private _localStream:Subject<MediaStream> = new Subject();
  private _remoteStream:Subject<MediaStream> = new Subject();

  private _mode:string;

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
  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyVideo) {

        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyVideo = hyperty.instance;
          this.hyperty = hyperty
          this.prepareHyperty();
          resolve(this.hyperty);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        })
      } else {
        resolve(this.hyperty);
      }

    })
  }

  prepareHyperty() {

    this.hypertyVideo.onInvitation((controller:any, identity:any) => {

      console.log('ON onInvitation: ', controller, identity);
      this.mode = controller.dataObjectObserver.data.mode;

      console.log('[Connector Service] - user: ', this, identity, this.contactService.getUser(identity.userURL));

      this.controller = controller;
      let currUser:User = this.contactService.getUser(identity.userURL);

      this.notificationService.addNotification(AlertType.QUESTION, {
        user: currUser,
        message: 'New call is incomming from ' + currUser.username,
        action: this._mode
      }, (alert:IAlert) => {
        this._notificationResponse.apply(this, [controller, alert, currUser]);
      });

      this.prepareController(controller);

      if (this._onInvitation) this._onInvitation(controller, identity);

    });

  }

  private prepareController(controller:any) {

    controller.onAddStream((event:any) => {
      console.log('[Connector Service - Add Stream] - Local Stream:', event);
      this._localStream.next(event.stream);
    });

    controller.onAddRemoteStream((stream:MediaStream) => {
      console.log('[Connector Service - Add Stream] - Remote Stream:', stream);
      this._remoteStream.next(stream);
    })

/*    controller.onDisconnect(function(identity) {
      disconnecting();
    });*/

  }

  private _notificationResponse(controller:any, response:IAlert, user:User) {

    console.log('[Connector Service] - notification response: ', response, this);

    if (response) {
      let options = {video: true, audio: true};

      return getUserMedia(options).then((mediaStream:MediaStream) => {
        this._remoteStream.next(mediaStream);
        return this.controller.accept(mediaStream);
      })
      .then((accepted) => {
        console.log('[Connector Service] - accept response:', accepted, this.mode);

        let navigationExtras: NavigationExtras = {
          queryParams: { 'action': this.mode }
        };

        console.log('[Connector Service] - ', this.router, this.router.url, encodeURIComponent(user.username));

        if (this.router.url.includes(encodeURIComponent(user.username))) {
          this.router.navigate([this.router.url], navigationExtras);
        } else {
          this.router.navigate([this.router.url, decodeURIComponent(user.username)], navigationExtras);
        }

      }).catch((reason) => {
        console.error(reason);
      });

    }

  }

  connect(userURL:string, options:any, name:string, domain:string) {

    return getUserMedia(options).then((mediaStream:MediaStream) => {

      this._localStream.next(mediaStream);

      return this.hypertyVideo.connect(userURL, mediaStream, name, domain)
    }).then((controller:any) => {
      console.log('[Connector Service] - connect:', controller);
      this.prepareController(controller);
      return controller;
    }).catch((reason:any) => {
      console.error('reason:', reason);
    })

  }

  onInvitation(callback:Function) {
    this._onInvitation = callback;
  }

  getRemoteStream():Observable<SafeUrl> {
    return this._remoteStream.map((stream:MediaStream) => {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
    })
  }

  getLocalStream():Observable<SafeUrl> {
    return this._localStream.map((stream:MediaStream) => {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
    })
  }

}
