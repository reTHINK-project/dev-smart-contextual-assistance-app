import { Component, Input, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { RouterService } from '../../services/router.service';

@Component({
  selector: 'ul[context-breadcrumb]',
  templateUrl: 'app/breadcrumb/breadcrumb.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [RouterService]
})
export class ContextBreadcrumbComponent implements OnInit {
  @HostBinding('class') hostClass = 'contactlist all-45'

  @Output() openContext = new EventEmitter();

  private breadcrumb:Observable<Array<any>>;

  constructor(private routerService:RouterService){}

  ngOnInit() {
    this.breadcrumb = this.routerService.breadcrumb;
  }

}
