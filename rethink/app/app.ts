import { Component } from '@angular/core';

import { Contact } from '../comp/contact/contact';
import { Activity } from '../comp/activity/activity';

import { ContactMeComponent } from '../comp/contact/me.comp';
import { ContactListComponent } from '../comp/contact/contactlist.comp';

import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

@Component({
  selector: 'div[my-app]',
  directives: [
    ContactMeComponent, ContactListComponent,
    ActivityListComponent, FileShareListComponent,
    ContextBreadCrumbComponent, ContextMenuComponent, ContextSenderComponent
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
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

  onContactClick(contact: Contact) {
    console.log('(contact-click)', contact)
  }

  onContactAdd() {
    this.contacts[1].status = 'online'
    console.log('(contact-add)')
  }
}
