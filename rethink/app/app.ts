import { Component, OnInit } from '@angular/core';

import { Router, Routes, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

// Services
import { AppService }     from '../services/app.service';
import { ContextService }     from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';


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
  providers: [
    ROUTER_PROVIDERS,
    AppService,
    ContextService
  ],
  templateUrl: 'app/view/app.html'
})
@Routes([
  {path: '/', component: ActivityView},
  {path: '/user/:id', component: UserView}
])
export class Application {

  constructor(private appService: AppService, private router: Router) {}

  contacts: Contact[] = []

  contextOpened: boolean

  ngOnInit() {

    this.contextOpened = false;

    this.appService.getContacts().then((contacts) => {
      this.contacts = contacts
    })

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
    this.contacts[1].status = 'online'
    console.log('(contact-add)')
  }
}
