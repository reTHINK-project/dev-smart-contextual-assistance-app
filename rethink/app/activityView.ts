import { Component, Input, Output, AfterViewInit, OnInit, HostBinding } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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
import { MessageService } from '../services/message.service';
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

export class ActivityView implements OnInit, AfterViewInit {

  @HostBinding('class') hostClass = 'content-panel'

  @Input() messages: Observable<Message[]>;

  private haveNotification = false
  private owner: any
  private chatActive:boolean = true;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private messageService: MessageService,
    private contextService: ContextService,
    private videoService: VideoService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      let context = params['context']; // (+) converts string 'id' to a number
      let task = params['task'];

      this.contextService.setContextPath = context;
      this.contextService.setTaskPath = task;

      this.onRouteActivated(context, task)

    });

    this.messages = this.messageService.messageList;
    
  }

  ngAfterViewInit() {
    console.log('[Activity View Init]');
  }

  onRouteActivated(context:string, task:string) {

    console.log('Context:', context);
    console.log('Task:', task);

    // TODO: Optimize this process
    // Creating the Work Context
    console.info('Creating the context ', context, ' chat group');  
    this.chatService.create(context, [], []).then((result: any) => {

      // Creating the task context
      console.info('Creating the context ', task, ' chat group');
      return this.chatService.create(task, [], [], context);
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

}
