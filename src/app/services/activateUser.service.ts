import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

// Utils
import { isALegacyUser, normalizeName, normalizeFromURL } from '../utils/utils';

// Model
import { ContextualComm, User } from '../models/models';

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
    private chatService: ChatService,
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

            console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath);
            console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContextById(normalizedName.id).subscribe(
              (currentContext: ContextualComm) => {
                this.activateContext(currentContext);
                resolve(true);
              },
              (reason: any) => {

                // Get the parent
                this.contextualCommDataService.getContextById(normalizedName.parent).subscribe(
                  (parentContext: ContextualComm) => {

                  console.log('[Activate User Guard - Activate] - parent context and user found: ', normalizedPath);
                  console.log('[Activate User Guard - Activate] - parent context and user found: ', parentContext, user);

                  if (parentContext && user) {
                    this.activateContext(parentContext);
                    resolve(true);
                  } else {
                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', 'Parent context not found');
                    this.goHome();
                    resolve(false);
                  }
                }, (error: any) => {

                  const currentUser = this.contactService.getByUserName(user);

                  if (user && currentUser && currentUser.isLegacy) {
                    reject('This kind of user do not allow private messages');
                  } else {
                    // TODO Handle this logs and the expection
                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', error);
                    this.goHome();
                    resolve(false);
                  }

                });

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

  activateContext(context: ContextualComm) {
    console.log('[Activate User Guard - Activate] - Can Activate Route - ', context.url);
    this.chatService.activeDataObjectURL = context.url;
    this.contextualCommService.setActiveContext = context.url;
  }
}
