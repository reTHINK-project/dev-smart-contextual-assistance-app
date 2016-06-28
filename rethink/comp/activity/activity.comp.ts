import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'li[activity]',
  templateUrl: 'comp/activity/activity.comp.html'
})
export class ActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'half-padding'

  @Input() model: any

  ngOnInit() {
    if (this.model.user.status === 'offline') {
      this.hostClass = 'half-padding offline'
    }
  }
}
