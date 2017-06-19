import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/combination/merge';

import { config } from '../config';

// Models
import { ContextualComm } from '../models/models';

// Utils
import { normalizeName, normalizeFromURL } from '../utils/utils';

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
    private titleService: Title,
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
            let title = '';

            if (context) { name = context; title = context; };
            if (task) { name = task; title = task; };
            if (user) {
              title = user;
              name = user;
            };

            this.titleService.setTitle(config.pageTitlePrefix + title);

            let path = state.url;
            console.log('[ContextualCommData - Activate] - path: ', path, name);
            let normalizedPath = normalizeFromURL(path, this.rethinkService.getCurrentUser.username);
            let normalizedName = normalizeName(normalizedPath);

            console.log('[ContextualCommData - Activate] - normalized path: ', normalizedPath);
            console.log('[ContextualCommData - Activate] - normalized name: ', normalizedName);

            this.contextualCommDataService.getContextById(normalizedName.id).subscribe(
              (context: ContextualComm) => {
                this.activateContext(context);
                resolve(true);
            }, (reason: any) => {

              // Observable.merge()

              // Get the parent
              this.contextualCommDataService.getContextById(normalizedName.parent).subscribe((context: ContextualComm) => {

                let invitedUser = this.contactService.getUser(user);

                console.log('[ContextualCommData - Activate] - parent context and user found: ', normalizedPath);

                if (context && user && invitedUser) {

                  this.contextualCommDataService.createAtomicContext(user, normalizedName.id, normalizedName.parent)
                    .then(context => {
                      this.activateContext(context);
                      resolve(true);
                    })
                    .catch(reason => {
                      console.log('[ContextualCommData - Activate] - Can Not Activate Route:', reason);
                      this.goHome();
                      resolve(false);
                    });
                } else {
                  console.log('[ContextualCommData - Activate] - Can Not Activate Route:', 'Parent context not found');
                  this.goHome();
                  resolve(false);
                }
              }, (reason) => {
                console.log('[ContextualCommData - Activate] - Can Not Activate Route:', reason);
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
    console.log('[ContextualCommData - Activate] - home');
    this.router.navigate(['/']);
  }

  activateContext(context: ContextualComm) {
    console.log('[ContextualCommData - Activate] - Can Activate Route - ', context.url);
    this.chatService.activeDataObjectURL = context.url;
    this.contextualCommService.setActiveContext = context.url;
  }
}
