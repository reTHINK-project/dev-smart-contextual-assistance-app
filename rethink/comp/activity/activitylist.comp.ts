import { Component, Input, Output, HostBinding, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';


import { Message } from '../../models/models';


import { Activity } from './activity';
import { ActivityComponent } from './activity.comp';

@Component({
  selector: 'ul[activity-list]',
  templateUrl: 'comp/activity/activitylist.comp.html',
  directives: [ActivityComponent]
})
export class ActivityListComponent {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() set model(messages:Observable<Array<Message>>) {

  console.log("Set Messages Observable: ", messages);

    this.messages = messages;

  }

  private messages:Observable<Array<Message>>

  // private messageFilter: Message[] = []

}
