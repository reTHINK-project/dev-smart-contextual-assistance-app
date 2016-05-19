import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Router, RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import { ActivityListComponent } from '../comp/activity/activitylist.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';

import {Activity} from '../comp/activity/activity'

import { AppService } from '../services/app.service';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/activityView.html',
  directives: [
    ROUTER_DIRECTIVES,
    ActivityListComponent, FileShareListComponent,
    ContextMenuComponent, ContextSenderComponent
  ]
})
export class ActivityView implements OnInit {
  @HostBinding('class') hostClass = 'content-panel'

  activities: Activity[] = []

  constructor(private router:Router, private appService: AppService){}

  ngOnInit() {
    this.appService.getActivities().then((activities) => {
      this.activities = activities
    })
  }

  routerOnActivate(curr: RouteSegment): void {
    //let domain = curr.getParam('domain')
    let resource = curr.getParam('resource')
    let url = 'comm://hybroker.rethink.ptinovacao.pt/' + resource

    console.log('[Chat URL] ', url)
    this.appService.getChatGroup(url).then((chat: any) => {
      chat.send('Testing chat...')
    })
  }

}
