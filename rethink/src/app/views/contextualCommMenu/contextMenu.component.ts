import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ContextualComm } from '../../models/models';

import { ContextualCommService } from '../../services/services';

@Component({
  moduleId: module.id,
  selector: 'nav[context-menu]',
  templateUrl: './contextMenu.component.html'
})
export class ContextMenuComponent {
  @HostBinding('class') hostClass = 'mp-menu';

  contextualComm: Observable<ContextualComm[]>;

  constructor(
    private contextualCommService: ContextualCommService
  ) {

    this.contextualComm = this.contextualCommService.getContextualComms();

  }

  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'form' && $event.nextState === false) {
      $event.preventDefault();
    }

  };
}
