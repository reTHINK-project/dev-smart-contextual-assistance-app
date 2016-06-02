import { Component, OnInit, Input, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, Routes, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { AppService }     from '../services/app.service';
import { ChatService }    from '../services/chat.service';
import { ContextService }     from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';

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
  {path: '/', component: ActivityView},
  {path: '/user/:id', component: UserView}
])
export class Application {

  constructor(private router: Router,
    private appService: AppService,
    private chatService: ChatService,
    private contextService: ContextService) {}

  contacts: Contact[] = [];
  me: Contact
  // @HostListener("input", "$event.target.value")

  contextOpened: boolean

  ngOnInit() {

    this.contextOpened = false;

    // let listOfContacts:Contact[] = contacts;

    this.contextService.contexts.subscribe((context) => {

      console.log(context[0]);
      // this.contexts.push(context.childs);
      this.contacts = context[0].contacts;
    })

    this.me = this.appService.me;
    this.chatService.create('Work', []).then((result: any) => {
      console.log('Create chat service for all my contacts', result);

      return this.contextService.getContextByName('Work')
    }).then((context:Context) => {
      // this.contacts = context.contacts;
    }).catch((reason) => {
      console.log('Error: ', reason);
    })

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

    console.log('(contact-add)')


    let contact = <Contact>{
      id: 'test2-OpenID',
      name: 'test2 OpenID',
      email: 'openidtest20@gmail.com',
      avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
      userURL: 'user://gmail.com/openidtest20'
    };

    let context = <Context>{}
    context.id = 'Test2OpenID';
    context.name = 'test2 OpenID';
    context.owner = 'test2 OpenID';
    context.status = 'online';
    context.schema = '';
    context.reporter = '';
    context.duration = '';
    context.startingTime = '';
    context.lastModified = '';
    context.participants = '';

    context.type = 'private';
    context.contacts = [contact];
    context.activities = [];
    context.childs = [];
    // context.resource = dataObject.url;

    // this.contacts.push(contact);
    console.log('contacts:', contact);

    this.contextService.updateContext('Work', context);

    // this.contacts.push(contact);

    console.log('context:', context);

    // this.contacts.push({avatar: '', email:"vitorsilva@boldint.com", id:"user://boldint.com/vitorsilva", name:"Vitor Silva", status:"online"})
    // console.log('Update the Contacts:', this.contacts);
  }
}
