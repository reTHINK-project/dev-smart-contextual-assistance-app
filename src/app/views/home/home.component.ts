import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Models
import { ContextualComm } from '../../models/models';
import { TriggerActions, RemoveContextEventType, RemoveContextEvent } from '../../models/app.models';

// Services
import { TriggerActionService, RethinkService } from '../../services/services';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { NotificationsService } from '../../components/notification/notifications.module';

@Component({
  moduleId: module.id,
  selector: 'home-view',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = 'home-view col';

  private removeContextSubscription: Subscription;

  contextualComms: Observable<ContextualComm[]>;

  constructor(
    private route: ActivatedRoute,
    private rethinkService: RethinkService,
    private triggerActionService: TriggerActionService,
    private notificationsService: NotificationsService,
    private contextualCommDataService: ContextualCommDataService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.contextualComms = this.contextualCommDataService.getChildContexts();

  }

  ngOnDestroy() {
    if (this.removeContextSubscription) { this.removeContextSubscription.unsubscribe(); }
  }

  onCreateEvent() {
    this.triggerActionService.trigger(TriggerActions.OpenContextMenuCreator);
  }

  removeContext(event: RemoveContextEvent, context: ContextualComm) {

    console.log('Context to be removed: ', event, context);

    if (event.type === RemoveContextEventType.Remove) {

      this.removeContextSubscription = this.contextualCommDataService.removeContext(event.context)
        .subscribe((result: boolean) => { console.log('Success:', result); },
        (error: any) => {
          this.notificationsService.error('Error removing context', error);
        });

    }

    if (event.type === RemoveContextEventType.Error) {
      this.notificationsService.error('Error removing context', event.reason);
    }

  }

}
