import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private rethinkService: RethinkService,
    private chatService: ChatService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve) => {

      this.rethinkService.status.subscribe({
        next: (value) => { if (value) { console.log('CAN ACTIVATE:', value); resolve(value); } }
      });

    });

  }

}
