import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { RethinkService, ChatService, ContextService, MessageService, ContactService } from '../../services/services';

// Models
import { Message, User, ContextualComm } from '../../models/models';


// Components
import { ContextualCommUsersComponent } from '../contextualCommUsers/contextualCommUsers.component'
import { AddUserComponent } from '../user/add.user.component';

@Component({
  selector: 'context-view',
  templateUrl: 'app/contextualComm/contextualComm.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    ContextualCommUsersComponent,
    AddUserComponent
  ]
})
export class ContextualCommComponent implements OnInit {

  @HostBinding('class') hostClass = 'context-view';

  @ViewChild(AddUserComponent) addView:AddUserComponent;

  private users:Observable<User[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private appService: RethinkService,
    private messageService: MessageService,
    private contextService: ContextService,
    private contactService: ContactService) {}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualComm View - onInit]');

    this.users = this.contactService.userList;

    this.route.data.forEach((data: { context: ContextualComm }) => {
      console.log('Resolve Data:', data);
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
    this.addView.toogle();
  }

  onCloseEvent() {
    this.addView.toogle();
  }

  onInviteEvent(value:any) {
    console.log('Invite some one: ', value);
  }


}