import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

// utils
import { strMapToObj } from '../utils/utils';

// Services
import { LocalStorage } from './storage.service';
import { ContactService } from './contact.service';
import { ContextualCommTriggerService } from './contextualCommTrigger.service';

// Interfaces
import { ContextualComm, User, Message } from '../models/models';
import { HypertyResourceType } from '../models/rethink/HypertyResource';
import { Communication } from '../models/rethink/Communication';
import { RethinkService } from './rethink/rethink.service';

@Injectable()
export class ContextualCommService {

  private cxtList: Map<string, ContextualComm> = new Map<string, ContextualComm>();

  private currentActiveContext: ContextualComm;

  private _contextualCommList: Observable<ContextualComm[]>;

  private _contextualCommUpdates: Subject<any> = new Subject<any>();

  private _contextualComm: Subject<ContextualComm> = new Subject<ContextualComm>();

  private contextualCommObs: Subject<ContextualComm> = new Subject<ContextualComm>();
  private _currentContext: Subject<ContextualComm> = new Subject<ContextualComm>();

  public get getActiveContext(): ContextualComm {
    return this.currentActiveContext;
  }

  public set setActiveContext(value: string) {
    console.log('[Context Service] - setActiveContext: ', value, this.cxtList.get(value));
    this.currentActiveContext = this.cxtList.get(value);
    this._currentContext.next(this.currentActiveContext);
  }

  constructor(
    private localStorage: LocalStorage,
    private rethinkService: RethinkService,
    private contactService: ContactService,
    private contextualCommTriggerService: ContextualCommTriggerService
  ) {

    this._contextualCommList = this._contextualCommUpdates
    .map((context: ContextualComm) => {

      context.users = context.users.map((user: User) => {
        return this.contactService.getUser(user.userURL);
      }).filter((user: User) => {
        return user.userURL !== this.rethinkService.getCurrentUser.userURL;
      });

      context.messages = context.messages.map((message: Message) => {
        let currentMessage = new Message(message);
        currentMessage.user = this.contactService.getUser(currentMessage.user.userURL);
        return currentMessage;
      });

      console.log('[Context Service - contextualCommUpdates] - map', context.url, context);

      return context;
    }).scan((contextualCommList: ContextualComm[], context: ContextualComm) => {

      console.log('[Context Service - contextualCommUpdates] - scan', context, this.currentActiveContext);

      if (this.currentActiveContext && this.currentActiveContext.url === context.url) {

        context.messages = context.messages.map((message: Message) => {
          message.isRead = true;
          message.user.unread = 0;
          return message;
        });

        this.contextualCommObs.next(context);
      } else {

        let count = 0;

        context.messages.forEach((message: Message) => {
          let currentUser;
          if (message.user.userURL !== this.rethinkService.getCurrentUser.userURL) {
            currentUser = this.contactService.getUser(message.user.userURL);
            if (message.isRead === false) { count++; }
            currentUser.unread = count;
          }

        });

      }

      this.updateContexts(context.url, context);

      if (contextualCommList.indexOf(context) === -1) {
        return contextualCommList.concat(context);
      } else {
        return contextualCommList;
      }

    }, [])
    .startWith([])
    .publishReplay(1)
    .refCount();

    this._contextualComm.subscribe(this._contextualCommUpdates);

    // TODO: check why we need this, HOT something
    this._contextualCommList.subscribe((list: any) => {
      console.log('LIST:', list);
    });

    if (this.localStorage.hasObject('contexts')) {
      let mapObj = this.localStorage.getObject('contexts');
      for (let k of Object.keys(mapObj)) {
        let currentContext = new ContextualComm(mapObj[k]);
        this.cxtList.set(k, currentContext);
        this._contextualComm.next(currentContext);
      }
    }

  }

  _filterByName(idName: string): ContextualComm {
    let found: ContextualComm;
    this.cxtList.forEach((context: ContextualComm) => {
      console.log('[Contextual Comm Service] - ', context, idName);
      if (!found) { found = context.id === idName ? context : null; }
    });
    return found;
  }

  create(name: string, dataObject: any, parentNameId?: string, contextInfo?: string) {

    return new Promise<ContextualComm>((resolve, reject) => {

      let parentContextualComm: ContextualComm = this._filterByName(parentNameId);
      let newContextURL: string =  dataObject.url;
      let context: ContextualComm;

      console.log('[Contextual Comm Service] -  create: ', name, parentContextualComm, parentNameId, newContextURL);

      if (parentContextualComm) {

        let hasChild = parentContextualComm.contexts.find((context: ContextualComm) => {
          return context && context.url === newContextURL;
        });

        if (!hasChild) {

          // Create new ContextualComm
          let current: ContextualComm = this.createContextualComm(name, dataObject, parentContextualComm, contextInfo);

          // Add the current ContextualComm to his parent;
          parentContextualComm.contexts.push(current);

          context = current;

          this.updateContexts(parentContextualComm.url, parentContextualComm);
        }

      } else {

        if (!this.cxtList.has(newContextURL)) {

          // Create new ContextualComm
          let current: ContextualComm = this.createContextualComm(name, dataObject, undefined, contextInfo);
          context = current;

          this.updateContexts(context.url, context);
        }

      }

      this._contextualComm.next(context);
      resolve(context);

    });
  }

