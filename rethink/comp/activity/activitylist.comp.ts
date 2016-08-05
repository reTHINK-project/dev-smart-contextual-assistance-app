import { Component, Input, Output, OnDestroy, HostBinding, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer, ViewChild, AfterViewInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';


import { Message } from '../../models/models';


import { Activity } from './activity';
import { ActivityComponent } from './activity.comp';

@Component({
  selector: 'ul[activity-list]',
  templateUrl: 'comp/activity/activitylist.comp.html',
  directives: [ActivityComponent]
})
export class ActivityListComponent implements AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() messages:Observable<Array<Message>>

  private msgObs:Subscription;

  constructor(
    private cd:ChangeDetectorRef,
    private renderer: Renderer, 
    private el: ElementRef){}

  ngAfterViewInit() {
 	  this.msgObs = this.messages.subscribe((messages: Array<Message>) => {

      setTimeout(() => {
        this.scrollToBottom();
      })

      this.cd.detectChanges();
      this.cd.markForCheck();

    });

    this.updateView();
    this.scrollToBottom();
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
