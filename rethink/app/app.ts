import { Component } from '@angular/core';

import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';
import { Activity } from '../comp/context/activity/activity';

import { ContextMeComponent } from '../comp/contact/me';
import { ContactListComponent } from '../comp/contact/contactlist';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb';
import { ContextMenuComponent } from '../comp/context/menu';
import { ContextActivityListComponent } from '../comp/context/activity/activitylist';
import { ContextFileShareListComponent } from '../comp/context/fileshare/filesharelist';
import { ContextSenderComponent } from '../comp/context/sender';

@Component({
  selector: 'div[my-app]',
  directives: [
    ContextMeComponent, ContactListComponent,
    ContextBreadCrumbComponent, ContextMenuComponent, ContextActivityListComponent, ContextFileShareListComponent, ContextSenderComponent
  ],
  templateUrl: 'app/view/app.html'
})
export class Application {
  contacts: [Contact] = [
    { name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', unread: 1 },
    { name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg' },
    { name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg' },
    { name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg' }
  ]

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call-failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call-failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', date: 'at 14:30' }
  ]

  contexts: [Context] = [
    {name: "Work", icon: 'a', childs: []},
    {name: "Fitness", icon: 'a', childs: []},
    {name: "School", icon: 'a', childs: []}
  ]

  contextOpened:boolean;

  ngOnInit() {
    this.contextOpened = false;
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
  }

  onContactAdd() {
    this.contacts[1].status = 'online'
    console.log('(contact-add)')
  }
}
