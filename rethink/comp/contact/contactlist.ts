import { Component, Input, HostBinding } from '@angular/core';
import { Contact, ContactComponent } from './contact';

@Component({
  selector: 'ul[contactlist]',
  templateUrl: 'comp/contact/contactlist.html',
  directives: [ContactComponent]
})
export class ContactListComponent {
  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() model: Contact[] = []

}
