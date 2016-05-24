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

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

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

  getActivities() {
    return Promise.resolve(this.activities)
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
      }).then((logged) => {

      }).catch((error) => {
        console.error('[Login error] ', error);
      })

    })
  }

}
