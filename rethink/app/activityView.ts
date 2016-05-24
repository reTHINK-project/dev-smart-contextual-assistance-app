import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

// Components
import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

// Interfaces
import { Contact } from '../comp/contact/contact'
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
    ActivityListComponent, FileShareListComponent,
    ContextMenuComponent, ContextSenderComponent
  ]
})
export class ActivityView {
  @HostBinding('class') hostClass = 'content-panel'

  chat: any
  chatActive = false
  activities: Activity[] = []

  constructor(
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.appService.getActivities().then((activities) => {
      this.activities = activities
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
        this.prepareChat(chat);
      });
    }

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

        this.activities.push({ contact: contact, type: 'message', date: new Date().toJSON(), message: msg.value.chatMessage })
      }

    });
  }

}