  private createContextualComm(name: string, dataObject: any, parent?: ContextualComm, contextInfo?: any): ContextualComm {

    let data: any = JSON.parse(JSON.stringify(dataObject.data));
    let metadata: any = JSON.parse(JSON.stringify(dataObject.metadata));

    let isReporter: boolean = contextInfo && contextInfo.reporter ? contextInfo.reporter : false;
    let icon: string = contextInfo && contextInfo.icon ? contextInfo.icon : '';

    console.log('[Contextual Comm Service] -  createContextualComm: ', name, data, metadata, parent, dataObject);

    let contextualComm = new ContextualComm({
      icon: icon,
      name: name,
      url: metadata.url,
      id: metadata.name,
      parent: parent ? parent.url : '',
      description: metadata.description || '',
      reporter: isReporter
    });


    let participants = data.participants || {};
    Object.keys(participants).forEach((item: any) => {
      console.log('MAP:', item, participants[item]);
      let currentUser: User = this.contactService.getUser(item);
      if (!currentUser) {
        currentUser = new User(participants[item].identity.userProfile);
        this.contactService.addUser(currentUser);
        console.log('[Context Service - update users] - create new user: ', currentUser);
      }

      contextualComm.addUser(currentUser);
    });

    let communication: Communication = <Communication>(metadata);
    communication.resources = [HypertyResourceType.Chat];
    contextualComm.communication = communication;

    console.log('[Context Service - createContextualComm] - New ContextualComm:', contextualComm);

    return contextualComm;
  }

  updateContexts(url: string, context: ContextualComm) {
    this.cxtList.set(url, context);
    this.localStorage.setObject('contexts', strMapToObj(this.cxtList));
  }

  updateContextMessages(message: Message, url: string) {
    console.log('[Context Service - Update Context Message:', message, url);
    console.log('[Context Service - Active Context:', this.cxtList.get(url));

    let context: ContextualComm = this.cxtList.get(url);
    context.addMessage(message);

    this._contextualComm.next(context);

    console.log('[Context Service - update messages]', context.name, context.url, context);
  }

  updateContextUsers(user: User, url: string) {
    console.log('[Context Service - Update Context User:', user, url);
    console.log('[Context Service - Active Context:', this.cxtList, this.cxtList.get(url));


    let context: ContextualComm = this.cxtList.get(url);
    context.addUser(user);

    // Update the contact list
    this.contactService.addUser(user);

    this._contextualComm.next(context);

    console.log('[Context Service - Update contacts]', context.name, context.url, context);

  }

  getContextByName(name: string): Promise<ContextualComm> {

    return new Promise<ContextualComm>((resolve, reject) => {

      let currentContext: ContextualComm;

      this.cxtList.forEach((context: ContextualComm) => {

        if (name.includes('@')) {
          let users = name.split('-');
          let user1 = users[0];
          let user2 = users[1];

          let variation1 = user1 + '-' + user2;
          let variation2 = user2 + '-' + user1;

          if (context.name === variation1) {
            name = variation1;
          } else if (context.name === variation2) {
            name = variation2;
          }
        }

        console.log('[Context Service] - getting Context By Name: ', context, context.name, name);

        if (context.name === name) {
          // TODO: Solve the problem of active context
          currentContext = context as ContextualComm;

          console.log('[context service] - found', name, currentContext);
          this._contextualComm.next(context);
          return resolve(currentContext);
        }

      });

      reject('No context found');

    });

  }

  getContextByResource(resource: string) {

    return new Promise<ContextualComm>((resolve, reject) => {

      let currentContext: ContextualComm = this.cxtList.get(resource);

      if (currentContext) {
        resolve(currentContext);
      } else {
        reject('No context found');
      }

    });

  }

  getContextUsers(context: String): Observable<User[]> {

    console.log('this.contactService.getUsers(): ');
    this.contactService.getUsers().subscribe({
      next: (list) => console.log('List of contacts:', list)
    });

    return this.contactService.getUsers();
  }

  currentContext(): Observable<ContextualComm> {
    return this._currentContext;
  }

  contextualComm(): Observable<ContextualComm> {
    return this.contextualCommObs;
  }

  getContextualComms(): Observable<ContextualComm[]> {
    return this._contextualCommList;
  }

  getContextualCommList(): Observable<ContextualComm[]> {

    let all = [];
    for (let cxt of this.cxtList.values()) {
      all.push(cxt);
    }

    return Observable.of(all);
  }

}
