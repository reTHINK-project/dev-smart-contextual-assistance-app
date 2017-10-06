import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../../../../models/models';

@Component({
  moduleId: module.id,
  selector: 'file-event',
  templateUrl: './fileEvent.component.html'
})
export class FileEventComponent implements OnInit {

  @Input() message: Message;
  @Input() isAnEvent = false;

  ngOnInit() {
  }

}
