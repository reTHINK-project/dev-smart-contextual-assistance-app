import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-event',
  templateUrl: 'components/rethink/hypertyResource/chat/chatEvent.component.html'
})
export class ChatEventComponent implements OnInit {

  @Input() activity:any;

  ngOnInit() {
    
  }

}