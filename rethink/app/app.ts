import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, Routes, RouteSegment, OnActivate, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AppService }     from '../services/app.service';
import { ChatService }    from '../services/chat.service';
import { ContextService }     from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';
import { UserProfile } from '../models/UserProfile';

// Components
import { ContactMeComponent } from '../comp/contact/me.comp';
import { ContactListComponent } from '../comp/contact/contactlist.comp';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

import { ActivityView } from './activityView';
import { UserView } from './userView';

import { contacts } from '../services/contacts';

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
  {path: '/:context', component: ActivityView},
  {path: '/user/:id', component: UserView}
])
export class Application {

  constructor(private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService) {}

  contacts: Contact[] = [];
  myIdentity: UserProfile
  // @HostListener("input", "$event.target.value")

  contextOpened: boolean

  ngOnInit() {

    this.contextOpened = false;

    // let listOfContacts:Contact[] = contacts;

    this.contextService.contexts.subscribe((context) => {

      console.log(context[0]);
      // this.contexts.push(context.childs);
      // this.contacts = context[0].contacts;
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

    // this.contacts[1].status = 'online'

    // this.contacts.push({avatar: '', email:"vitorsilva@boldint.com", id:"user://boldint.com/vitorsilva", name:"Vitor Silva", status:"online"})
    // console.log('Update the Contacts:', this.contacts);



    this.chatService.invite(['vitorsilva@boldint.com']);
  }
}
