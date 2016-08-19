import { Component, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { AppService, ChatService, ContextService, MessageService, ContactService } from '../../services/services';

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
    private route: ActivatedRoute, 
    private appService: AppService,
    private messageService: MessageService,
    private contextService: ContextService,
    private contactService: ContactService) {}

  // Load data ones componet is ready
    // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualComm View - onInit]');

    this.route.data.forEach((data: { context: ContextualComm }) => {
      console.log('Resolve Data:', data);

      this.messageService.setMessages(data.context.messages);
      this.users = this.contactService.setContacts(data.context.users);

    });
  }

  onContactClick(user: User) {
    console.log('(contact-click)', user)

    user.status = 'offline';

    let context = this.contextService.getContextPath;
    let task = this.contextService.getTaskPath;
    let path = context + "/" + task;

    // this.router.navigate(['/' + context, '/' + task, user.guid]);
  }

  onContactAdd() {
/*
    this.chatService.invite(['openidtest10@gmail.com', 'openidtest20@gmail.com'], ['hybroker.rethink.ptinovacao.pt', 'hybroker.rethink.ptinovacao.pt']).then((chatController: any) => {
      console.log('[Users as joined with success]', chatController)
    })*/

  }


}