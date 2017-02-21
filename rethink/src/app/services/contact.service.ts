// Core
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

// Interfaces
import { User } from '../models/models';

interface IUserOperation extends Function {
  (users: User[]): User[];
}

let initialUsers: User[] = [
  {guid: 'id1', locale:'', domain:'', userURL:'', identifiers:'', cn: 'Rita Coelho', idp:'google.com', status: 'online', avatar: 'img/avatar.jpg', username:'openidtest20@gmail.com', unread: 1},
  {guid: 'id2', locale:'', domain:'', userURL:'', identifiers:'', cn: 'Diogo Reis', idp:'google.com', status: 'away', avatar: 'img/avatar-2.jpg', username:'openidtest10@gmail.com', unread: 0},
  {guid: 'id3', locale:'', domain:'', userURL:'', identifiers:'', cn: 'Rodrigo Castro', idp:'google.com', status: 'offline', avatar: 'img/avatar-3.jpg', username:'openidtest10@gmail.com', unread: 1},
  {guid: 'id4', locale:'', domain:'', userURL:'', identifiers:'', cn: 'Martim Almeida', idp:'google.com', status: 'online', avatar: 'img/avatar-4.jpg', username:'openidtest20@gmail.com', unread: 5},
  {guid: 'id5', locale:'', domain:'', userURL:'user://gmail.com/openidtest20', identifiers:'', idp:'google.com', cn: 'open id test 20', status: 'online', avatar: 'img/avatar.jpg', username:'openidtest20@gmail.com', unread: 1},
  {guid: 'id6', locale:'', domain:'', userURL:'user://gmail.com/openidtest10', identifiers:'', idp:'google.com', cn: 'open id test 10', status: 'away', avatar: 'img/avatar-2.jpg', username:'openidtest10@gmail.com', unread: 2},
];

// Services
import { LocalStorage } from './storage.service';
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';

@Injectable()
export class ContactService {

  private _users:Observable<User[]>;
  
    // action streams
  private _create: Subject<User> = new Subject<User>();

  // `updates` receives _operations_ to be applied to our `users`
  // it's a way we can perform changes on *all* users (that are currently
  // stored in `users`)
  private _updates: Subject<any> = new Subject<any>();

  private _newUser:Subject<User> = new Subject<User>();

  constructor(private localStorage: LocalStorage, private rethinkService: RethinkService) {

    this._users = this._updates
      // watch the updates and accumulate operations on the users
      .scan((users: User[], operation: IUserOperation) => {
        return operation(users);
      }, initialUsers)
    // make sure we can share the most recent list of users across anyone
    // who's interested in subscribing and cache the last known list of
    // users
    .publishReplay(1)
    .refCount();

    this._updates.subscribe({
      next: (users) => console.log('List of users:', users)
    });

    this._create.map( function(user: User): IUserOperation {
        return (users: User[]) => {
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
    console.log('Get User includes:', userURL);
  }

}
