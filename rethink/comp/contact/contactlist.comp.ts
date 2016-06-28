import { Component, OnInit, Input, Output, HostBinding, SimpleChange, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ContactComponent } from './contact.comp';
import { User } from '../../models/models';

import { ContextService }     from '../../services/context.service';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent]
})
export class ContactListComponent implements OnInit {

  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() set model(contacts:Observable<Array<User>>) {
    this.contacts = contacts;
    this.filter('');
  }

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contacts: Observable<Array<User>>
  private contactsFilter: Observable<Array<User>>

  ngOnInit() {
/*    this.contacts.subscribe((users:User[]) => {
      setTimeout(() => {
        this.filter('');
      })
    })*/
  }

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    /*this.contactsFilter = this.contacts.reduce((users: User[], user: User) => {
      if (user.cn === value) { users.push(user); }
      return users;
    });*/
  }
}
