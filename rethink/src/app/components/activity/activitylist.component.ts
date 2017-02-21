import { Component, Input, OnInit, AfterViewInit, OnDestroy, HostBinding, ElementRef } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';

import { Message } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'ul[activity-list]',
  templateUrl: './activitylist.component.html'
})
export class ActivityListComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() messages:Observable<Array<Message>>

  private msgObs:Subscription;

  constructor(private el: ElementRef){}

  ngAfterViewInit() {

 	  this.msgObs = this.messages.subscribe((messages: Array<Message>) => {
       console.log('[Activity List - Restore old messages]', messages);
       this.scrollToBottom();
    });

    this.updateView();
    this.scrollToBottom();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.msgObs.unsubscribe();
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
