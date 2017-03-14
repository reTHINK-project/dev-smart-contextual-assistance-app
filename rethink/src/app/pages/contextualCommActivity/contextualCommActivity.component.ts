import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Models
import { Message, ContextualComm } from '../../models/models';

// Components

import { ActivityViewComponent } from '../activityView/activity-view.component';

// Services
import { ChatService } from '../../services/rethink/chat.service';
import { ContextService } from '../../services/rethink/context.service';

@Component({
  moduleId: module.id,
  selector: 'context-activity-list',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @ViewChild(ActivityViewComponent)
  private activitView: ActivityViewComponent;

  private messages:Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private chatService: ChatService,
    private contextService: ContextService
  ){}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualCommActivityComponent - ngOnInit]');

    this.contextService.contextualComm().subscribe((contextualComm:ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      // this.activitView.updateView();
    })

  }

  onMessage(message:string) {

    this.chatService.send(message).then((message:any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    })
    
  }

}
