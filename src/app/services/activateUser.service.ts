import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

// Utils
import { isALegacyUser, normalizeName, normalizeFromURL } from '../utils/utils';

// Model
import { ContextualComm, User, ContextualCommEvent } from '../models/models';

// Services
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommService } from './contextualComm.service';
import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';
import { ContactService } from './contact.service';

@Injectable()
export class ActivateUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private contextualCommService: ContextualCommService,
    private contextualCommDataService: ContextualCommDataService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.rethinkService.status.subscribe({
        next: (value: boolean) => {

          if (value) {
            const path = state.url;
            const context = route.params['context'];
            const user = route.params['user'];

            const normalizedPath = normalizeFromURL(path, this.contactService.sessionUser.username);

            console.log('[Activate User Guard] - ', context, user, state, normalizedPath);

            const normalizedName = normalizeName(normalizedPath);
            const currentUser = this.contactService.getByUserName(user);

            console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath);
            console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContextById(normalizedName.id).toPromise().then(
              (currentContext: ContextualComm) => {

                if (user && currentUser && currentUser.isLegacy) {
                  reject('This kind of user do not allow private messages');
                } else {
                  resolve(true);
                }

              }).catch((reason: any) => {


                this.contextualCommDataService.createAtomicContext(
                  [{user: currentUser.username, domain: currentUser.domain}],
                  normalizedName.name, normalizedName.id, normalizedName.parent).then((contextualComm: ContextualComm) => {
                    console.log('[Activate User Guard - Activate] - Can Activate route:', contextualComm);
                    resolve(true);
                  }).catch((error: any) => {
                    // TODO Handle this logs and the expection
                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', error);
                    resolve(false);
                  })

              });
          }

        }

      });

    });

  }

  goHome() {
     console.log('[Activate User Guard - Activate] - Can not activate - Home ');
    this.router.navigate(['/']);
  }

}
