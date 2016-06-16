import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

// Services
import { LocalStorage } from './storage.service';

// Interfaces
import { Context, ContextType } from '../comp/context/context';
import { Contact } from '../comp/contact/contact';
import { Activity, ActivityType } from '../comp/activity/activity';

import { ContextualCommTrigger, ContextualComm, ContextValues } from '../models/ContextualCommTrigger';

// Data
import { contacts } from './contacts';

@Injectable()
export class ContextService {

  private contacts = contacts

  constructor(private localStorage:LocalStorage){}

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

  private sourceContexts = new Subject<Array<ContextualCommTrigger>>();

  contexts = this.sourceContexts.asObservable();
  contextsList: ContextualCommTrigger[] = [];

  getContexts() {
    return Promise.resolve(this.contexts)
  }

  get(key: string) {

    return new Promise<Context>((resolve, reject) => {
      resolve(this.localStorage.getObject(key));
    });

  }

  create(dataObject: any) {

    return new Promise<ContextualCommTrigger>((resolve, reject) => {

      console.log('dataObject: ', dataObject);

      let contextValue:ContextValues = {
        name: 'location',
        unit: 'rad',
        value: 0,
        sum: 0
      }

      let contextualCommTrigger:ContextualCommTrigger = {
        contextName: dataObject.data.id,
        contextScheme: 'context',
        contextResource: ['video', 'audio', 'chat'],
        values: [contextValue],
        triggers: []
      }

      resolve(contextualCommTrigger);

      // context.id = dataObject.data.id;
      // context.name = dataObject.data.name;
      // context.owner = dataObject.data.owner;
      // context.status = dataObject.data.status;
      // context.schema = dataObject.data.schema;
      // context.reporter = dataObject.data.reporter;
      // context.duration = dataObject.data.duration;
      // context.startingTime = dataObject.data.startingTime;
      // context.lastModified = dataObject.data.lastModified;
      // context.participants = dataObject.data.participants;
      //
      // context.type = 'public';
      // context.contacts = [];
      // context.activities = [];
      // context.childs = [];
      // context.resource = dataObject.url;
      //
      // this.localStorage.setObject(context.id, context);
      // this.contextsList.push(context);
      // this.sourceContexts.next(this.contextsList);

      // resolve(context);

    })

  }

  updateContext(contextName: string, value: Context) {

    this.getContextByName(contextName).then((context) => {
      console.log('[Update Context]: ', context);
      context.childs.push(value);

      this.localStorage.setObject(context.id, context);
      // this.sourceContexts.next(context.childs);
    });

  }

  createContext(name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private') {

    return new Promise<Context>((resolve, reject) => {

      // TODO: optimize this process, we need create a context like a child from the parent context
      try {

        let context = <Context>{}

        context.name = name,
        context.resource = resource,
        context.type = type,
        context.contacts = [],
        context.activities = activities

        // this.sourceContexts.next(context);

        resolve(context);
      } catch(error) {
        reject(error)
      }
    })
  }

  updateContextActivity(resource:string, contact:Contact, type: ActivityType, status:string, message:string) {

    return new Promise<Context>((resolve, reject) => {
      let activity = <Activity>{}

      activity.contact = contact
      activity.type = type
      activity.date = new Date().toJSON()
      activity.status = 'ok',
      activity.message = message

      return this.getContextByName('Work').then((context) => {
        // context.childs.push();
        context.activities.push(activity);
        resolve(context);
      })

    })

    // { contact: this.contacts[0], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Praesent quis quam mattis, tempus nulla iaculis, porttitor dui. In.' },
  }

  getContextByName(name:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Context>((resolve, reject) => {
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
    return new Promise<Context>((resolve, reject) => {
    //
    //   let context = this.contextsList.filter((context) => {
    //     if(context.resource.indexOf(resource) !== -1) return true
    //   })
    //
    //   if (context.length === 1) {
    //     resolve(context[0])
    //   } else {
    //     reject('Context not found');
    //   }
    })

  }

}
