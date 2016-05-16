import { Injectable } from '@angular/core';

import {Contact} from '../comp/contact/contact';
import {Activity} from '../comp/activity/activity'
import {Context} from '../comp/context/context';

@Injectable()
export class AppService {

  contacts: [Contact] = [
    {id: 'id1', name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', unread: 1 },
    {id: 'id2', name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg' },
    {id: 'id3', name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg' },
    {id: 'id4', name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg' }
  ]

  activities: [Activity] = [
    { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
    { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
    { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
    { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
    { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  ]

  contexts: [Context] = [
    {name: "Work", icon: 'a', childs: []},
    {name: "Fitness", icon: 'a', childs: []},
    {name: "School", icon: 'a', childs: []}
  ]

  getContacts() {
     return Promise.resolve(this.contacts)
  }

  getActivities() {
    return Promise.resolve(this.activities)
  }

  getContexts() {
    return Promise.resolve(this.contexts)
  }

}
