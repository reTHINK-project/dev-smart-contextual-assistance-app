import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

// Services
import { LocalStorage } from './storage.service';

// Interfaces
import { Contact } from '../comp/contact/contact';

import { ContextualCommTrigger, ContextValues } from '../models/ContextualCommTrigger';
import { Context } from '../models/Context';
import { ContextualComm } from '../models/ContextualComm';
import { ContextualCommUser } from '../models/ContextualCommUser';
import { Communication } from '../models/Communication';

@Injectable()
export class ContextService {

  constructor(private localStorage:LocalStorage){}

  // activities: [Activity] = [
  //   { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
  //   { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
  //   { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  // ]

  private activeContext:any;

  private sourceContextsList: ContextualComm[] = [];
  private sourceContexts = new Subject<Array<ContextualComm>>();
  contexts = this.sourceContexts.asObservable();

  private contextualCommUsersList = new Subject<Array<ContextualCommUser>>();
  private contextUsersList: ContextualCommUser[] = [];
  contextUsers = this.contextualCommUsersList.asObservable();

  private contextTrigger = new Subject<Array<ContextualCommTrigger>>();
  triggersList: ContextualCommTrigger[] = [];


  getCurrentContext() {

  }

  getContexts() {
    return Promise.resolve(this.contexts)
  }

  get(key: string) {

    return new Promise<ContextualComm>((resolve, reject) => {
      resolve(this.localStorage.getObject(key));
    });

  }

  create(name: string, dataObject: any) {

    return new Promise<ContextualComm>((resolve, reject) => {

      console.log('dataObject: ', dataObject);

      this.createContextTrigger(name, dataObject).then((context:ContextualCommTrigger) => {

        let communication = <Communication>{}
        Object.keys(dataObject.data).forEach((key: any, value: any) =>{
          communication[key] = dataObject.data[key];
        })

        let users:ContextualCommUser[] = [];
        let user = <ContextualCommUser>{}
        Object.keys(dataObject.data.participants).forEach((key: any, value: any) => {
          console.log(key, value);
          user = dataObject.data.participants[key];
          users.push(user);
        });

        let contextComm:ContextualComm = {
          url: dataObject.url,
          name: dataObject.data.name,
          description: '',
          users: users,
          messages: [],
          contexts: [],
          communication: communication
        }

        context.trigger = contextComm;

        this.localStorage.setObject(context.contextName, context);
        this.sourceContextsList.push(contextComm);
        this.sourceContexts.next(this.sourceContextsList);

        resolve(contextComm);

      })

    })

  }

  updateContextCommUsers(users: ContextualCommUser[]) {

    console.log('[Update the Context Comm Users]', this.activeContext, users);
    if(this.activeContext) {

      let contextualComm = this.activeContext.trigger;

      users.forEach((user) => {
        user.status = 'online';
        user.unread = 0;
        contextualComm.users.push(user);
        this.contextUsersList.push(user);
      })

      this.localStorage.setObject('ContactList', contextualComm.users);
      this.contextualCommUsersList.next(this.contextUsersList);

    }
  }

  updateContextCommMessages() {

  }

  createContextTrigger(name: string, dataObject: any) {

    return new Promise<ContextualCommTrigger>((resolve, reject) => {

      console.log('[Context Service - Get Localstorage] ', this.localStorage.hasObject(name), this.localStorage);

      if (!this.localStorage.hasObject(name)) {
        let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }

        let contextualCommTrigger:ContextualCommTrigger = {
          contextName: name,
          contextScheme: 'context',
          contextResource: ['video', 'audio', 'chat'],
          values: [contextValue],
          trigger: null
        }

        this.localStorage.setObject(name, contextualCommTrigger)
        this.activeContext = contextualCommTrigger;
        resolve(contextualCommTrigger);
      } else {
        let contextualCommTrigger:ContextualCommTrigger = this.localStorage.getObject(name);
        this.activeContext = contextualCommTrigger;
        resolve(contextualCommTrigger);
      }
    })

  }

  getContextByName(name:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<ContextualComm>((resolve, reject) => {
    //
    //   console.log(this.sourceContexts);
    //
    //   let context = this.contextsList.filter((context) => {
    //     console.log('Context Filter:', context);
    //
    //     if(context.name.indexOf(name) !== -1) return true
    //   })
    //
    //   if (context.length === 1) {
    //     resolve(context[0])
    //   } else {
    //     reject('Context not found');
    //   }
    })

  }

  getContextByResource(resource:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<ContextualComm>((resolve, reject) => {

      let context = this.sourceContextsList.filter((context) => {
        if(context.url.indexOf(resource) !== -1) return true
      })

      if (context.length === 1) {
        resolve(context[0])
      } else {
        reject('Context not found');
      }
    })

  }

}
