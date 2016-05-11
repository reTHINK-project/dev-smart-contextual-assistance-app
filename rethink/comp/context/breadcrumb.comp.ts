import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'ul[context-breadcrumb]',
  templateUrl: 'comp/context/breadcrumb.comp.html'
})
export class ContextBreadCrumbComponent {
  @HostBinding('class') hostClass = 'contactlist all-45'

}
