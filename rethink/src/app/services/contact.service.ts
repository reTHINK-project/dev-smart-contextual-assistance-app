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

interface IUserOperation extends Function {
  (users: User[]): User[];
}

// Services
import { LocalStorage } from './storage.service';
import { RethinkService } from './rethink/rethink.service';
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

  constructor(private localStorage: LocalStorage, private rethinkService: RethinkService) {

    let users:User[];
    this._userList;
    if (this.localStorage.hasObject('contacts')) {
      users = this.localStorage.getObject('contacts');
      console.log('[Contacts Service -  constructor] - ', users);
      this._userList = new Map();
    } else {
      this._userList = new Map();
    }

    this._users = this._updates
      // watch the updates and accumulate operations on the users
      .scan((users: User[], operation: IUserOperation) => {
        return operation(users);
      }, users)
    // make sure we can share the most recent list of users across anyone
    // who's interested in subscribing and cache the last known list of
    // users
    .publishReplay(1)
    .refCount();

    this._create.map( function(user: User): IUserOperation {
        return (users: User[]) => {

          if (!this._userList.has(user.userURL)) {
            this._userList.set(user.userURL, new User(user));
            this.localStorage.setObject('contacts', this._userList.toJSON());
          }

          console.log('[contact service - users]: - ', users, user);
          return users.concat(user);
        };
      }).subscribe(this._updates);

    this._newUser.subscribe(this._create)
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

  getUser(userURL:string) {
    this._userList.get(userURL);
    console.log('Get User includes:', userURL);
  }

}
