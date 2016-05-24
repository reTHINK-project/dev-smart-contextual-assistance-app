import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';

// Services
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { VideoService } from '../services/video.service';
import { ContextService } from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';

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
  ],
  providers: [
    ChatService,
    VideoService
  ]
})
export class UserView implements OnActivate {
  @HostBinding('class') hostClass = 'content-panel'
  @HostBinding('id') id = 'user-view'

  @Output() contact:Contact
  @Output() context:Context
  @Output() action:string = 'init'
  @Output() owner:Contact
  @Output() otherStream:any
  @Output() myStream:any

  private haveNotification = false
  private hypertyChat: any
  private hypertyVideo: any
  private chat:any
  private chatActive = false
  private videoController:any
  private current:string

  constructor(
    private appService: AppService,
    private contextService: ContextService,
    private chatService: ChatService,
    private videoService: VideoService
  ) {}

  ngOnInit() {

    this.appService.runtimeReady.subscribe(() => {

      this.chatService.getHyperty().then((hypertyChat) => {
        this.hypertyChat = hypertyChat;
        return this.videoService.getHyperty();
      })
      .then((hypertyVideo) => {
        this.hypertyVideo = hypertyVideo;

        this.activateChat();
        this.activateVideo();

        this._updateView();
      })

    })
  }

  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('id');
    this.current = id;

    if (this.chat) {
      this.activateChat();
    } else {
      console.log('[Loading the hyperty chat]');
      // this.chatService.getHyperty();
      console.log('[Loading the hyperty video]');
      // this.videoService.getHyperty();
    }

  }

  activateChat() {

    this.appService.getContact(this.current)
    .then((contact) => this._getContext(contact))
    .catch((reason) => { console.log('create chat and new context') })
    .then((context:Context) => this._getChat(context))
    .then((context) => {
      this.chatActive = true

      console.log('AQUI:', this.contact, this.context, this.chat);
      // this.context = context;

      this.chat.addEventListener('new:message:recived', this._newMessage);

    }).catch((reason) => { console.error(reason); })
  }

  activateVideo() {

    this.hypertyVideo.addEventListener('connector:connected', (controller: any) => {

      this.videoController = controller;
      this.videoController.addEventListener('stream:added', this._processVideo);
      this.hypertyVideo.addEventListener('have:notification', (event: any) => {
        // notificationHandler(controller, event);
        console.log('have:notification', controller, event);

        this.haveNotification = true;
        this.owner = event.identity.infoToken;

      });

    });
  }

  onMessage(message: string) {

    console.log('MESSAGE:', message, this.chat);

    // resource:string, contact:Contact, type: ActivityType, status:string, message:string
    this.contextService.updateContextActivity(
      this.chat.dataObject.url,
      this.contact,
      'message',
      'ok',
      message
    ).then((context) => {

      console.log('Update the context:', context);
      this.chat.send(message)
      this.context = context;
    })

  }

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

    this._getUserMedia(options).then((stream) => {
      this.action = 'video';
      mediaStream = stream;

      return this.hypertyVideo.hypertyDiscovery.discoverHypertyPerUser(this.contact.email, '')
    })
    .then((userHyperty) => {
      console.log('[Hyperty Video]:', this.hypertyVideo);

      return this.hypertyVideo.connect(userHyperty.hypertyURL, mediaStream);
    }).then((controller) => {
      this.myStream = URL.createObjectURL(mediaStream)
      this.videoController = controller;
      this.videoController.addEventListener('stream:added', this._processVideo);
    })

  }

  onAcceptCall() {

    let options = {video: true, audio: true};

    this._getUserMedia(options).then((mediaStream) => {
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

  private _notification(event: any) {
    console.log('NOTIFICATION: ', event);

    this.action = 'video';
  }

  private _processVideo(event: any) {
    console.log('[Process External Video]: ', event);
    this.otherStream = URL.createObjectURL(event.stream)

    this.action = 'video';
  }

  private _newMessage(message: any) {

    console.log('New Message:', message);

  }

  private _updateView() {
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

  private _getChat(context: Context) {
    console.log('Have this context: ', context);
    console.log('Get a chat resource or create a new one with ', this.contact.name);

    this.context = context;

    if (this.chatService.chat && context) {
      return this.chatService.join(context.resource);
    } else {
      return this.chatService.create(this.contact.name, [this.contact])
      .then((chat) => this._createNewContext(chat))
      .catch((reason) => {
        console.log('ERROR CREATING THE CHAT SERVICE');
      })
    }

  }

  private _getContext(contact: Contact) {
    console.log('Get Context for this contact: ', contact);
    this.contact = contact;
    return this.contextService.getContextByName(contact.name)
  }

  private _createNewContext(chat: any) {
    console.info('creating a new one', chat);

    // name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private'
    return new Promise<Context>((resolve, reject) => {
      this.contextService.createContext(
        this.contact.name,
        chat.dataObject.url,
        chat.dataObject.participants,
        [],
        'private'
      ).then((context) => {
        this.chat = chat;
        this.context = context;
        resolve(context)
      })
    })
  }

  private _getUserMedia(constraints: any) {
    return new Promise((resolve, reject) => {

      navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream: any) => {
          console.log('Stream: ', mediaStream);
          resolve(mediaStream);
        })

    });

  }

}
