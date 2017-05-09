import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ContextualCommTrigger } from '../../models/models';

import { ContextualCommTriggerService, ContextualCommService } from '../../services/services';

@Component({
  moduleId: module.id,
  selector: 'nav[context-menu]',
  templateUrl: './contextMenu.component.html'
})
export class ContextMenuComponent {
  @HostBinding('class') hostClass = 'mp-menu';

  contextualCommTrigger: Observable<ContextualCommTrigger[]>;

  constructor(
    private contextualCommService: ContextualCommService,
    private contextualCommTriggerService: ContextualCommTriggerService
  ) {

    this.contextualCommTrigger = this.contextualCommTriggerService.getContextualCommTriggers();

  }

  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'form' && $event.nextState === false) {
      $event.preventDefault();
    }

  };
}
