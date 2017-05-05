import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { User } from '../../models/models';

@Component({
    moduleId: module.id,
    selector: 'ul[my-self]',
    templateUrl: './my-self.component.html'
})
export class MySelfComponent implements OnInit {

  @Input() model: User;
  @HostBinding('class') hostClass = 'push-right contactlist';

  constructor() {}

  ngOnInit() {

  }

}
