import { Injectable } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class RouterService {

  private _urls: string[];
  private paths:Subject<Array<string>> = new Subject<Array<string>>();

  breadcrumb: Observable<Array<string>>;

  constructor(private router: Router) {

    // this.paths.take(2)
    this.breadcrumb = this.paths.take(2)

        // Subscribe to route params
    this._urls = new Array();
    this.router.events.subscribe((navigation:NavigationEnd) => {
      this._urls.length = 0; //Fastest way to clear out array
      if (navigation instanceof NavigationEnd) {
        this.generateBreadcrumbTrail(navigation.urlAfterRedirects ? navigation.urlAfterRedirects : navigation.url);

        this.paths.next(this._urls);
      }
    });

  }

  generateBreadcrumbTrail(url: string): void {
    this._urls.unshift(url); //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
    if (url.lastIndexOf('/') > 0) {
        this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
    }
  }

}