import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { Contact } from './contact';
import { ContactComponent } from './contact.comp';

@Component({
  selector: 'ul[contact-list]',
  templateUrl: 'comp/contact/contactlist.comp.html',
  directives: [ContactComponent]
})
export class ContactListComponent {
  @HostBinding('class') hostClass = 'contactlist all-100'

  @Input() model: Contact[] = []

  @Output('contact-click') contactClick = new EventEmitter()
  @Output('contact-add') contactAdd = new EventEmitter()

  private contactsFilter: Contact[] = []

  ngOnInit() {
    this.filter("")
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {
    this.contactsFilter = this.model.filter((contact) => {
      if(contact.name.indexOf(value) !== -1) return true
    })
  }
}
