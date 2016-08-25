// Core
import { Injectable, EventEmitter, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { RethinkService } from './rethink.service';
import { ContextService } from './context.service';

@Injectable()
export class ContactService {

  private updates: Subject<any> = new Subject<any>();
  private create: Subject<User> = new Subject<User>();

  private userListMap: Map<string, User> = new Map<string, User>();

  newUser: Subject<User> = new Subject<User>();
  userList: Observable<User[]>;

  constructor(private localStorage: LocalStorage, private rethinkService: RethinkService){

    let init:User[] = this.localStorage.hasObject('contacts') ? this.localStorage.getObject('contacts') : [];

    this.userList = this.updates.scan((users:User[], user:User) => {
      console.log('Scan contacts: ', users, user);     

      users.forEach((user:User) => {
        this.userListMap.set(user.userURL, user);
      });

      let me:User = this.rethinkService.getCurrentUser;

      let meFind = users.findIndex((value:User) => {
        return value.userURL === me.userURL;
      })

      let userFind = users.find((value:User) => {
        return value.userURL === user.userURL;
      });

      if (!userFind) {
        users.push(user);
        this.localStorage.setObject('contacts', users);
      }

      let a = users.filter((user:User) => {
        return user.userURL !== me.userURL;
      });

      return a;
    }, init)
    .publishReplay(1)
    .refCount();

    this.create.map((user:User, index:number) => {
      console.log('Create new contact', user);
      return new User(user);
    }).subscribe(this.updates);

    this.newUser.subscribe(this.create);

  }

  setContacts(users:User[] = []):Observable<User[]> {

    /*users.forEach((user:User) => {
      this.userList.forEach((value:User[]) => {
        console.log('Set contacts: ', value, user);
        return value.filter((current:User) => {return current.userURL === user.userURL})
      });
    })*/

    return this.userList;
  }

  addContact(user:User) {
    this.newUser.next(user);
  }

  updateContact(user:User, property:string, value: any) {
    this.updates
  }

  removeContact() {

  }

  getAllContacts() {

  }

  getContacts() {

    return new Promise((resolve, reject) => {
      // resolve(this.contacts);
    })

  }

  getContact(userURL:string):User {
    console.log('Get User includes:', userURL, this.userListMap.get(userURL));
    let user = this.userListMap.get(userURL);
    console.log('Contact found: ', user);
    return user;
  }

}

// {id: 'id1', userURL:'', name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'', name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
// {id: 'id3', userURL:'', name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg', email:'openidtest10@gmail.com'},
// {id: 'id4', userURL:'', name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg', email:'openidtest20@gmail.com'}
// {id: 'id1', userURL:'user://gmail.com/openidtest20', name: 'open id test 20', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'user://gmail.com/openidtest10', name: 'open id test 10', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
