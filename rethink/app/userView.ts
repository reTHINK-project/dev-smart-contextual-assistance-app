import { Component, Input, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';
import { Params, Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { VideoService } from '../services/video.service';
import { ContextService } from '../services/context.service';

// Interfaces
import { User, Message } from '../models/models';

// Components
import { ContactBox } from '../comp/user/contact-box.comp';
import { VideoContactBox } from '../comp/user/video-contact-box.comp';
import { ContentBox } from '../comp/user/content-box.comp';
import { NotificationBox } from '../comp/user/notification.comp';

import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/userView.html',
  directives: [
    ROUTER_DIRECTIVES,
    FileShareListComponent, ContactBox, ContentBox,
    VideoContactBox, NotificationBox,
    ContextMenuComponent, ContextSenderComponent
  ]
})
export class UserView implements OnInit {
  @HostBinding('class') hostClass = 'content-panel'
  @HostBinding('id') id = 'user-view'

  action:string = 'init';
  otherStream:any;
  myStream:any;

  private haveNotification = false;
  private chatActive = false;
  private videoController:any;
  private current:string;

  private contact: Observable<User>
  private messages: Observable<Message[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private contextService: ContextService,
    private chatService: ChatService,
    private videoService: VideoService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      let context = params['context']; // (+) converts string 'id' to a number
      let task = params['task'];
      let userID = params['id'];

      this.contextService.setContextPath = context;
      this.contextService.setTaskPath = task;

      this.onRouteActivated(userID);

    });

  }

  onRouteActivated(userID: string) {

    console.log('[User View on Route Activated]', userID);

    this.messages = this.contextService.messageList;

    // Get current contact
    this.contact = this.contextService.getUser(userID);

    this.contact.subscribe((user:User) => {

      console.log('Prepare chat:', user);

      this.prepareChat(user);
    }).unsubscribe();

  }

  prepareChat(user:User) {

    // TODO: Optimize this process
    // Creating the Work Context
    let parent = this.contextService.getTaskPath;
    console.info('Create chat service for user ', user);
    let users: string[] = [];
    users.push(user.userURL);

    this.chatService.create(user.userURL, users, ['hybroker.rethink.ptinovacao.pt'], parent).then((result: any) => {
      console.info('the chat is ready to be used ', result);
      this.chatActive = true;
    }).catch((reason) => {
      console.error(reason);
    });

  }

  onMessage(message:string) {

    this.chatService.send(message).then((message:any) => {
      // this._updateView();
    })

  }

  // activateVideo() {
  //
  //   this.videoService.hypertyVideo.addEventListener('connector:connected', (controller: any) => {
  //
  //     this.videoController = controller;
  //     this.videoController.addEventListener('stream:added', this._processVideo);
  //     this.videoService.hypertyVideo.addEventListener('have:notification', (event: any) => {
  //       // notificationHandler(controller, event);
  //       console.log('have:notification', controller, event);
  //
  //       this.haveNotification = true;
  //       this.owner = event.identity.infoToken;
  //
  //     });
  //
  //   });
  // }

  onAudioCall() {
    console.log('Make a audio call');

    this.action = 'audio';
    // this.videoService.getHyperty();
  }

  onVideoCall() {
    console.log('Make a video call');
    //this.action = 'video';

    let options = {video: true, audio: true};
    let mediaStream: any;

    this.getUserMedia(options).then((stream) => {
      this.action = 'video';
      mediaStream = stream;

      // return this.videoService.hypertyVideo.connect(this.contact.email, mediaStream);
    }).then((controller) => {
      this.myStream = URL.createObjectURL(mediaStream)
      this.videoController = controller;
      this.videoController.addEventListener('stream:added', this.processVideo);
    })

  }

  onAcceptCall() {

    let options = {video: true, audio: true};

    this.getUserMedia(options).then((mediaStream) => {
      this.action = 'video';
      this.myStream = URL.createObjectURL(mediaStream)
      return this.videoController.accept(mediaStream)
    }).then((result) => {
      console.info('call accepted');
    }).catch((reason) => {
      console.info('Call is not accpeted')
    })
  }

  onRejectCall() {

  }

  private notification(event: any) {
    console.log('NOTIFICATION: ', event);

    this.action = 'video';
  }

  private processVideo(event: any) {
    console.log('[Process External Video]: ', event);
    this.otherStream = URL.createObjectURL(event.stream)

    this.action = 'video';
  }

  private updateView() {
    // // TODO: Optimize this to on resize
    let $ele = $(document);
    let contentHeight = $ele.height();
    let profile = 127;
    let sender = 62;
    let margin = 60;
    let height = contentHeight - (profile + sender + margin);

    console.log('update View', height, $ele)

    let scrollable = $ele.find('div[content-box]').height(height);
  }

  /*private getChat(context: ContextualComm) {
    console.log('Have this context: ', context);
    // console.log('Get a chat resource or create a new one with ', this.contact.name);

    this.context = context;

    // if (this.chatService.chat && context) {
    //   return this.chatService.join(context.resource);
    // } else {
    //   return this.chatService.create(this.contact.name, [this.contact])
    //   .then((chat) => this._createNewContext(chat))
    //   .catch((reason) => {
    //     console.log('ERROR CREATING THE CHAT SERVICE');
    //   })
    // }

  }

  private getContext(contact: Contact) {
    console.log('Get Context for this contact: ', contact);
    this.contact = contact;
    // return this.contextService.getContextByName(contact.name)
  }*/

  private getUserMedia(constraints: any) {
    return new Promise((resolve, reject) => {

      navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream: any) => {
          console.log('Stream: ', mediaStream);
          resolve(mediaStream);
        })

    });

  }

}
