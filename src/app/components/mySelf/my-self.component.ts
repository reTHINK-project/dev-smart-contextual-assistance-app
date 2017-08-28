import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/observable/from';

import { User } from '../../models/models';
import { UserAvailabilityService } from '../../services/rethink/userAvailability.service';

@Component({
    moduleId: module.id,
    selector: 'my-self',
    templateUrl: './my-self.component.html'
})
export class MySelfComponent implements OnInit {

  @Input() model: User;
  @HostBinding('class') hostClass = 'float-right';

  constructor(config: NgbDropdownConfig, private userAvailabilityService: UserAvailabilityService) {
    config.autoClose = false;

  }

  ngOnInit() {

  }

  onChangeEvent(status: string) {
   console.log('[MySelfComponent] status changed:', status);

   this.userAvailabilityService.setStatus(status);

  }

}
