// Core
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

// Interfaces
import { User, Message } from '../models/models';

// Services
import { LocalStorage } from './storage.service';
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';

@Injectable()
export class ContextualDataService {

    constructor(private contextService:ContextService) {}



    getMessages():Observable<Message[]> {
      return this.contextService.getContextMessages('work');
    }

    getUsers():Observable<User[]> {
      return this.contextService.getContextUsers('work');
    }

    
}