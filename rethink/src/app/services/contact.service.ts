// Core
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';

// utils
import { strMapToObj } from '../utils/utils';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';

@Injectable()
export class ContactService {

  private _sessionUser: User;

  private _userList: Map<string, User> = new Map<string, User>();

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);

    // action streams
  private _create: Subject<User> = new Subject<User>();

  // `updates` receives _operations_ to be applied to our `users`
  // it's a way we can perform changes on *all* users (that are currently
  // stored in `users`)
  private _updates: Subject<any> = new Subject<any>();

  private _newUser: Subject<User> = new Subject<User>();

  constructor(private localStorage: LocalStorage) {

    if (this.localStorage.hasObject('contacts')) {
      let mapObj = this.localStorage.getObject('contacts');
      for (let k of Object.keys(mapObj)) {
        let currentUser: User = new User(mapObj[k]);
        this._userList.set(k, currentUser);
        this._users.next([currentUser]);
      }
    }

    this._users.scan((users: User[], user: User[]) => {
      return users.concat(user);
    })
    .publishReplay(1)
    .refCount();

    this._updates
      // watch the updates and accumulate operations on the users
      .scan((users: User[], user: User) => {
        console.log('Users:', users);
        return users.push(user);
      }, [])
    // make sure we can share the most recent list of users across anyone
    // who's interested in subscribing and cache the last known list of
    // users
    .publishReplay(1)
    .refCount();

    this._create.map((user: User) => {

      console.log('[Contact Service] - create user:', user);

      if (!this._userList.has(user.userURL)) {
        this._userList.set(user.userURL, user);
        this.localStorage.setObject('contacts', strMapToObj(this._userList));
      } else {
        user = this._userList.get(user.userURL);
      }

      return user;
    }).subscribe(this._updates);

    this._newUser.subscribe(this._create);
  }

  set sessionUser(user: User) {
    this._sessionUser = user;
  }

  get sessionUser(): User {
    return this._sessionUser;
  }

  addUser(user: User): void {
    console.log('[Contact Service - AddUser] - ', user);
    this._newUser.next(user);
  }

  updateUser(user: User, property: string, value: any) {

  }

  removeUser() {

  }

  getUsers(): Observable<User[]> {
    return this._users;
  }

  getUser(userURL: string): User {
    console.log('[Contact Service - get user: ', this._userList, userURL);
    let currentUser = this._userList.get(userURL);

    console.log('[Contact Service - instance of User: ', currentUser instanceof User);
    if (currentUser instanceof User) {
      return currentUser;
    } else {
      return new User(currentUser);
    }
  }

  getByUserName(username: string): User {
    console.log('[Contact Service - get user: ', this._userList, username);

    let user: User;
    this._userList.forEach((value: User) => {
      if (value.username === username) { user = value; }
    });

    return user;
  }

}
