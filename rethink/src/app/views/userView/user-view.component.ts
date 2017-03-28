import { Component, OnInit, HostBinding, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Services
import { ChatService, ContextService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'

@Component({
  moduleId: module.id,
  selector: 'div[user-view]',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  @HostBinding('class') hostClass = '';

  @ViewChild(ContextualCommActivityComponent)
  private contextualCommActivityComponent: ContextualCommActivityComponent;

  private action:string;

  private user:User;
  private messages:Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contextService: ContextService,
    private chatService: ChatService) {
  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        console.log('Params Action:', params['action']);
        this.action = params['action'];
      });

    this.route.data.forEach((data: { user: User, context: ContextualComm }) => {
      console.log('Resolve data User: ', data.user);
      console.log('Resolve data Context: ', data.context);
      this.user = data.user;

      this.messages.next(data.context.messages);
    });

    this.contextService.contextualComm().subscribe((contextualComm:ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.contextualCommActivityComponent.updateView();
    })

  }

  ngOnDestroy() {
    console.log('[User View - onMessage] - OnDestroy', this.messages);
    // this.messages.unsubscribe();
  }

  onMessage(message:string) {

    console.log("Message:", message);
    this.chatService.send(message).then((message:any) => {
      console.log('[User View - onMessage] - message sent', message);
    })
    
  }

  onCloseEvent() {
    history.back();
  }

}