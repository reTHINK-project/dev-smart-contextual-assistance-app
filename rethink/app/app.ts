import { Component } from '@angular/core';

import { Contact } from '../comp/contact/contact';
import { ContextMeComponent } from '../comp/contact/me';
import { ContactListComponent } from '../comp/contact/contactlist';

import { ContextBreadCrumbComponent } from '../comp/context/breadcrumb';
import { ContextMenuComponent } from '../comp/context/menu';
import { ContextActivityComponent } from '../comp/context/activity';
import { ContextFileShareComponent } from '../comp/context/fileshare';
import { ContextSenderComponent } from '../comp/context/sender';

@Component({
  selector: 'div[my-app]',
  directives: [
    ContextMeComponent, ContactListComponent,
    ContextBreadCrumbComponent, ContextMenuComponent, ContextActivityComponent, ContextFileShareComponent, ContextSenderComponent
  ],
  templateUrl: 'app/view/app.html'
})
export class Application {
  contacts: [Contact] = [
    { name: "Rita Coelho", status: "online", avatar: "img/avatar.jpg" },
    { name: "Diogo Reis", status: "away", avatar: "img/avatar-2.jpg" },
    { name: "Rodrigo Castro", status: "offline", avatar: "img/avatar-3.jpg" },
    { name: "Martim Almeida", status: "online", avatar: "img/avatar-4.jpg" }
  ]

  onContactClick(contact: Contact) {
    console.log('(contact-click)', contact)
  }

  onContactAdd() {
    console.log('(contact-add)')
  }
}
