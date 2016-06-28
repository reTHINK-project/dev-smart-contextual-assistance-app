import { Component, OnInit, Input, Output, HostBinding, SimpleChange, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ContactComponent } from './contact.comp';
import { User } from '../../models/models';

import { ContextService }     from '../../services/context.service';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent]
})
export class ContactListComponent {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() set model(contacts:Observable<Array<User>>) {

    console.log("Set Contacts Observable: ", contacts);

    /*contacts.subscribe( (users:User[]) => {
      console.log('Users on Contact list:', users);
    })*/

    this.contacts = contacts;

  }

/*  @Input() set model (contacts:User[]) {

    console.log('set model on contact list:', contacts);
    if (!contacts) return;

    this.contacts = contacts
    this.filter("");
  }*/

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contacts:Observable<Array<User>>
  private contactsFilter:User[] = []

  constructor() {

    console.log("ASDasDA",  this.model);

  }

/*  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let from = JSON.stringify(changedProp.previousValue);
      let to =   JSON.stringify(changedProp.currentValue);
      log.push( `${propName} changed from ${from} to ${to}`);
    }
    console.log('ngOnChages ', log);
    // this.changeLog.push(log.join(', '));
  }*/

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    /*this.contactsFilter = this.contacts.filter((contact:User) => {
      if(contact.cn.indexOf(value) !== -1) return true
    })*/
  }
}
