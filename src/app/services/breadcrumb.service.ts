import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/bufferCount';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class BreadcrumbService {

  private _urls: string[];
  private paths: Subject<Array<string>> = new Subject<Array<string>>();

  breadcrumb: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  private pathsSubscription: Subscription;
  private routerEventSubscription: Subscription;

  constructor(private router: Router) {

    // this.paths.take(2)

    this.pathsSubscription = this.paths.subscribe(this.breadcrumb);

    console.log('[Breadcrumb Service] - router events constructor:', this.router);

    // Subscribe to route params
    this._urls = new Array();
    this.routerEventSubscription = this.router.events.subscribe((navigation: NavigationEnd) => {

      if (navigation instanceof NavigationEnd) {

        console.log('[Breadcrumb Service] - router events:', navigation);
        
        this._urls.length = 0; // Fastest way to clear out array

        this.generateBreadcrumbTrail(navigation.urlAfterRedirects ? navigation.urlAfterRedirects : navigation.url);
        this.paths.next(this._urls);
      }

    });

    // this.routerEventSubscription.unsubscribe();
    // this.pathsSubscription.unsubscribe();

  }

  generateBreadcrumbTrail(url: string): void {
    // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
    this._urls.unshift(decodeURIComponent(url));
    if (url.lastIndexOf('/') > 0) {
      // Find last '/' and add everything before it as a parent route
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
    }
  }

}
