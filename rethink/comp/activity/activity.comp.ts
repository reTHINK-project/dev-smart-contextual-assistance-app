import { Component, Input, Output, OnInit, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { Message } from '../../models/models';

@Component({
  selector: 'li[activity]',
  templateUrl: 'comp/activity/activity.comp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'half-padding'

  @Input() message:Message;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.message.user.status === 'offline') {
      this.hostClass = 'half-padding offline'
    }

    this.cd.detectChanges();
    this.cd.markForCheck(); // marks path
  }
}
