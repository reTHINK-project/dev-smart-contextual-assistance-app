import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { Activity } from './activity';
import { ActivityComponent } from './activity.comp';

@Component({
  selector: 'ul[activity-list]',
  templateUrl: 'comp/activity/activitylist.comp.html',
  directives: [ActivityComponent]
})
export class ActivityListComponent {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() model: Activity[] = []

  private activityFilter: Activity[] = []

  ngOnInit() {
    this.activityFilter = this.model
  }

}
