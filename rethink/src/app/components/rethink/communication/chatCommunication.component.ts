import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'chat-view',
  templateUrl: './chatCommunication.component.html'
})
export class ChatCommunicationComponent implements OnInit {

  @HostBinding('class') hostClass = 'message-sender all-75 medium-70 xlarge-80 hide-small hide-tiny push-right'

  @Input() active = false
  @Output() onMessage = new EventEmitter()

  model = <any>{message: ''};

  ngOnInit() {
    
  }

  onSubmit() {
    this.onMessage.emit(this.model.message);
    this.clean();
  }

  clean() {
    this.model.message = '';
  }

}