import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'div[contact-box]',
  templateUrl: './contact-box.component.html'
})
export class ContactBoxComponent {
  // TODO: Use with the Bootstrap: user-identity contactbox p-4 col-12
  @HostBinding('class') hostClass = 'user-identity contactbox all-75 large-65 xlarge-65 medium-100';

  @Input() user: User;
  @Output() closeEvent = new EventEmitter();

  onCloseClick() {
    this.closeEvent.emit();
  }

}
