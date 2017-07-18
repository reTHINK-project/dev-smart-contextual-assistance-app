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
export class ActivateTaskGuard implements CanActivate {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private rethinkService: RethinkService,
    private contactService: ContactService,
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
            const task = route.params['task'];

            const normalizedPath = normalizeFromURL(path, this.contactService.sessionUser.username);

            console.log('[Activate Task Guard] - ', context, task, state, normalizedPath);

            const normalizedName = normalizeName(normalizedPath);

            console.log('[Activate Task Guard - Activate] - normalized path: ', normalizedPath);
            console.log('[Activate Task Guard - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContextById(normalizedName.id).subscribe(
              (context: ContextualComm) => {
                this.activateContext(context);
                resolve(true);
            }, (reason: any) => {

              console.log('[Activate Task Guard - Activate] - Can not activate - reason: ', reason);
              this.goHome();
              resolve(false);
            });
          }
        }
      });
    });
  }

  goHome() {
     console.log('[Activate Task Guard - Activate] - Can not activate - Home ');
    this.router.navigate(['/']);
  }

  activateContext(context: ContextualComm) {
    console.log('[Activate Task Guard - Activate] - Can Activate Route - ', context.url);
    this.chatService.activeDataObjectURL = context.url;
    this.contextualCommService.setActiveContext = context.url;
  }
}
