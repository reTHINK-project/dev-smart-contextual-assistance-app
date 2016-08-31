import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService, MessageService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'

@Component({
  selector: 'div[contact-box]',
  templateUrl: 'app/user/user.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    ChatCommunicationComponent,
    ContextualCommActivityComponent
  ]
})
export class UserComponent implements OnInit {

  @HostBinding('class') hostClass = '';
  @Output() audioEvent = new EventEmitter();
  @Output() videoEvent = new EventEmitter();
  //@Output() closeEvent = new EventEmitter();

  private user:User;
  private messages:Observable<Message[]>;

  chatActive: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private messageService: MessageService ) {
  }

  ngOnInit() {

    this.messages = this.messageService.messageList;

    this.route.data.forEach((data: { user: User }) => {
      console.log('Resolve data User: ', data.user);

      this.user = data.user;
      
    });

  }

  onMessage(message:string) {

    console.log("Message:", message);
    this.chatService.send(message).then((message:any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    })
    
  }

  onCloseEvent() {
    console.log('Close:');
    //history.back();
  }

}