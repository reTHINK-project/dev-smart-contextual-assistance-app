// Core
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';

// utils
import { objToStrMap, strMapToObj } from '../utils/utils';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { ContextService } from './rethink/context.service';

@Injectable()
export class ContactService {

  private _sessionUser:User;

  private _userList:Map<string, User> = new Map<string, User>();

  private _users:Observable<User[]>;
  
    // action streams
  private _create: Subject<User> = new Subject<User>();

  // `updates` receives _operations_ to be applied to our `users`
  // it's a way we can perform changes on *all* users (that are currently
  // stored in `users`)
  private _updates: Subject<any> = new Subject<any>();

  private _newUser:Subject<User> = new Subject<User>();

  constructor(private localStorage: LocalStorage) {

    let anonimous:User = new User({});

    if (this.localStorage.hasObject('contacts')) {
      let mapObj = this.localStorage.getObject('contacts');
      for (let k of Object.keys(mapObj)) {
        this._userList.set(k, new User(mapObj[k]));
      }
    }

    this._users = this._updates
      // watch the updates and accumulate operations on the users
      .scan((users: User[], user:User) => {
        return users.concat(user);
      }, [])
    // make sure we can share the most recent list of users across anyone
    // who's interested in subscribing and cache the last known list of
    // users
    .publishReplay(1)
    .refCount();

    this._create.map((user:User) => {

      console.log('[Contact Service] - create user:', user)

      if (!this._userList.has(user.userURL)) {
        this._userList.set(user.userURL, user);
        this.localStorage.setObject('contacts', strMapToObj(this._userList));
      } else {
        user = this._userList.get(user.userURL);
      }

      return user;
    }).subscribe(this._updates);

    this._newUser.subscribe(this._create)
  }

  set sessionUser(user:User) {
    this._sessionUser = user;
  }

  get sessionUser():User {
    return this._sessionUser;
  }

  addUser(user:User):void {
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
    console.log('[Contact Service - get user: ', this._userList, userURL);
    return this._userList.get(userURL);
  }

}
