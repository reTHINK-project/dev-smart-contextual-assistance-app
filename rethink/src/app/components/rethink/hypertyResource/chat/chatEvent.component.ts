import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'chat-event',
  templateUrl: './chatEvent.component.html'
})
export class ChatEventComponent implements OnInit {

  @Input() activity:any;

  ngOnInit() {
    
  }

}