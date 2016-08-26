import { Injectable, Input, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Services
import { RethinkService } from './rethink.service';
import { LocalStorage } from './storage.service';
import { ContextService } from './context.service';
import { ContactService } from './contact.service';

// Interfaces
import { Message, User } from '../models/models';

@Injectable()
export class MessageService {

  messageList:Observable<Message[]>;
  newMessage: Subject<Message> = new Subject<Message>();

  private messages: Observable<Message[]>;
  private create: Subject<Message> = new Subject<Message>();
  private updates: Subject<Message> = new Subject<Message>();

  constructor(
    private appService:RethinkService,
    private localStorage:LocalStorage,
    private contactService:ContactService
  ) {

    this.messageList = this.updates.scan((messages:Message[], message:Message) => {
      // console.log('Scan message', messages, message);
      messages.push(new Message(message));
      return messages;
    }, [])
    .publishReplay(1)
    .refCount();

    this.create.map((message:Message, index:number) => {
      // console.log('create message:', message);
      return message;
    }).subscribe(this.updates);

    this.newMessage.subscribe(this.create);
  }

  setMessages(messages:Message[] = []):Observable<Message[]> {

    let init:Subject<Message[]> = new BehaviorSubject<Message[]>(messages);

    init.combineLatest(this.updates, (messages:Message[], message:Message) => {
      // console.log('Combine: ', messages, message);
      messages.push(message);
      return messages;
    }).subscribe((b:any) => { /* console.log('B: 0', b); */ })

    return init.asObservable();
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