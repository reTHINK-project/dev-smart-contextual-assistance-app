import { Injectable, Input } from '@angular/core';

import { Subject  } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';

// Services
import { RethinkService } from './rethink/rethink.service';
import { LocalStorage } from './storage.service';
import { ContextService } from './rethink/context.service';
import { ContactService } from './contact.service';

// Interfaces
import { Message, User } from '../models/models';

@Injectable()
export class MessageService {

  messageList:Observable<Message[]>;
  newMessage: Subject<Message> = new Subject<Message>();

  private bSubject:Subject<Message[]>;
  private messages: Observable<Message[]>;
  private create: Subject<Message> = new Subject<Message>();
  private updates: Subject<Message> = new Subject<Message>();


  private init:Array<any> = Array<any>();

  constructor(
    private appService:RethinkService,
    private localStorage:LocalStorage,
    private contactService:ContactService
  ) {

    this.messages = this.updates.scan((messages:Message[], message:Message) => {
      console.log('Scan message', messages, message);
      messages.push(message);
      return messages;
    }, this.init)
    .publishReplay(1)
    .refCount();

    this.create.map((message:Message, index:number) => {
      // console.log('create message:', message);
      return new Message(message);
    }).subscribe(this.updates);

    this.newMessage.subscribe(this.create);

    this.bSubject = new BehaviorSubject<Message[]>([]);
    this.messageList = this.bSubject.asObservable()
    
    this.messageList.combineLatest(this.messages, (messages:Message[], values:Message[]) => {
      console.log('COmbine Latest: ', messages, values);
      return messages.concat(values);
    });
    
  }

  setMessages(messages:Message[] = []) {

    this.init = [];
    this.bSubject.next(messages);

  }

  reciveMessag(message: any) {

    // let user:User = this.contactService.getContact(message.identity.userProfile.userURL);
    // console.log('Recive Message from user:', user);

    let user:User;
    if (!user) {
      user = new User(message.identity.userProfile);
    }

    this.message(user, message);

  }

  addMessage(message:any) {

    let user:User = this.appService.getCurrentUser;
    this.message(user, message);

  }

  message(user:User, message:any) {

    let newMessage:Message = new Message({
      type: 'message',
      message: message.value.message,
      user: user
    });

    this.newMessage.next(newMessage);
  }

}