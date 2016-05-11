import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { Activity, ContextActivityComponent } from './activity';

@Component({
  selector: 'ul[context-activity-list]',
  templateUrl: 'comp/context/activity/activitylist.html',
  directives: [ContextActivityComponent]
})
export class ContextActivityListComponent {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() model: Activity[] = []

  private activityFilter: Activity[] = []

  ngOnInit() {
    this.activityFilter = this.model
  }

}
