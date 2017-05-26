import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'div[contact-box]',
  templateUrl: './contact-box.component.html'
})
export class ContactBoxComponent {
  @HostBinding('class') hostClass = 'user-identity contactbox p-4 col-12';

  @Input() user: User;
  @Output() closeEvent = new EventEmitter();

  onCloseClick() {
    this.closeEvent.emit();
  }

}
