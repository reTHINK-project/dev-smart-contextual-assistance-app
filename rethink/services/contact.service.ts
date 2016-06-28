// Core
import { Injectable, EventEmitter} from '@angular/core';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';

@Injectable()
export class ContactService {

  users: User[]

  constructor(private localStorage:LocalStorage){}

  addContact() {

  }

  removeContact() {

  }

  getContacts() {

    return new Promise((resolve, reject) => {
      // resolve(this.contacts);
    })

  }

  getContact(id:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<User>((resolve, reject) => {

      let users = this.users.filter((user) => {
        if(user.userURL.indexOf(id) !== -1) return true
      })

      if (users.length === 1) {
        resolve(users[0])
      } else {
        reject('Contact not found');
      }


    })
  }

}

// {id: 'id1', userURL:'', name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'', name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
// {id: 'id3', userURL:'', name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg', email:'openidtest10@gmail.com'},
// {id: 'id4', userURL:'', name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg', email:'openidtest20@gmail.com'}
// {id: 'id1', userURL:'user://gmail.com/openidtest20', name: 'open id test 20', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'user://gmail.com/openidtest10', name: 'open id test 10', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
