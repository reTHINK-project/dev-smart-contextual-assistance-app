import { Component, Input, Output, HostBinding, OnInit, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';


import { Message } from '../../models/models';


import { Activity } from './activity';
import { ActivityComponent } from './activity.comp';

@Component({
  selector: 'ul[activity-list]',
  templateUrl: 'comp/activity/activitylist.comp.html',
  directives: [ActivityComponent]
})
export class ActivityListComponent implements OnInit {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() set model(messages:Observable<Array<Message>>) {

  console.log("Set Messages Observable: ", messages);
    this.messages = messages;
  }

  private messages:Observable<Array<Message>>

  constructor(private el: ElementRef){}

  ngOnInit() {
    
	  this.messages.subscribe((messages: Array<Message>) => {

      setTimeout(() => {
        this.scrollToBottom();
      })

    });

    this.updateView();
    this.scrollToBottom();
  }

  updateView(): void {
    let scrollPane: any = this.el.nativeElement;
    let parentEl: any = scrollPane.offsetParent;
    let top = scrollPane.offsetTop;
    let parentElHeight = parentEl.offsetHeight;

    // TODO: replace the number for the sender box height;
    let height = parentElHeight - (top + 62);
    scrollPane.style.height = height + 'px';
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement;
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
