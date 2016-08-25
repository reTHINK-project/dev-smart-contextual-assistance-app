import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService, MessageService } from '../../services/services';

// Models
import { Message, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'

@Component({
    selector: 'activity-view',
    templateUrl: 'app/activity/activity.component.html',
    directives: [
      ROUTER_DIRECTIVES,
      ContextualCommActivityComponent,
      ChatCommunicationComponent
    ]
})
export class ActivityComponent implements OnInit, AfterViewInit, OnDestroy {

  private context: any;

  private messages:Observable<Message[]>;
  private chatActive: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService) {}

  // Load data ones componet is ready
  ngOnInit() {

    // Subscribe to route params
    this.route.params.subscribe(params => {
      console.log('[Activity View - onInit]', params);
    });

    this.messages = this.messageService.messageList;
  }

  ngAfterViewInit() {
    console.log('[Activity View  - AfterViewInit]');
  }

  ngOnDestroy() {
    
  }

  onMessage(message:string) {

    console.log("Message:", message);
    this.chatService.send(message).then((message:any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    })
  }

}