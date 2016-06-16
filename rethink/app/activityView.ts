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
import { Context } from '../comp/context/context'
import { Activity } from '../comp/activity/activity'

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
@Routes([
  {path: '/:resource', component: this}
])
export class ActivityView implements OnActivate {
  @HostBinding('class') hostClass = 'content-panel'

  chatActive = false
  activities: Activity[] = []

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

    this.chatService.onInvitation((event: any) => {
      console.log('[Activity View - onInvitation] ', event);
    })
  }

  routerOnActivate(curr: RouteSegment): void {
    let context = curr.getParam('context')

    console.log('Context:', context);

    this.chatService.create(context, []).then((result: any) => {
      console.log('Create chat service for all my contacts', result);

      return this.contextService.getContextByName(context)
    }).then((context:Context) => {

      console.log('Contextes: ', context);

      // this.contacts = context.contacts;
    }).catch((reason) => {
      console.log('Error: ', reason);
    })
  }

  onMessage(message: string) {
    console.log('Send Message: ', message);
    this.chatService.send(message)
  }

  prepareChat(chat: any) {

    this.chatService.onMessage((message: any) => {
      console.log('[Activity View - onMessage] ', message);
    });

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

  private _createNewContext(msg: any, contact:Contact, activity:Activity) {
    console.info('creating a new one', msg);

    // name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private'
    return new Promise<Context>((resolve, reject) => {
      this.contextService.createContext(
        msg.identity.infoToken.name,
        msg.url,
        [contact],
        [activity],
        'private'
      ).then((context) => {
        resolve(context)
      })
    })
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
