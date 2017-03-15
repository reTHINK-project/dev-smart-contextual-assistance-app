import { Component, OnInit, HostBinding, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Services
import { ChatService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'

@Component({
  moduleId: module.id,
  selector: 'div[contact-box]',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  @HostBinding('class') hostClass = '';
  @Output() audioEvent = new EventEmitter();
  @Output() videoEvent = new EventEmitter();
  //@Output() closeEvent = new EventEmitter();

  private user:User;
  private messages:Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService) {
  }

  ngOnInit() {

    this.route.data.forEach((data: { user: User, context: ContextualComm }) => {
      console.log('Resolve data User: ', data.user);
      console.log('Resolve data Context: ', data.context);
      this.user = data.user;

      this.messages.next(data.context.messages);
    });

  }

  ngOnDestroy() {
    console.log('[User View - onMessage] - OnDestroy', this.messages);
    this.messages.unsubscribe();
  }

  onMessage(message:string) {

    console.log("Message:", message);
    this.chatService.send(message).then((message:any) => {
      console.log('[User View - onMessage] - message sent', message);
    })
    
  }

  onCloseEvent() {
    console.log('Close:');
    //history.back();
  }

}