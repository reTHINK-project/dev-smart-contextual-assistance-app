// Core
import { Injectable, EventEmitter, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Interfaces
import { User } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { ContextService } from './context.service';

let initialUsers: User[] = [];

@Injectable()
export class ContactService {

  users: Observable<User[]>;

  newUser: Subject<User> = new Subject<User>();

  private updates: Subject<any> = new Subject<any>();
  private create: Subject<User> = new Subject<User>();

  userList: Observable<User[]>;

  constructor() {

    this.userList = this.updates.scan((users:User[], user:User) => {
      console.log('Scan contacts: ', users, user);
      users.push(user);
      return users;
    }, initialUsers)
    .publishReplay(1)
    .refCount();

    this.create.map((user:User, index:number) => {
      return user;
    }).subscribe(this.updates);

    this.newUser.subscribe(this.create);

  }

  setContacts(users:User[] = []):Observable<User[]> {
    let init:Subject<User[]> = new BehaviorSubject<User[]>(users);

    init.map((users:User[], index:number) => {
      console.log('Map users: ', users, index);
      return users.map((user:User) => {
        return new User(user);
      });
    }).combineLatest(this.updates, (users:User[], user:User) => {
      console.log('Combine: ', users, user);
      users.push(user);
      return users;
    }).subscribe((b:any) => { /* console.log('B: 0', b); */ })

    this.userList = init.asObservable(); 

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

  getContact(userURL:string):Observable<User> {
    console.log('Get User includes:', userURL);

    return this.userList.flatMap((users:User[]) => users).filter((user:User) => {
      console.log(user.userURL === userURL, user.userURL.includes(userURL))
      return user.userURL === userURL || user.userURL.includes(userURL);
    }).map((user:User) => user)

  }

}

// {id: 'id1', userURL:'', name: 'Rita Coelho', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'', name: 'Diogo Reis', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
// {id: 'id3', userURL:'', name: 'Rodrigo Castro', status: 'offline', avatar: 'img/avatar-3.jpg', email:'openidtest10@gmail.com'},
// {id: 'id4', userURL:'', name: 'Martim Almeida', status: 'online', avatar: 'img/avatar-4.jpg', email:'openidtest20@gmail.com'}
// {id: 'id1', userURL:'user://gmail.com/openidtest20', name: 'open id test 20', status: 'online', avatar: 'img/avatar.jpg', email:'openidtest20@gmail.com', unread: 1},
// {id: 'id2', userURL:'user://gmail.com/openidtest10', name: 'open id test 10', status: 'away', avatar: 'img/avatar-2.jpg', email:'openidtest10@gmail.com'},
