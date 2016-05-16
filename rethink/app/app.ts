import { Component, OnInit } from '@angular/core';

import { ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';

import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';
import { Activity } from '../comp/activity/activity';

import { ContactMeComponent } from '../comp/contact/me.comp';
import { ContactListComponent } from '../comp/contact/contactlist.comp';

import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

import { UserComponent } from '../comp/user/user.comp';

@Component({
  selector: 'div[my-app]',
  directives: [
    ROUTER_DIRECTIVES,
    ContactMeComponent, ContactListComponent,
    ActivityListComponent, FileShareListComponent,
    ContextBreadCrumbComponent, ContextMenuComponent, ContextSenderComponent
  ],
  templateUrl: 'app/view/app.html'
})
@Routes([
  {path: '/activity', component: ActivityListComponent},
  {path: '/user/:id', component: UserComponent}
])
export class Application implements OnInit {

  constructor(private router: Router) {}

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

  contexts: [Context] = [
    {name: "Work", icon: 'a', childs: []},
    {name: "Fitness", icon: 'a', childs: []},
    {name: "School", icon: 'a', childs: []}
  ]

  contextOpened:boolean;

  ngOnInit() {
    this.contextOpened = false;

    console.log('router:', this.router);
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
    // this.router.navigate(['/user', contact.name]);
  }

  onContactAdd() {
    this.contacts[1].status = 'online'
    console.log('(contact-add)')
  }
}
