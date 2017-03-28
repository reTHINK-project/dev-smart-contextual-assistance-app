// Core
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

// Interfaces
import { ContextualCommTrigger, ContextualComm, User, Message } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';
import { ChatService } from './rethink/chat.service';

@Injectable()
export class ContextualDataService {

    constructor(
      private chatService:ChatService,
      private contextService:ContextService) {}

/*    getContext(context:string):Observable<ContextualComm> {
      return this.contextService.getContextByName(context);
    }*/

    getMessages(context:string):Observable<Message[]> {
      return this.contextService.getContextMessages(context);
    }

    getUsers(context:string):Observable<User[]> {
      return this.contextService.getContextUsers(context);
    }

}