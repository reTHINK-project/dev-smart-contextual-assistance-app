import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { NgForm }    from '@angular/forms';

@Component({
  selector: 'chat-view',
  templateUrl: 'components/rethink/communication/chatCommunication.component.html',
  directives: [
    NgForm
  ]
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