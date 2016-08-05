import { Component, Input, Output, OnInit, OnDestroy, AfterViewInit, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { Message } from '../../models/models';

@Component({
  selector: 'li[activity]',
  templateUrl: 'comp/activity/activity.comp.html'
})
export class ActivityComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClass = 'half-padding'

  @Input() message:Message;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {

  }

  ngAfterViewInit() {

    if (this.message.user.status === 'offline') {
      this.hostClass = 'half-padding offline'
    }

  }

}
