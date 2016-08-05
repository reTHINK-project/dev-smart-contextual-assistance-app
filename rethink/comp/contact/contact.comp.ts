import { Component, Input, Output, OnInit, HostBinding, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { User } from '../../models/models';

@Component({
  selector: 'li[contact]',
  templateUrl: 'comp/contact/contact.comp.html'
})
export class ContactComponent implements OnInit {
  @HostBinding('class') hostClass = 'quarter-padding'

  @Input() model: User

  @Output('contact-click') contactClick = new EventEmitter()

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.model.status === 'offline') {
      this.hostClass = 'quarter-padding offline'
    }

    /*this.cd.detectChanges();
    this.cd.markForCheck();*/
  }
}
