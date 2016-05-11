import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Activity } from './activity';

@Component({
  selector: 'li[activity]',
  templateUrl: 'comp/activity/activity.comp.html'
})
export class ActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'half-padding'

  @Input() model: Activity

  ngOnInit() {
    if (this.model.contact.status === 'offline') {
      this.hostClass = 'half-padding offline'
    }
  }
}
