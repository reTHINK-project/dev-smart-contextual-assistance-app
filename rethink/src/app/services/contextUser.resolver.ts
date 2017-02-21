import { Injectable }             from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

// Services
import { ContextService } from './rethink/context.service';

// Model
import { User, ContextualComm } from '../models/models';

@Injectable()
export class ContextUserResolver implements Resolve<User[]> {

  constructor(
      private contextService: ContextService,
      private router: Router) {}

  resolve(route: ActivatedRouteSnapshot):Observable<User[]> {

    let name = route.params['context'];
    console.log('[Context User Resolver] - getContextByName:', name );

    return this.contextService.getContextUsers(name);

  }

}