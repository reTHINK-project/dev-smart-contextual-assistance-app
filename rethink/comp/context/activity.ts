import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'ul[context-activity]',
  templateUrl: 'comp/context/activity.html'
})
export class ContextActivityComponent {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'
}
