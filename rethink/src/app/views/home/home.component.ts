import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// Models
import { ContextualComm } from '../../models/models';
import { TriggerActions } from '../../models/app.models';

// Services
import { TriggerActionService, RethinkService } from '../../services/services';
import { ContextualCommDataService } from '../../services/contextualCommData.service';

@Component({
  moduleId: module.id,
  selector: 'home-view',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @HostBinding('class') hostClass = 'home-view col';

  contextualComms: Observable<ContextualComm[]>;

  constructor(
    private route: ActivatedRoute,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService,
    private rethinkService: RethinkService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.contextualComms = this.contextualCommDataService.getContexts();

  }

  onCreateEvent() {
    this.triggerActionService.trigger(TriggerActions.OpenContextMenuCreator);
  }

  removeContext(event: any, context: ContextualComm) {

    console.log('Context to be removed: ', event, context);

    if (event.type === 'remove') {

      this.contextualCommDataService.removeContext(event.context)
        .subscribe((result: boolean) => { console.log('Success:', result); },
        (error: any) => { console.warn('Error:', error); })

    }

  }

}
