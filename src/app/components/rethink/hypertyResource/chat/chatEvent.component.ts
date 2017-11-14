import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Message } from '../../../../models/models';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'chat-event',
  templateUrl: './chatEvent.component.html'
})
export class ChatEventComponent implements OnInit {

  @Input() message: Message;
  @Input() isAnEvent = false;

  ngOnInit() {

  }

}
