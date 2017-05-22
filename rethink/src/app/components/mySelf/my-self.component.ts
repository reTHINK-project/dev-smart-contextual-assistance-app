import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../models/models';

@Component({
    moduleId: module.id,
    selector: 'my-self',
    templateUrl: './my-self.component.html'
})
export class MySelfComponent implements OnInit {

  @Input() model: User;
  @HostBinding('class') hostClass = 'float-right';

  constructor(config: NgbDropdownConfig) {
    config.autoClose = false;
  }

  ngOnInit() {

  }

}
