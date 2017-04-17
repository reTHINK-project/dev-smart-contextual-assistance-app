import { Component, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RouterService } from '../../services/services';

@Component({
  moduleId: module.id,
  selector: 'ul[context-breadcrumb]',
  templateUrl: './breadcrumb.component.html'
})
export class ContextBreadcrumbComponent implements OnInit {
  @HostBinding('class') hostClass = 'contactlist all-45';

  @Output() openContext = new EventEmitter();

  private breadcrumb: Observable<Array<any>>;

  constructor(private routerService: RouterService) {}

  ngOnInit() {
    this.breadcrumb = this.routerService.breadcrumb;
  }

}
