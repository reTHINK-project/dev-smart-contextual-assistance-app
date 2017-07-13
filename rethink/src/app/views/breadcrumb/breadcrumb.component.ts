import { Component, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/pairwise';

import { RouterService } from '../../services/services';

@Component({
  moduleId: module.id,
  selector: 'ul[context-breadcrumb]',
  templateUrl: './breadcrumb.component.html'
})
export class ContextBreadcrumbComponent implements OnInit {
  @HostBinding('class') hostClass = 'rethink-breadcrumb';

  @Output() openContext = new EventEmitter();

  breadcrumb: Observable<Array<any>>;

  constructor(
    private router: Router,
    private routerService: RouterService) {
  }

  ngOnInit() {
    this.breadcrumb = this.routerService.breadcrumb.map((paths: string[]) => {
      return paths.map((path: string) => {
        if (path.indexOf('?') !== -1) { path = path.substring(0, path.indexOf('?')); }
        if (path.indexOf('user') !== -1) { path = path.replace('user', ''); }
        return path;
      }).map((item: string) => {
        item = item.replace('/', '').substr(item.lastIndexOf('/'));
        if (item && item.length > 0) {return item; }
      }).filter(item => item ? true : false);
    });

  }

  onClickEvent($event: MouseEvent) {
    this.openContext.emit($event);
  }

}
