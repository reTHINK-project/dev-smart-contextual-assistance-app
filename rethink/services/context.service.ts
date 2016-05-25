import { Injectable } from '@angular/core';

// Interfaces
import { Context, ContextType } from '../comp/context/context';
import { Contact } from '../comp/contact/contact';
import { Activity, ActivityType } from '../comp/activity/activity';

// Data
import { contacts } from './contacts';

@Injectable()
export class ContextService {

  private contacts = contacts

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

  contexts: Context[] = [
    {
      name: "Work",
      type: 'public',
      icon: 'a',
      resource: 'comm://hybroker.rethink.ptinovacao.pt',
      contacts: this.contacts,
      activities: this.activities
    },
    {
      name: '',
      type: 'private',
      resource: '',
      contacts: [],
      activities: [
        { contact: this.contacts[0], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Praesent quis quam mattis, tempus nulla iaculis, porttitor dui. In.' },
        { contact: this.contacts[1], type: 'file-share', status: 'ok', date: 'at 14:30' },
        { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel lorem ullamcorper, mattis odio id, tempus risus. Pellentesque finibus justo ut turpis congue lacinia. In justo nisi, porttitor eget porta nec, aliquam a sem. Duis non iaculis erat. Ut turpis lorem, blandit a pulvinar ut, vehicula at lectus. Etiam at metus vel tellus accumsan venenatis. Nullam justo risus, gravida ultricies molestie ut, bibendum ut dolor. Sed auctor sollicitudin nisi sit amet placerat.' },
        { contact: this.contacts[0], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Class aptent taciti sociosqu ad.' },
        { contact: this.contacts[0], type: 'message', status: 'ok', read: false, date: '20/07/2014, 15:36', message: 'Sed vel faucibus risus. Proin.' },
        { contact: this.contacts[1], type: 'message', status: 'ok', read: false, date: '20/07/2014, 15:36', message: 'Integer in libero eu libero.' },
      ]
    },

    {name: "Fitness", type: 'private', icon: 'a', resource: 'comm://hybroker.rethink.ptinovacao.pt', contacts: [], activities: []},
    {name: "School", type: 'private', icon: 'a', resource: 'comm://hybroker.rethink.ptinovacao.pt', contacts: [], activities: []}
  ]

  getContexts() {
    return Promise.resolve(this.contexts)
  }

  createContext(name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private') {

    return new Promise<Context>((resolve, reject) => {

      try {

        let context = <Context>{}

        context.name = name,
        context.resource = resource,
        context.type = type,
        context.contacts = contacts,
        context.activities = activities

        this.contexts.push(context);

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

      return this.getContextByResource(resource).then((context) => {
        context.activities.push(activity);
        resolve(context);
      })

    })

    // { contact: this.contacts[0], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Praesent quis quam mattis, tempus nulla iaculis, porttitor dui. In.' },
  }

  getContextByName(name:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Context>((resolve, reject) => {

      let context = this.contexts.filter((context) => {
        if(context.name.indexOf(name) !== -1) return true
      })

      if (context.length === 1) {
        resolve(context[0])
      } else {
        reject('Context not found');
      }
    })

  }

  getContextByResource(resource:string) {
    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Context>((resolve, reject) => {

      let context = this.contexts.filter((context) => {
        if(context.resource.indexOf(resource) !== -1) return true
      })

      if (context.length === 1) {
        resolve(context[0])
      } else {
        reject('Context not found');
      }
    })

  }

}
