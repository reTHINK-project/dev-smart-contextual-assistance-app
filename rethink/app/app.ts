import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, Routes, RouteSegment, OnActivate, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AppService }     from '../services/app.service';
import { ChatService }    from '../services/chat.service';
import { ContextService }     from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';
import { ContextualComm } from '../models/ContextualComm';
import { ContextualCommUser } from '../models/ContextualCommUser';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app/view/app.html'
})
@Routes([
  {path: '/:context/:task', component: ActivityView},
  {path: '/user/:id', component: UserView}
])
export class Application {

  constructor(private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService) {}

  contacts: ContextualCommUser[];
  myIdentity: ContextualCommUser
  // @HostListener("input", "$event.target.value")

  contextOpened: boolean

  ngOnInit() {

    this.contextOpened = false;

    this.contextService.contextUsers.subscribe((users:ContextualCommUser[]) => {

      console.log("UPDATE ON APP:", users);

      if (!this.contacts) this.contacts = [];

      users.forEach((user) => {
        this.contacts.push(user);
      })

    })

    this.chatService.onUserAdded((user:any) => {

      console.log('[App - onUserAdded]', user);

      // let users:ContextualCommUser[] = [];
      // if (user.hasOwnProperty('userProfile')){
      //   let current:ContextualCommUser = {
      //     username: user.userProfile.username,
      //     cn: user.userProfile.cn,
      //     avatar: user.userProfile.avatar,
      //     userURL: user.userProfile.userURL,
      //     locale: user.userProfile.locale,
      //     status: 'online',
      //     unread: 0
      //   }
      //   users.push(current);
      // } else {
      //   user.status = 'online';
      //   user.unread = 0;
      //   users.push(user);
      // }
      //
      // this.contextService.updateContextCommUsers(users);
    });

    this.chatService.onInvitation((event:any) => {
      console.log('event: ', event);

      this.chatService.join(event.url).then((chatController:any) => {
        console.log('[Join Controller]', chatController);
      }).catch((reason) => {
        console.error(reason);
      });

    })

    this.myIdentity = this.appService.myIdentity;

    // this.appService.getContacts().then((contacts:Contact[]) => {
    //   this.contacts = contacts;
    // })

  }

  onChange(updatedValue: string) {

    console.log('AQUI:', updatedValue);

    // this.value = updatedValue.trim();
  }

  onOpenContext(event: Event) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: Event) {
    if (event.srcElement.id === 'mp-pusher') {
      this.contextOpened = false;
    }
  }

  onContactClick(contact: Contact) {
    console.log('(contact-click)', contact)
    this.router.navigate(['/user/' + contact.id]);
  }

  onContactAdd() {

    this.chatService.invite(['openidtest20@gmail.com']).then((chatController: any) => {
      console.log('[User as joined with success]', chatController)
    })
  }
}
