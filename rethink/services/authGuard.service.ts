import { Injectable, bind }             from '@angular/core';
import { Router, Resolve, CanActivate,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

import { RethinkService } from './rethink.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private appService: RethinkService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    this.appService.redirectUrl = state.url;
    console.log('Can Activate: ', this.appService.isLogged);
    return this.appService.isLogged;
  }
}