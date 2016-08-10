import { Injectable, bind } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AppService } from './app.service';

@Injectable()
export class CanActivateRoute implements CanActivate {

  constructor(private router: Router, private appService:AppService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    /* return this.appService.isAuthenticated()
    .map((result) => {
      console.log('Logged:', result);
      if (result) {
        return true;
      } else {
        return false;
      }
    })

    this.appService.isAuthenticated().subscribe(logged => {
      console.log('logged: ', logged);
    })

    return this.appService.isAuthenticated();*/
  }

}

export var canActivateRoute: Array<any> = [
  bind(CanActivateRoute).toClass(CanActivateRoute)
];