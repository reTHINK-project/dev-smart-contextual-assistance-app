import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

import {Activity} from '../comp/activity/activity'

import { AppService } from '../services/app.service';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/activityView.html',
  directives: [
    ROUTER_DIRECTIVES,
    ActivityListComponent, FileShareListComponent,
  ]
})
export class ActivityView implements OnInit {
  @HostBinding('class') hostClass = 'content-panel'

  activities: Activity[] = []

  constructor(private router:Router, private appService: AppService){}

  ngOnInit() {
    this.appService.getActivities().then((activities) => {
      this.activities = activities
    });
  }

}
