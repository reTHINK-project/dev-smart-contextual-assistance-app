import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Contact } from '../contact/contact';

@Component({
  selector: 'div[contact-box]',
  templateUrl: 'comp/user/contact-box.comp.html'
})
export class ContactBox implements OnInit {
  @HostBinding('class') hostClass = 'contactbox padding all-100 small'

  @Input() model:Contact

  @Output('video-call') videoClick = new EventEmitter()
  @Output('audio-call') audioClick = new EventEmitter()

  ngOnInit() {
    console.log('HERE:', this.model)
  }
}
