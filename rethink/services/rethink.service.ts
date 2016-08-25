import 'rxjs/add/observable/of';
import { Injectable, Output, EventEmitter, bind } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';

import rethink from 'runtime-browser';

// Interfaces
import { Activity } from '../comp/activity/activity';
import { Context } from '../comp/context/context';

import { User } from '../models/models';

@Injectable()
export class RethinkService {

  domain = 'hybroker.rethink.ptinovacao.pt'
  runtimeURL = 'https://catalogue.' + this.domain + '/.well-known/runtime/Runtime';

  config = {domain: this.domain, runtimeURL: this.runtimeURL, development: true }

  runtime: any;
  redirectUrl: string;
  isLogged: boolean = false;
  logged:Subject<boolean>;

  private currentUser: User;

  public set setCurrentUser(v : User) {
    this.currentUser = v;
  }

  public get getCurrentUser() : User {
    return this.currentUser;
  }

  constructor() {
    this.logged = new BehaviorSubject(this.isLogged);
  }

  getHyperty(url:string) {

    return new Promise((resolve, reject) => {

      this.runtime.requireHyperty(url).then((hyperty: any) => {
        console.log('[Hyperty Loaded]', hyperty)
        resolve(hyperty);
      }).catch((reason: any) => {
        console.error('[Hyperty Load Error]', reason);
        reject(reason);
      })

    });

  }

  loadRuntime() {
    console.log('[Loading Rethink Runtime at] ', this.config)

    return new Promise((resolve, reject) => {

      rethink.install(this.config).then((runtime) => {
        console.log('[Runtime Loaded]')
        this.runtime = runtime;
        resolve(runtime);
      }).catch((error) => {
        console.error('[Error Loading Runtime] ', error)
      })

    })
  }

  getIdentity(hyperty: any) {

    console.log('[Get my Identity]:', hyperty)

    return new Promise((resolve, reject) => {

      let hypertyURL = hyperty.runtimeHypertyURL;
      hyperty.instance.identityManager.discoverUserRegistered().then((user: User) => {

        let myUser = new User(user);
        this.setCurrentUser = myUser;
        this.isLogged = true;
        this.logged.next(this.isLogged);

        console.info('Getting the registed user', myUser);

        resolve(myUser);
      }).catch((reason: any) => {
        console.info('Error getting the register user, using fake information', reason);
        resolve(reason);
      })

    })

  }

  isAuthenticated() {
    return this.logged.asObservable();
  }

}