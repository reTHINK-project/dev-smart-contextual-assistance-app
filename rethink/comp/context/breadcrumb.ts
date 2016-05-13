import { Component, Input, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ul[context-breadcrumb]',
  templateUrl: 'comp/context/breadcrumb.html'
})
export class ContextBreadCrumbComponent {
  @HostBinding('class') hostClass = 'contactlist all-45'

  @Output('open-context') openContext = new EventEmitter();
}
