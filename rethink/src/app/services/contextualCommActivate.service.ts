import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/takeLast';

// Models
import { ContextualComm } from '../models/models';

// Utils
import { normalizeName } from '../utils/utils';

// Services
import { ContactService } from './contact.service';
import { ContextualCommService } from './contextualComm.service';
import { ContextualCommDataService } from './contextualCommData.service';

// Rethink Services
import { ChatService } from './rethink/chat.service';
import { RethinkService } from './rethink/rethink.service';

@Injectable()
export class ContextualCommActivateService implements CanActivateChild {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private contextualCommService: ContextualCommService,
    private contextualCommDataService: ContextualCommDataService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.rethinkService.status.subscribe({
        next: (value: boolean) => {

          if (value) {

            let context = route.params['context'];
            let task = route.params['task'];
            let user = route.params['user'];
            let name = '';

            if (context) { name = context; };
            if (task) { name = task; };
            if (user) {
              name = this.contextualCommDataService.normalizeAtomicName(this.atomicContextualComm(user));
            };

            let normalizedName = normalizeName(name);

            console.log('[ContextualCommData - Activate] - normalized name:', normalizedName);

            this.contextualCommDataService.getContext(normalizedName.name).subscribe(
              (context: ContextualComm) => {
                this.activateContext(context);
                resolve(true);
            }, (reason: any) => {

              if (user) {
                this.contextualCommDataService.createAtomicContext(user, normalizedName.id, normalizedName.parent)
                .then(context => {
                  this.activateContext(context);
                  resolve(true);
                })
                .catch(reason => {
                  console.log('[Can Not Activate Route] - ', reason);
                  resolve(false);
                });
              } else {
                this.router.navigate(['/']);
                resolve(false);
              }
            });
          }

        }
      });

    });

  }

  activateContext(context: ContextualComm) {
    console.log('[Can Activate Route] - ', context.url);
    this.chatService.activeDataObjectURL = context.url;
    this.contextualCommService.setActiveContext = context.url;
  }

  atomicContextualComm(user: string): string {
    let currentUser = this.contactService.sessionUser.username;
    let invitedUser = user;
    return currentUser + '-' + invitedUser;
  }

}
