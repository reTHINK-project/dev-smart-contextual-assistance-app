import { Injectable } from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { config } from '../config';

// Model
import { ContextualComm } from './../models/models';

// Utils
import { isAnUser, normalizeName, normalizeFromURL } from '../utils/utils';

// Service
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommService } from './contextualComm.service';
import { TriggerActionService } from './triggerAction.service';
import { ContactService } from './contact.service';
import { User } from '../models/models';

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

      const context = route.params['context'];
      const task = route.params['task'];
      const user = route.params['user'];
      const path = state.url;
      let name = '';
      let title = '';

      if (context) { name = context;  title = context; };
      if (task) { name = task; title = task; };
      if (user) { name = user; title = user; };

      name = normalizeFromURL(path, this.contactService.sessionUser.username);

      const normalizedName = normalizeName(name);

      console.log('[ContextualCommData - Resolve] - normalized name:', name, task, normalizedName, path, user);

      if (isAnUser(normalizedName.name)) {
        this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
          next: contextualComm => resolve(contextualComm),
          error: reason => {

            const currentUser: User = this.contactService.getByUserName(user);

            const current: any = <any>[];

            current.push({
              user: currentUser.username,
              domain: currentUser.domain
            });

            console.log('current:', current);

            this.contextualCommDataService.createAtomicContext(current, normalizedName.name, normalizedName.id, normalizedName.parent)
              .then((contextualComm: ContextualComm) => {
                console.log('AQUI:', contextualComm);
                resolve(contextualComm)
              })
              .catch((error) => {
                console.log('[ContextualCommData - Resolve] - user:', reason);
                reject(reason);
                this.goHome();
              })

          }
        });
      } else {
        this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
          next: contextualComm => resolve(contextualComm),
          error: reason => {
            console.log('[ContextualCommData - Resolve] - task or context:', reason);
            reject(reason);
            this.goHome();
          }
        });
      }

    });

  }

  goHome() {
    console.log('[ContextualCommData - Resolve] - Can not resolve - Home ');
    this.router.navigate(['/']);
  }

}
