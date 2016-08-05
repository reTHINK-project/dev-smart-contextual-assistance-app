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

  private sMessage: Subject<Message> = new BehaviorSubject(new Message({}));

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

    this.messages = this.sMessage.combineLatest(this.messageList, (message:Message, messages:Message[]) => {
      console.log('Combine: ', message, messages);
      return messages;
    });

    // Hot subscribe
    this.messages.subscribe((messages:Message[]) => {console.log('Messages:', messages)});
  }

  setMessages(messages:Message[] = []):Observable<Message[]> {

    let a = this.sMessage.scan((messages:Message[], message:Message) => {
      console.log('SET MESSAGES: ', messages, message);
      return messages;
    }, messages).combineLatest(this.newMessage, (messages:Message[], message:Message) => {
      console.log('Combine new messages: ', messages, message);
      messages.push(message);
      return messages;
    }).publishReplay(1).refCount();

    a.subscribe((messages) => {});

    return a;

  }

  reciveMessag(message: any) {

    this.contactService.getContact(message.identity.userProfile.userURL).subscribe((user) => {
      console.log('Recive Message from User: ', user);

      this.message(user, message);
    });
    
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

export var contextServiceInjectables: Array<any> = [
  bind(MessageService).toClass(MessageService)
];