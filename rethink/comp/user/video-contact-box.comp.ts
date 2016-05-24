import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Contact } from '../contact/contact';

@Component({
  selector: 'div[video-contact-box]',
  templateUrl: 'comp/user/video-contact-box.comp.html'
})
export class VideoContactBox implements OnInit {
  @HostBinding('class') hostClass = 'video-call all-100'

  @Input() model:Contact
  @Input() myStream: any
  @Input() otherStream: any

  ngOnInit() {

  }
}
