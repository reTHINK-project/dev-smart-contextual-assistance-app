import { Component, OnInit, OnDestroy, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, ChatService, ContextService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'div[user-view]',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = '';

  @ViewChild(ContextualCommActivityComponent)
  private contextualCommActivityComponent: ContextualCommActivityComponent;

  private action: string;
  private subscription: Subscription;

  private user: User;
  private messages: Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private contextService: ContextService,
    private chatService: ChatService) {

    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        console.log('Params Action:', params['action']);
        this.action = params['action'];
      });

  }

  ngOnInit() {

    this.route.data.forEach((data: { user: User, context: ContextualComm }) => {
      console.log('Resolve data User: ', data.user);
      console.log('Resolve data Context: ', data.context);
      this.user = data.user;

      this.messages.next(data.context.messages);
    });

    this.contextService.contextualComm().subscribe((contextualComm: ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.contextualCommActivityComponent.updateView();
    });

  }

  ngOnDestroy() {
    console.log('[User View] - OnDestroy', this.messages);
    // this.messages.unsubscribe();
  }

  onMessage(message: string) {

    console.log('[User View - onMessage] - Message:', message, this.chatService.chatControllerActive);
    this.chatService.send(message).then((message: any) => {
      console.log('[User View - onMessage] - message sent', message);
    });

  }

  onAcceptCall() {
    console.log('[User View] - onAcceptCall');
  }

  onRejectCall() {
    console.log('[User View] - onRejectCall');
  }

  onCloseEvent() {
    history.back();
  }

}
