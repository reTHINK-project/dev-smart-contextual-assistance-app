import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { User } from '../../../models/models';

@Component({
  moduleId: module.id,
  selector: 'div[video-view]',
  templateUrl: './videoCommunication.component.html'
})
export class VideoCommunicationComponent implements OnInit {
  @HostBinding('class') hostClass = 'video-call all-100'

  @Input() myStream: any
  @Input() otherStream: any
  @Input() user:User;

  ngOnInit() {

  }
}
