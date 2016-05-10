import { Component, Input } from '@angular/core';

export type ContactStatus = 'online' | 'away' | 'offline'

export interface Contact {
  name: string
  status: ContactStatus
  avatar: string
}

@Component({
  selector: 'li[contact]',
  templateUrl: 'comp/view/contact.html'
})
export class ContactComponent {
  @Input() model: Contact

  test() {
    console.log('click-test')
  }
}
