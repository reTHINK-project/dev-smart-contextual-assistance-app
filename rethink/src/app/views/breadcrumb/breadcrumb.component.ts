import { Component, Output, HostBinding, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  moduleId: module.id,
  selector: 'ul[context-breadcrumb]',
  templateUrl: './breadcrumb.component.html'
})
export class ContextBreadcrumbComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'rethink-breadcrumb';

  @Output() openContext = new EventEmitter();

  breadcrumb: Observable<Array<any>>;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.breadcrumb = this.breadcrumbService.breadcrumb.map((paths: string[]) => {

      console.log('[Breadcrumb Service] - Component: ', paths);

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

  ngOnDestroy(): void {
  }

  onClickEvent($event: MouseEvent) {
    this.openContext.emit($event);
  }

}
