import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

// Components
import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';
import { NotificationBox } from '../comp/user/notification.comp';

// Interfaces
import { Contact } from '../comp/contact/contact'
import { Activity } from '../comp/activity/activity'

import { Context, User, Message } from '../models/models';

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

export class ActivityView implements OnInit {

  @HostBinding('class') hostClass = 'content-panel'

  messages: Observable<Message[]>;

  private haveNotification = false
  private owner: any
  private chatActive:boolean = true;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService,
    private videoService: VideoService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      let context = params['context']; // (+) converts string 'id' to a number
      let task = params['task'];

      this.onRouteActivated(context, task)

    });

    this.messages = this.contextService.messageList;
    
  }

  onRouteActivated(context:string, task:string) {

    console.log('Context:', context);
    console.log('Task:', task);

    // TODO: Optimize this process
    // Creating the Work Context
    console.info('Creating the context ', context, ' chat group');  
    this.chatService.create(context, []).then((result: any) => {

      // Creating the task context
      console.info('Creating the context ', task, ' chat group');
      return this.chatService.create(task, [], context);
    }).then((result: any) => {
      console.log('Create chat service for all my contacts', result);

      this.chatActive = true;
    }).catch(reason => {
      console.error(reason);
    })

    
  }

  onMessage(message:string) {

    this.chatService.send(message).then((message:any) => {
      // this._updateView();
    })

  }

  prepareChat(chat: any) {

/*    this.chatService.onMessage((message: any) => {
      console.log('[Activity View - onMessage] ', message);

      // this._updateView();
    });
*/
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
    let title = 47;
    let height = contentHeight - (sender + margin + title);

    console.log('update View', height, $ele)

    $ele.find('ul[activity-list]').css({'overflow-y': 'scroll'});
    let scrollable = $ele.find('ul[activity-list]').height(height);

  }

}
