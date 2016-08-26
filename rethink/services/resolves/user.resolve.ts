import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

// Model
import { User } from '../../models/models';

// Service
import { ContactService } from '../services';

@Injectable()
export class UserResolve implements Resolve<User> {

  constructor(
    private contactService: ContactService,
    private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {

    let user:string = route.params['user'];

    // TODO: check why the Observable don't work;
    return new Promise((resolve, reject) => {

      this.contactService.getContact(user).subscribe((user:User) => {
        resolve(user);
      })
      

    });

  }

}