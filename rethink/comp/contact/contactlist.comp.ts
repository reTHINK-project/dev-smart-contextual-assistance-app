import { Component, OnInit, Input, Output, HostBinding, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contact } from './contact';
import { ContactComponent } from './contact.comp';
import { ContextualCommUser } from '../../models/ContextualCommUser';

import { ContextService }     from '../../services/context.service';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() set model (contacts:ContextualCommUser[]) {

    console.log('Set Model Contacts List:', contacts);
    if (!contacts) return;

    this.contacts = contacts
    this.filter("");
  }

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contacts: ContextualCommUser[]
  private contactsFilter: ContextualCommUser[]

  constructor(
    private contextService: ContextService) {}

  ngOnInit() {

    // this.contextService.contextUsers.subscribe((users:ContextualCommUser[]) => {
    //
    //   console.log("[Contact List Users]:", users);
    //   users.forEach((user) => {
    //     this.contacts.push(user);
    //   })
    //
    //   this.filter("");
    //
    // })

  }

  onContactClick(model:Contact) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    this.contactsFilter = this.contacts.filter((contact) => {
      if(contact.cn.indexOf(value) !== -1) return true
    })
  }
}
