import { Component, Input, OnInit, HostBinding } from '@angular/core';

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
export class ContactComponent implements OnInit {
  @HostBinding('class') hostClass = 'quarter-padding'

  @Input() model: Contact

  ngOnInit() {
    if (this.model.status === 'offline') {
      this.hostClass = 'quarter-padding offline'
    }
  }

  test() {
    console.log('click-test')
  }
}
