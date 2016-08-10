import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { User } from '../../models/models';

@Component({
    selector: 'ul[my-self]',
    templateUrl: 'app/mySelf/my-self.component.html'
})
export class MySelfComponent implements OnInit {

  @Input() model:User;
  @HostBinding('class') hostClass = 'push-right contactlist'

  constructor() {}

  ngOnInit() {

  }

}
