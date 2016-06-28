import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterConfig, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AppService }     from '../services/app.service';
import { ChatService }    from '../services/chat.service';
import { ContextService }     from '../services/context.service';

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

export class Application {

  contacts:Observable<User[]>
  myIdentity: User

  contextOpened: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService) {}

  ngOnInit() {

    this.contextOpened = false;

    console.log('APP Started,  ', this.contextService.userList);

    this.contacts = this.contextService.userList;

    this.chatService.onInvitation((event:any) => {
      console.log('event: ', event);
    })

    this.myIdentity = this.appService.myIdentity;
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
    // this.router.navigate(['/user/' + contact]);
  }

  onContactAdd() {

    this.chatService.invite(['openidtest20@gmail.com']).then((chatController: any) => {
      console.log('[User as joined with success]', chatController)
    })

  }
}
