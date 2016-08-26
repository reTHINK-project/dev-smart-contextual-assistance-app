import { Component, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { RethinkService, ChatService, ContextService, MessageService, ContactService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';


// Components
import { ContextualCommUsersComponent } from '../contextualCommUsers/contextualCommUsers.component'

@Component({
  selector: 'context-view',
  templateUrl: 'app/contextualComm/contextualComm.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    ContextualCommUsersComponent
  ]
})
export class ContextualCommComponent implements OnInit {

  @HostBinding('class') hostClass = 'context-view';

  private users:Observable<User[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private appService: RethinkService,
    private messageService: MessageService,
    private contextService: ContextService,
    private contactService: ContactService) {}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualComm View - onInit]');

    this.route.data.forEach((data: { context: ContextualComm }) => {
      console.log('Resolve Data:', data);

      this.users = this.contactService.setContacts(data.context.users);
      this.messageService.setMessages(data.context.messages);

    });
  }

  onContactClick(user: User) {
    console.log('(contact-click)', user)

    let context = this.contextService.getContextPath;
    let task = this.contextService.getTaskPath;
    let path:string[] = [];

    path.push(context);
    if (task) {
      path.push(task);
    }
    path.push('user');
    path.push(encodeURI(user.guid));

    this.router.navigate(path);

  }

  onContactAdd() {
/*
    this.chatService.invite(['openidtest10@gmail.com', 'openidtest20@gmail.com'], ['hybroker.rethink.ptinovacao.pt', 'hybroker.rethink.ptinovacao.pt']).then((chatController: any) => {
      console.log('[Users as joined with success]', chatController)
    })*/

  }


}