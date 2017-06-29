import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

// Utils
import { normalizeName, normalizeFromURL } from '../utils/utils';

// Model
import { ContextualComm } from '../models/models';

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
            let path = state.url;
            let context = route.params['context'];
            let user = route.params['user'];

            let normalizedPath = normalizeFromURL(path, this.contactService.sessionUser.username);

            console.log('[Activate User Guard] - ', context, user, state, normalizedPath);

            let normalizedName = normalizeName(normalizedPath);

            console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath);
            console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContext(normalizedName.name).subscribe(
              (context: ContextualComm) => {
                this.activateContext(context);
                resolve(true);
              },
              (reason: any) => {

                // Get the parent
                this.contextualCommDataService.getContextById(normalizedName.parent).subscribe((context: ContextualComm) => {

                  console.log('[Activate User Guard - Activate] - parent context and user found: ', normalizedPath);
                  console.log('[Activate User Guard - Activate] - parent context and user found: ', context, user);

                  if (context && user) {

                    this.contextualCommDataService.createAtomicContext(user, normalizedName.name, normalizedName.id, normalizedName.parent)
                      .then(context => {
                        this.activateContext(context);
                        resolve(true);
                      })
                      .catch(reason => {
                        console.log('[Activate User Guard - Activate] - Can Not Activate Route:', reason);
                        this.goHome();
                        resolve(false);
                      });
                  } else {
                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', 'Parent context not found');
                    this.goHome();
                    resolve(false);
                  }
                }, (reason) => {
                  console.log('[Activate User Guard - Activate] - Can Not Activate Route:', reason);
                  this.goHome();
                  resolve(false);
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
