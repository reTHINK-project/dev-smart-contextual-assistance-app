import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import rethink from 'runtime-browser';

// Interfaces
import { Activity } from '../comp/activity/activity';
import { Context } from '../comp/context/context';

import { User } from '../models/models';

@Injectable()
export class AppService {

  domain = 'hybroker.rethink.ptinovacao.pt'
  runtimeURL = 'https://' + this.domain + '/.well-known/runtime/Runtime';

  config = {domain: this.domain, runtimeURL: this.runtimeURL, development: true }

  runtime: any

  public runtimeReady = new EventEmitter();

  myIdentity = <User>{}

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
    console.log('[Loading Rethink Runtime at] ', this.config.runtimeURL)

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

  getMyIdentity(hyperty: any) {

    console.log('[Get my Identity]:', hyperty)

    return new Promise((resolve, reject) => {

      let hypertyURL = hyperty.runtimeHypertyURL;
      hyperty.instance.identityManager.discoverUserRegistered().then((user: any) => {

        console.info('Getting the registed user', user);

        this.myIdentity = {
          username: user.username,
          userURL: user.userURL,
          cn: user.cn,
          locale: user.locale,
          avatar: user.avatar,
          status: 'online',
          unread: 0
        }

        resolve(this.myIdentity);
      }).catch((reason: any) => {
        console.info('Error getting the register user, using fake information', reason);
        resolve(this.myIdentity);
      })

    })

  }

}
