import { Component, Input, Output, OnInit, HostBinding, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../models/models';

@Component({
  selector: 'li[contact]',
  templateUrl: 'comp/contact/contact.comp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  @HostBinding('class') hostClass = 'quarter-padding'

  @Input() model: User

  @Output('contact-click') contactClick = new EventEmitter()

  ngOnInit() {
    if (this.model.status === 'offline') {
      this.hostClass = 'quarter-padding offline'
    }
  }
}
