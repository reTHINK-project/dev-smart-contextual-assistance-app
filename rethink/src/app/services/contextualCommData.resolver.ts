import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Model
import { ContextualComm } from './../models/models';

// Utils
import { normalizeName, normalizeFromURL } from '../utils/utils';

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
    ) {
    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let context = route.params['context'];
      let task = route.params['task'];
      let user = route.params['user'];
      let path = state.url;
      let name = '';

      if (context) { name = context; };
      if (task) { name = task; };
      if (user) { name = user; };

      name = normalizeFromURL(path, this.contactService.sessionUser.username);

      let normalizedName = normalizeName(name);

      console.log('[ContextualCommData - Resolve] - normalized name:', name, normalizedName, path);

      this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
        next: contextualComm => resolve(contextualComm),
        error: reason => {
          console.log('[ContextualCommData - Resolve] - user:', user);
          reject(reason);
        }
      });

    });

  }

}
