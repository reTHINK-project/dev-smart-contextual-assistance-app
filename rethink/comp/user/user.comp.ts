import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { ContactBox } from './contact-box.comp';

@Component({
  selector: 'div[user]',
  templateUrl: 'comp/user/user.comp.html',
  directives: [
    ContactBox
  ]
})
export class UserComponent implements OnInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100'

  ngOnInit() {

  }

}
