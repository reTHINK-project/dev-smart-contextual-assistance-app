import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'div[contact-box]',
  templateUrl: './contact-box.component.html'
})
export class ContactBoxComponent {
  @HostBinding('class') hostClass = 'contactbox padding all-100 small';

  @Input() user: User;
  @Output() closeEvent = new EventEmitter();

  onCloseClick() {
    this.closeEvent.emit();
  }

}
