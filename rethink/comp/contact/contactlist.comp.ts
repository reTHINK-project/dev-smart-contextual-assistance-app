import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { Contact } from './contact';
import { ContactComponent } from './contact.comp';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent]
})
export class ContactListComponent implements OnInit {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() set model(contacts:Contact[]) {
    this.contacts = contacts
    this.filter("");
  }

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contacts:Contact[] = []
  private contactsFilter: Contact[] = []

  ngOnInit() {
    this.filter("")
  }

  onContactClick(model:Contact) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    this.contactsFilter = this.contacts.filter((contact) => {
      if(contact.name.indexOf(value) !== -1) return true
    })
  }
}
