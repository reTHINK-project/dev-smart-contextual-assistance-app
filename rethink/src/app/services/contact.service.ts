// Core
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { ContextService } from './rethink/context.service';

@Injectable()
export class ContactService {

  private _userList:Map<string, User>;

  private _users:Observable<User[]>;
  
    // action streams
  private _create: Subject<User> = new Subject<User>();

  // `updates` receives _operations_ to be applied to our `users`
  // it's a way we can perform changes on *all* users (that are currently
  // stored in `users`)
  private _updates: Subject<any> = new Subject<any>();

  private _newUser:Subject<User> = new Subject<User>();

  constructor(private localStorage: LocalStorage) {

    if (this.localStorage.hasObject('contacts')) {
      let mapObj = this.localStorage.getObject('contacts');
      console.log('[Contacts Service -  constructor] - ', mapObj);
      this._userList = this.objToStrMap(mapObj);
    } else {
      this._userList = new Map();
    }

    this._users = this._updates
      // watch the updates and accumulate operations on the users
      .scan((users: User[], user:User) => {
        console.log('[Contact Service - scan] - ', users);
        return users.concat(user);
      }, [])
    // make sure we can share the most recent list of users across anyone
    // who's interested in subscribing and cache the last known list of
    // users
    .publishReplay(1)
    .refCount();

    this._create.map((user:User) => {
      if (!this._userList.has(user.userURL)) {
        this._userList.set(user.userURL, new User(user));
        this.localStorage.setObject('contacts', this.strMapToObj(this._userList));
      }
      return user;
    }).subscribe(this._updates);

    this._newUser.subscribe(this._create)
  }

  strMapToObj(strMap:any) {
    let obj = Object.create(null);
    console.log(strMap);
    for (let [k,v] of strMap.entries()) {
      console.log('KEY:', k, v);
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    console.log(obj);
    return obj;
  }

  objToStrMap(obj:any) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
  }

  addUser(user:User):void {
    console.log('AQUI:', user);
    this._newUser.next(user);
  }

  updateUser(user:User, property:string, value: any) {
    
  }

  removeUser() {
    
  }

  getUsers():Observable<User[]> {
    return this._users;
  }

  getUser(userURL:string):User {
    console.log('Get User includes:', userURL);
    console.log('user list:', this._userList);
    return this._userList.get(userURL);
  }

}
