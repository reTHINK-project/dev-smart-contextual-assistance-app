import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

// Model
import { ContextualComm } from './../models/models';
import { TriggerActions } from '../models/app.models';


// Service
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommService } from './contextualComm.service';
import { TriggerActionService } from './triggerAction.service';
import { ContactService } from './contact.service';

@Injectable()
export class ContextualCommDataResolver implements Resolve<ContextualComm> {

  constructor(
    private router: Router,
    private contactService: ContactService,
    private triggerActionService: TriggerActionService,
    private contextualCommService: ContextualCommService,
    private contextualCommDataService: ContextualCommDataService
    ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let context = route.params['context'];
      let task = route.params['task'];
      let user = route.params['user'];
      let name = '';

      if (context) { name = context; };
      if (task) { name = task; };
      if (user) {
        name = this.contextualCommDataService.normalizeAtomicName(this.atomicContextualComm(user));
      };

      console.log('[ContextualCommData - Resolve] - normalized name:', name);

      this.contextualCommDataService.getContext(name).subscribe({
        next: contextualComm => resolve(contextualComm),
        error: reason => {
          console.log('[ContextualCommData - Resolve] - user:', user);
          if (user) {
            return this.contextualCommDataService.createAtomicContext(user, name, task)
            .then(context => resolve(context))
            .catch(reason => reject(reason));
          } else {
            this.triggerActionService.trigger(TriggerActions.OpenContextMenuCreator);
            reject(reason);
          }
        }
      });

    });

  }

  atomicContextualComm(user: string): string {
    let currentUser = this.contactService.sessionUser.username;
    let invitedUser = user;
    return currentUser + '-' + invitedUser;
  }

}
