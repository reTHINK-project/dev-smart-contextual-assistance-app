import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Router, Routes, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

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
export class ActivityView {
  @HostBinding('class') hostClass = 'content-panel'

  chat: any
  chatActive = false
  activities: Activity[] = []

  haveNotification = false
  owner: any
  me: Contact

  constructor(
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService,
    private videoService: VideoService
  ) {}

  ngOnInit() {

    this.me = this.appService.me;

    this.contextService.getContextByName('Work').then((context:Context) => {
      this.activities = context.activities
    })
  }

  routerOnActivate(curr: RouteSegment): void {
    //let domain = curr.getParam('domain')
    let resource = curr.getParam('resource')
    let url = 'comm://hybroker.rethink.ptinovacao.pt/' + resource

    console.log('[Chat URL] ', url, this.chatService.hypertyChat)
    if (resource) {
      this.chatService.join(url).then((chat: any) => {
        this.chatActive = true
        this.prepareChat(chat);
      })
    } else {
      this.chatService.hypertyChat.addEventListener('chat:subscribe', (chat: any) => {
        this.chatActive = true
        this.prepareChat(chat);
      });
    }

    this.prepareVideo();
    this._updateView();

  }

  onMessage(message: string) {
    console.log('Send Message: ', message);
    this.chat.send(message)
  }


  prepareChat(chat: any) {

    console.log('Prepare Chat:', chat);

    chat.addEventListener('new:message:recived', (msg: any) => {
      console.log('[New Message]', msg);

      //FIX: my on messages are without identity !
      if (msg.identity) {
        //TODO: replace by contact search...
        let contact: Contact = {
          id: msg.identity.identity,
          name: msg.identity.infoToken.name,
          status: 'online',
          avatar: msg.identity.infoToken.picture,
          email: msg.identity.infoToken.email
        }

        let activity = <Activity>{ contact: contact, type: 'message', date: new Date().toJSON(), message: msg.value.chatMessage, read: false }

        this.contextService.getContextByResource(msg.url).then((context:Context) => {

          context.activities.push(activity);
          console.log('[Context Exists]:', context);

        }).catch((reason: any) => {

          this._createNewContext(msg, activity).then((context:Context) => {
            console.log('[Context Created]: ', context);
          })

        })
        // this.activities.push({ contact: contact, type: 'message', date: new Date().toJSON(), message: msg.value.chatMessage })
      }

      // console.log('Activities: ', this.activities);

    });
  }

  prepareVideo() {
    console.log('[Hyperty Video is ready]');
    this.videoService.hypertyVideo.addEventListener('connector:connected', (controller: any) => {

      console.log('[Hyperty Video is connected]: ', controller);

      // this.videoController = controller;
      // this.videoController.addEventListener('stream:added', this._processVideo);
      this.videoService.hypertyVideo.addEventListener('have:notification', (event: any) => {
        // notificationHandler(controller, event);
        console.log('have:notification', controller, event);

        this.owner = event.identity.infoToken;
        this.haveNotification = true;
      });

    });

  }

  private _createNewContext(msg: any, activity:Activity) {
    console.info('creating a new one', msg);

    // name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private'
    return new Promise<Context>((resolve, reject) => {
      this.contextService.createContext(
        msg.identity.infoToken.name,
        msg.url,
        [],
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

    $ele.find('div[user]').css({'overflow-y': 'scroll'});
    let scrollable = $ele.find('div[user]').height(height);

  }

}
