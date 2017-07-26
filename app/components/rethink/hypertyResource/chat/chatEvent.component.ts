import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../../../../models/models';

@Component({
  moduleId: module.id,
  selector: 'chat-event',
  templateUrl: './chatEvent.component.html'
})
export class ChatEventComponent implements OnInit {

  @Input() message: Message;

  ngOnInit() {

  }

}
