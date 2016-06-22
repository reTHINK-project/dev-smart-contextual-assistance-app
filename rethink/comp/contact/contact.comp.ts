import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Contact } from './contact';

import { ContextualCommUser } from '../../models/ContextualCommUser';

@Component({
  selector: 'li[contact]',
  templateUrl: 'comp/contact/contact.comp.html'
})
export class ContactComponent implements OnInit {
  @HostBinding('class') hostClass = 'quarter-padding'

  @Input() model: ContextualCommUser

  @Output('contact-click') contactClick = new EventEmitter()

  ngOnInit() {  
    if (this.model.status === 'offline') {
      this.hostClass = 'quarter-padding offline'
    }
  }
}
