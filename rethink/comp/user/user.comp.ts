import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Contact } from '../contact/contact';
import { Activity } from '../activity/activity';

import { ContactBox } from './contact-box.comp';
import { ContentBox } from './content-box.comp';

@Component({
  selector: 'div[user]',
  templateUrl: 'comp/user/user.comp.html',
  directives: [
    ContactBox,
    ContentBox
  ]
})
export class UserComponent implements OnInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100'

  @Input() model:Contact
  @Input() activity:Activity

  ngOnInit() {
    console.log(this.model);
    console.log(this.activity);
  }

}
