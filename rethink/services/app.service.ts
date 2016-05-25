import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import rethink from 'runtime-browser';

// Interfaces
import {Activity} from '../comp/activity/activity';
import {Contact} from '../comp/contact/contact';
import {Context} from '../comp/context/context';

// Data
import {contacts} from './contacts';

@Injectable()
export class AppService {

  domain = 'hybroker.rethink.ptinovacao.pt'
  runtimeURL = 'https://' + this.domain + '/.well-known/runtime/Runtime';

  config = {domain: this.domain, runtimeURL: this.runtimeURL, development: true }

  runtime: any

  public runtimeReady = new EventEmitter();

  private contacts = contacts

  me = <Contact>{}

  getContacts() {
    return Promise.resolve(this.contacts)
  }

  getContact(id:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Contact>((resolve, reject) => {

      let contact = this.contacts.filter((contact) => {
        if(contact.id.indexOf(id) !== -1) return true
      })

      if (contact.length === 1) {
        resolve(contact[0])
      } else {
        reject('Contact not found');
      }


    })
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
      hyperty.instance.identityManager.discoverUserRegistered(hypertyURL).then((user: any) => {
        resolve(user);
      }).catch((reason: any) => {
        console.info('Error getting the register user, using fake information', reason);

        this.me.id = 'id10';
        this.me.name = 'Vitor Silva';
        this.me.status = 'online';
        this.me.email = 'vitorsilva@boldint.com';

        resolve(this.me);
      })

    })

  }

}
