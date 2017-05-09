import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

// Model
import { User } from '../models/models';

// Service
import { ContactService } from './contact.service';
import { RethinkService, ChatService, ContextualCommService } from './services';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private rethinkService: RethinkService,
    private chatService: ChatService,
    private ContextualCommService: ContextualCommService,
    private contactService: ContactService,
    private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> {

    return new Promise((resolve, reject) => {
      let selectedUser = decodeURIComponent(route.params['user']);
      console.log(selectedUser);
      let user: User = this.contactService.getByUserName(selectedUser);

      if (user) {
        resolve(user);
      } else {
        reject('no user found');
      }

    });

  }

}
