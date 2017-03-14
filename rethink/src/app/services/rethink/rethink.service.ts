import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import rethink from 'runtime-browser';

import { User } from '../../models/models';

import { ContactService } from '../contact.service';

@Injectable()
export class RethinkService {

  domain = 'localhost';
  runtimeURL = 'https://catalogue.' + this.domain + '/.well-known/runtime/Runtime';
  config = {domain: this.domain, runtimeURL: this.runtimeURL, development: true }

  runtime: any;

  public progress:BehaviorSubject<String> = new BehaviorSubject('');

  public status:BehaviorSubject<Boolean> = new BehaviorSubject(false);

  private currentUser: User;

  public set setCurrentUser(v: User) {
    this.currentUser = v;
  }

  public get getCurrentUser():User {
    return this.currentUser;
  }

  constructor(
    private contactService:ContactService) {}

  loadRuntime() {

    return new Promise((resolve, reject) => {

      console.log('[Loading Rethink Runtime at] ', this.config)

      rethink.install(this.config).then((runtime:any) => {
        console.log('[Runtime Loaded]')
        this.runtime = runtime;
        resolve(runtime);
      }).catch((error:any) => {
        console.error('[Error Loading Runtime] ', error)
      });

    })
  }

  getHyperty(url:string) {

    return new Promise((resolve, reject) => {

      this.runtime.requireHyperty(url, true).then((hyperty: any) => {
        console.log('[Hyperty Loaded]', hyperty)
        resolve(hyperty);
      }).catch((reason: any) => {
        console.error('[Hyperty Load Error]', reason);
        reject(reason);
      })

    });

  }

  getIdentity(hyperty: any) {

    console.log('[Get my Identity]:', hyperty)

    return new Promise((resolve, reject) => {

      let hypertyURL = hyperty.runtimeHypertyURL;
      hyperty.instance.identityManager.discoverUserRegistered().then((user: User) => {

        let myUser = new User(user);
        this.setCurrentUser = myUser;
        this.contactService.sessionUser = myUser;
        this.contactService.addUser(myUser);

        console.info('Getting the registed user', myUser);

        resolve(myUser);
      }).catch((reason: any) => {
        console.info('Error getting the register user, using fake information', reason);
        resolve(reason);
      })

    })

  }

}