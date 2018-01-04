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
import { NotificationsService } from '../components/notification/notifications/services/notifications.service';
import { splitFromURL } from 'app/utils/utils';

@Injectable()
export class ActivateUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private notificationService: NotificationsService,
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

            const normalizedPath = normalizeFromURL(path, this.contactService.sessionUser.email);

            console.log('[Activate User Guard] - ', context, user, state, normalizedPath);

            const normalizedName = normalizeName(normalizedPath);
            const currentUser = this.contactService.getByUserName(user);

            console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath);
            console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContextById(normalizedName.id).toPromise().then(
              (currentContext: ContextualComm) => {

                if (user && currentUser && currentUser.isLegacy) {
                  this.throwError('Error', 'This kind of user do not allow private messages');
                  this.goParent(normalizedName.parent);
                  resolve(false);
                } else {
                  resolve(true);
                }

              }).catch((reason: any) => {

                if (user && currentUser) {


                  if (currentUser.isLegacy) {
                    resolve(false);
                    this.throwError('Error', 'This kind of user do not allow private messages');
                  } else {

                    this.contextualCommDataService.getContextById(normalizedName.parent).subscribe((parentContext: ContextualComm) => {

                      this.contextualCommDataService.createAtomicContext(
                        [{user: currentUser.email, domain: currentUser.domain}],
                        normalizedName.name, normalizedName.id, normalizedName.parent).then((contextualComm: ContextualComm) => {
                          console.log('[Activate User Guard - Activate] - Can Activate route:', contextualComm);
                          resolve(true);
                        }).catch((error: any) => {
                          console.log('[Activate User Guard - Activate] - Can Not Activate Route:', error);
                          this.throwError('Error', error);
                          this.goParent(normalizedName.parent);
                          resolve(false);
                        });

                    }, (error: any) => {
                      console.log('[Activate User Guard - Activate] - Can Not Activate Route:', error);
                      this.throwError('Error', error);
                      this.goParent(normalizedName.parent);
                      resolve(false);
                    }).unsubscribe();


                  }

                } else {
                  console.log('[Activate User Guard - Activate] - Can Not Activate Route: user not found');
                  this.throwError('User not found', 'We can not find the user ' + user);
                  this.goParent(normalizedName.parent);
                  resolve(false);
                }

              });
          }

        }

      });

    });

  }

  throwError(title: string, description?: string) {
    this.notificationService.error(title, description);
  }

  private goParent(parent: string) {

    const pathObject = splitFromURL(parent, this.contactService.sessionUser.email);

    let path = pathObject.context || '/';
    if (pathObject.task) { path += pathObject.task; }

    console.log('[Activate User Guard - Activate] - error: ', pathObject, path);

    this.router.navigate([path]);
  }

}
