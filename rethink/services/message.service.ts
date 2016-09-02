import { Injectable, Input, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Services
import { RethinkService } from './rethink/rethink.service';
import { LocalStorage } from './storage.service';
import { ContextService } from './context.service';
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
      messages.push(new Message(message));
      return messages;
    }, this.init)
    .publishReplay(1)
    .refCount();

    this.create.map((message:Message, index:number) => {
      // console.log('create message:', message);
      return message;
    }).subscribe(this.updates);

    this.newMessage.subscribe(this.create);

    this.bSubject = new BehaviorSubject<Message[]>([]);
    // ADD the scan messages;
    this.messageList = this.bSubject.asObservable().merge(this.messages);
    
  }

  setMessages(messages:Message[] = []) {

    this.init = Array<any>();

    this.bSubject.next(messages);

  }

  reciveMessag(message: any) {

    this.contactService.getContact(message.identity.userProfile.userURL).subscribe((user:User) => {
      this.message(user, message);
    })

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