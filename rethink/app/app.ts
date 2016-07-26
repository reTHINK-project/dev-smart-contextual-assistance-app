import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterConfig, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { ContactService } from '../services/contact.service';
import { MessageService } from '../services/message.service';
import { ContextService } from '../services/context.service';

// Interfaces
import { Context, User } from '../models/models';

// Components
import { ContactMeComponent } from '../comp/contact/me.comp';
import { ContactListComponent } from '../comp/contact/contactlist.comp';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

import { ActivityView } from './activityView';
import { UserView } from './userView';

@Component({
  selector: 'div[my-app]',
  directives: [
    ROUTER_DIRECTIVES,
    ContactMeComponent, ContactListComponent,
    ContextBreadCrumbComponent
  ],
  templateUrl: 'app/view/app.html'
})

export class Application implements OnInit {

  @Input() contacts:Observable<User[]>
  @Input() myIdentity: User

  contextOpened: boolean

  private path:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contactService: ContactService,
    private contextService: ContextService) {}

  ngOnInit() {
    this.contextOpened = false;
      
      console.log('APP Started,  ', this.contactService.userList, this.appService);
      
      this.contactService.userList.subscribe((users) => {
        console.log('Init Users:', users);
      });

      this.myIdentity = this.appService.getCurrentUser;
      
      this.contacts = this.contactService.userList;
  }

  onOpenContext(event: Event) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: Event) {
    if (event.srcElement.id === 'mp-pusher') {
      this.contextOpened = false;
    }
  }

  onContactClick(user: User) {
    console.log('(contact-click)', user)

    user.status = 'offline';

    let context = this.contextService.getContextPath;
    let task = this.contextService.getTaskPath;
    let path = context + "/" + task;

    this.router.navigate(['/' + context, '/' + task, user.id]);
  }

  onContactAdd() {

    this.chatService.invite(['openidtest10@gmail.com', 'openidtest20@gmail.com'], ['hybroker.rethink.ptinovacao.pt', 'hybroker.rethink.ptinovacao.pt']).then((chatController: any) => {
      console.log('[Users as joined with success]', chatController)
    })

  }
}
