import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Models
import { ContextualComm } from '../models/models';

// Services
import { ContactService } from './contact.service';
import { ContextualCommService } from './contextualComm.service';

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
    private contextualCommService: ContextualCommService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve) => {

      let context = route.params['context'];
      let task = route.params['task'];
      let user = route.params['user'];
      let name = '';

      if (context) { name = context; };
      if (task) { name = task; };
      if (user) { name = this.atomicContextualComm(user); };

      this.rethinkService.status.subscribe({
        next: (value: boolean) => {

          if (value) {

            this.contextualCommService.getContextByName(name)
            .then((context: ContextualComm) => {

              console.log('[Can Activate Route] - ', context.url);

              this.chatService.activeDataObjectURL = context.url;
              this.contextualCommService.setActiveContext = context.url;

              console.log('[Can Activate Route] - ', context.url);

              resolve(true);
            })
            .catch((reason: any) => {
              console.log('[Can Activate Route] - ', reason);
              resolve(true);
            });

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
