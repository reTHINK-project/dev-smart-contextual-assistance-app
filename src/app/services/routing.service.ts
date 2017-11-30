import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router, Resolve, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Config
import { config } from '../config';

import { PageSection } from '../models/app.models';


@Injectable()
export class RoutingService {

  private routerEvents: Subscription;

  @Output() routingChanges = new EventEmitter<PageSection>();

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    console.log('[Routing Service] - ', );

    router.events.filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event: any) => {

        let section = '';
        let title = '';
        console.log('[Routing Service] - params: ', event);

        if (event.hasOwnProperty('context')) {

          section = 'context';
          title = event.context.name;

        } else if (event.hasOwnProperty('user') && event.user.hasOwnProperty('username')) {

          section = 'context';
          title = event.user.username;

        } else {

          section = event.pageSection || 'home';
          title = event.pageTitle || 'Home';

        }

        this.titleService.setTitle(config.pageTitlePrefix + title);

        this.routingChanges.emit({
          section: section,
          title: title
        });

      });
  }

}
