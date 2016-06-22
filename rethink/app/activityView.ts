import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Router, Routes, RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';

// Components
import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';
import { NotificationBox } from '../comp/user/notification.comp';

// Interfaces
import { Contact } from '../comp/contact/contact'
import { Activity } from '../comp/activity/activity'

import { ContextualComm, ContextualCommTaskUser } from '../models/ContextualComm';
import { ChatMessage } from '../models/Communication';
import { Context } from '../models/Context';

// Services
import { ChatService } from '../services/chat.service';
import { VideoService } from '../services/video.service';
import { AppService }     from '../services/app.service';
import { ContextService }     from '../services/context.service';


@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/activityView.html',
  directives: [
    ROUTER_DIRECTIVES,
    NotificationBox,
    ActivityListComponent, FileShareListComponent,
    ContextMenuComponent, ContextSenderComponent
  ]
})

export class ActivityView implements OnActivate {
  @HostBinding('class') hostClass = 'content-panel'

  chatActive = false
  messages:ChatMessage[] = [];

  haveNotification = false
  owner: any

  constructor(
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    // this.contextService.getContextByName('Work').then((context:Context) => {
    //   this.activities = context.activities
    // })

    this.contextService.contextUsers.subscribe((update: any) => {
      console.log('UPDATE: ', update);
    })

    this.chatService.onInvitation((event: any) => {
      console.log('[Activity View - onInvitation] ', event);
    })
  }

  routerOnActivate(curr: RouteSegment): void {
    let context = curr.getParam('context')
    let task = curr.getParam('task')

    console.log('Context:', context);
    console.log('Task:', task);

    this.chatService.create(context, []).then((result: any) => {
      console.log('Create chat service for all my contacts', result);

      this.chatActive = true;

      return this.contextService.getContextByName(context)
    }).then((context:ContextualComm) => {

      console.log('Contextes: ', context);

      // this.contacts = context.contacts;
    }).catch((reason) => {
      console.log('Error: ', reason);
    })

    this.chatService.onMessage((message: any) => {
      console.log('[Activity View - onMessage] ', message);


    });
  }

  onMessage(message: string) {
    console.log('Send Message: ', message);

    this.chatService.send(message).then((message:ChatMessage) => {
      console.log('Message Sended: ', message);
      this.messages.push(message);
    })
  }

  prepareChat(chat: any) {

    // this.chatService.onMessage((message: any) => {
    //   console.log('[Activity View - onMessage] ', message);
    // });

    // chat.addEventListener('new:message:recived', (msg: any) => {
    //   console.log('[New Message]', msg);
    //
    //   //FIX: my on messages are without identity !
    //   if (msg.identity) {
    //     //TODO: replace by contact search...
    //     let contact: Contact = {
    //       id: msg.identity.identity,
    //       name: msg.identity.infoToken.name,
    //       status: 'online',
    //       avatar: msg.identity.infoToken.picture,
    //       email: msg.identity.infoToken.email,
    //       userURL: msg.identity.userURL
    //     }
    //
    //     let activity = <Activity>{ contact: contact, type: 'message', date: new Date().toJSON(), message: msg.value.chatMessage, read: false }
    //
    //     this.contextService.getContextByResource(msg.url).then((context:Context) => {
    //
    //       context.activities.push(activity);
    //       console.log('[Context Exists]:', context);
    //
    //     }).catch((reason: any) => {
    //
    //       this._createNewContext(msg, contact, activity).then((context:Context) => {
    //         console.log('[Context Created]: ', context);
    //       })
    //
    //     })
    //     // this.activities.push({ contact: contact, type: 'message', date: new Date().toJSON(), message: msg.value.chatMessage })
    //   }
    //
    //   // console.log('Activities: ', this.activities);
    //
    // });
  }

  prepareVideo() {
    console.log('[Hyperty Video is ready]');
    if (!this.videoService.hypertyVideo) return;

    // this.videoService.hypertyVideo.addEventListener('connector:connected', (controller: any) => {
    //
    //   console.log('[Hyperty Video is connected]: ', controller);
    //
    //   // this.videoController = controller;
    //   // this.videoController.addEventListener('stream:added', this._processVideo);
    //   this.videoService.hypertyVideo.addEventListener('have:notification', (event: any) => {
    //     // notificationHandler(controller, event);
    //     console.log('have:notification', controller, event);
    //
    //     this.owner = event.identity.infoToken;
    //     this.haveNotification = true;
    //   });
    //
    // });

  }

  private _updateView() {
    // // TODO: Optimize this to on resize
    let $ele = $(document);
    let contentHeight = $ele.height();
    let sender = 62;
    let margin = 60;
    let height = contentHeight - (sender + margin);

    console.log('update View', height, $ele)

    $ele.find('ul[activity-list]').css({'overflow-y': 'scroll'});
    let scrollable = $ele.find('ul[activity-list]').height(height);

  }

}
