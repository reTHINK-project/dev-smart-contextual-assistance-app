import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

// Interfaces
import { Contact } from '../contact/contact';
import { Context } from '../context/context';
import { Activity } from '../activity/activity';

// Components
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

  @Input() modelContact:Contact
  @Input() modelContext:Context

  ngOnInit() {
    // console.log(this.modelContact);
    // console.log(this.modelContext);
  }

}
