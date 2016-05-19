import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[context-sender]',
  templateUrl: 'comp/context/sender.comp.html'
})
export class ContextSenderComponent {
  @HostBinding('class') hostClass = 'message-sender all-75 medium-70 xlarge-80 hide-small hide-tiny push-right'

  @Output('on-message') onMessage = new EventEmitter()

  submit(event: any) {
    this.onMessage.emit(event.message)
  }
}
