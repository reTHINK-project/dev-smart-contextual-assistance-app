import { Injectable, Input } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Services
import { LocalStorage } from './storage.service';

// Interfaces
import { ContextTrigger, Context, Communication, User, Message } from '../models/models';

let initialUsers: User[] = [];
let initialMessages: Message[] = [];

@Injectable()
export class ContextService {

  // activities: [Activity] = [
  //   { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
  //   { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
  //   { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  // ]

  private activeContext: any;
  private currentUser: User;
  private contextPath: string;
  private taskPath: string

  public set setContextPath(v: string) {
    this.contextPath = v;
  }

  public get getContextPath(): string {
    return this.contextPath;
  }

  public set setTaskPath(v: string) {
    this.taskPath = v;
  }

  public get getTaskPath(): string {
    return this.taskPath;
  }

  public set setCurrentUser(v : User) {
    this.currentUser = v;
  }

  public get getCurrentUser() : User {
    return this.currentUser;
  }

  context: Subject<Context> = new Subject<Context>();
  contextList: Observable<Context[]>;

  userList: Observable<User[]>;
  private sUser: BehaviorSubject<User[]>;
  private newUser: Subject<User> = new Subject<User>();
  private userUpdate: Subject<User> = new Subject<User>();

  messageList: Observable<Message[]>;
  private newMessage: Subject<Message> = new Subject<Message>();
  private messages: Subject<Message> = new Subject<Message>();

  constructor(private localStorage:LocalStorage) {

    if (localStorage.hasObject('Contacts')){
      initialUsers = localStorage.getObject('Contacts');
    }

    this.contextList = this.context.scan((context: Context[]) => {
      return context;
    });

    /* this.sUser = new BehaviorSubject<User[]>(initialUsers);
    this.userList = this.sUser.combineLatest(this.newUser, (users:User[], user:User) => {
      console.log('Combine:', users, user);
      users.push(user);
      return users;
    }) */

    this.userList = this.newUser.scan((users: User[], value: User) => {
      console.log('Scan Users:', users, value);
      users.push(value);
      localStorage.setObject('Contacts', users);
      return users;
    }, initialUsers)
    .publishBehavior(initialUsers)
    .refCount();

    this.newUser.subscribe(this.userUpdate);

    // Messages
    this.messageList = this.newMessage.scan((messages: Message[], value: Message) => {
      messages.push(value);
      return messages;
    }, initialMessages)
    .publishBehavior(initialMessages)
    .refCount();

    this.newMessage.subscribe(this.messages);

  }

  getUser(userURL:string):Observable<User> {
    console.log('Get User includes:', userURL);

    return this.userList.flatMap((users:User[]) => {
      console.log("USers:" , users);
      return users;
    }).filter( (user:User) => {
      console.log(user.userURL === userURL, user.userURL.includes(userURL))
      return user.userURL === userURL || user.userURL.includes(userURL);
    });
  }

  create(name: string, dataObject: any, parent?:string) {

    return new Promise<Context>((resolve, reject) => {

      this.createContextTrigger(this.contextPath, dataObject, parent).then((contextTrigger:ContextTrigger) => {

        let context:Context = new Context({
          url: dataObject.url,
          name: dataObject.data.name,
          description: 'Description of the context'
        });

        // this.activeContext = context;

        let communication:Communication = new Communication(dataObject.data);
        communication.resources = ['chat'];

        // set the communication to the Context
        context.communication = communication;

        Object.keys(dataObject.data.participants).forEach((key: any, value: any) => {
          let user:User = new User(dataObject.data.participants[key]);

          // Add users to the context
          // context.addUser(user);

          // this.addUser(user);
        });

        // set the parent to the context
        if (parent) { context.parent = parent; }

        console.log(contextTrigger);

        // Set this context to the context triggers;
        contextTrigger.trigger.push(context);

        // Update the localStorage contextTrigger
        this.localStorage.setObject(contextTrigger.name, contextTrigger);

        // add the context to the observable list
        this.context.next(context);

        resolve(context);
      })

    })

  }

  addUser(user:User) {
    let current:User = new User(user);
    console.log('User Current: ', current);
    this.newUser.next(current);
  }

  addMessage(message:any) {

    console.log('Add new message', message);

    this.getUser(message.identity.userProfile.userURL).forEach((user:User) => {
      console.log('User:', user);
    })
   
    let user = new User(message.identity.userProfile);
    let newMessage:Message = new Message({
      type: 'message',
      message: message.value.message,
      user: user
    });

    console.log('Message: ', newMessage);
    this.newMessage.next(newMessage);
  }

  createContextTrigger(name: string, dataObject: any, parent?:string) {

    return new Promise<ContextTrigger>((resolve, reject) => {
      console.log('[Context Service - Get Localstorage] ', parent, name);
      console.log('[Context Service - Get Localstorage] ', parent, this.localStorage.hasObject(parent), this.localStorage.hasObject(name), this.localStorage);

      if (!this.localStorage.hasObject(name) || (parent && !this.localStorage.hasObject(parent))) {

        let contextName = name;
        let contextScheme = 'context';
        let contextResource = ['video', 'audio', 'chat'];

        let contextTrigger = new ContextTrigger(null, contextName, contextScheme, contextResource);

        /*let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }*/

        this.localStorage.setObject(name, contextTrigger)
        resolve(contextTrigger);
      } else {
        let contextualCommTrigger:ContextTrigger = this.localStorage.getObject(name);
        resolve(contextualCommTrigger);
      }
    })

  }

  getContextByName(name:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Context>((resolve, reject) => {
    //
    //   console.log(this.sourceContexts);
    //
    //   let context = this.contextsList.filter((context) => {
    //     console.log('Context Filter:', context);
    //
    //     if(context.name.indexOf(name) !== -1) return true
    //   })
    //
    //   if (context.length === 1) {
    //     resolve(context[0])
    //   } else {
    //     reject('Context not found');
    //   }
    })

  }

  getContextByResource(resource:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<Context>((resolve, reject) => {

/*      let context = this.sourceContextsList.filter((context) => {
        if(context.url.indexOf(resource) !== -1) return true
      })

      if (context.length === 1) {
        resolve(context[0])
      } else {
        reject('Context not found');
      }*/
    })

  }

}
