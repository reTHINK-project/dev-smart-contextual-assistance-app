import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

export type ContactStatus = 'online' | 'away' | 'offline'

export interface Contact {
  name: string
  status: ContactStatus
  avatar: string
}

@Component({
  selector: 'li[contact]',
  templateUrl: 'comp/contact/contact.html'
})
export class ContactComponent implements OnInit {
  @HostBinding('class') hostClass = 'quarter-padding'

  @Input() model: Contact

  @Output('contact-click') contactClick = new EventEmitter()

  ngOnInit() {
    if (this.model.status === 'offline') {
      this.hostClass = 'quarter-padding offline'
    }
  }
}
