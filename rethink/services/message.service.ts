import { Injectable, Input, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Services
import { AppService } from './app.service';
import { LocalStorage } from './storage.service';
import { ContextService } from './context.service';
import { ContactService } from './contact.service';

// Interfaces
import { Message, User } from '../models/models';

@Injectable()
export class MessageService {

  messageList: Observable<Message[]>;
  newMessage: Subject<Message> = new Subject<Message>();

  private create: Subject<Message> = new Subject<Message>();
  private updates: Subject<Message> = new Subject<Message>();
  private messages: Observable<Message[]>

  constructor(
    private appService:AppService,
    private localStorage:LocalStorage,
    private contactService:ContactService
  ) {

    this.messageList = this.updates.scan((messages:Message[], message:Message) => {
      console.log('Scan message', messages, message);
      messages.push(message);
      return messages;
    }, [])
    .publishReplay(1)
    .refCount();

    this.create.map((message:Message, index:number) => {
      console.log('create message:', message);
      return message;
    }).subscribe(this.updates);

    this.newMessage.subscribe(this.create);

  }

  setMessages(messages:Message[] = []):Observable<Message[]> {

    var initMessages = this.updates.scan((messages:Message[], message:Message) => {
      console.log('Scan message', messages, message);
      messages.push(message);
      return messages;
    }, messages)
    .publishReplay(1)
    .refCount();

    /* messages.map((message:Message) => {
      this.newMessage.next(message);
    })*/

    return initMessages;

  }

  addMessage(message:any) {

    console.log('Add new message', message);

    let user:User = new User(message.identity.userProfile);
    let newMessage:Message = new Message({
      type: 'message',
      message: message.value.message,
      user: user
    });

    console.log('Message: ', newMessage);
    this.newMessage.next(newMessage);

  }

}

export var contextServiceInjectables: Array<any> = [
  bind(MessageService).toClass(MessageService)
];