import { Injectable, EventEmitter } from '@angular/core';
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

// Interfaces
import { ContextualCommEvent, ContextualComm, User, Message } from '../models/models';
import { HypertyResourceType } from '../models/rethink/HypertyResource';
import { Communication } from '../models/rethink/Communication';

@Injectable()
export class ContextualCommService {

  private cxtList: Map<string, ContextualComm> = new Map<string, ContextualComm>();

  private currentActiveContext: ContextualComm;

  private _contextualCommList: Observable<ContextualComm[]>;
  private _contextualCommUpdates: Subject<any> = new Subject<any>();
  private _newContextualComm: Subject<ContextualComm> = new Subject<ContextualComm>();

  private _currentContext: Subject<ContextualComm> = new Subject<ContextualComm>();

  public contextualCommEvent  = new EventEmitter<ContextualCommEvent>();

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
    private contactService: ContactService
  ) {

    this._contextualCommList = this._contextualCommUpdates
    .scan((contextualCommList: ContextualComm[], operation: any) => {

      let context: ContextualComm;

      console.log('[Context Service - contextualCommUpdates] - scan', operation, this.currentActiveContext);

      if (operation.type === 'add') {
        context = operation.context;
      }

      if (operation.type === 'remove') {
        context = operation.context;

        const parentContextURL = context.parent;
        const parentContext = this._searchByURL(parentContextURL);

        // Remove reference from it parent
        if (parentContext) {
          parentContext.removeContext(context.url);
        } else {
          // remove all childs of the main content;

          console.log('Contexts:', context.contexts);
          const listOfChilds = context.contexts.map((child: any) => child.url);
          console.log('Contexts:', listOfChilds);
          context.removeContexts(listOfChilds);
        }

        // Remove reference it self;
        const index = contextualCommList.findIndex(current => current.url === context.url);
        const result = contextualCommList.splice(index, 1);

        // Update the references;
        this.cxtList.delete(context.url);
        this.updateStorage();

        return contextualCommList;
      }

      if (this.currentActiveContext && this.currentActiveContext.url === context.url) {

        context.messages = context.messages.map((message: Message) => {
          message.isRead = true;
          message.user.unread = 0;
          return message;
        });

        this._currentContext.next(context);
      } else {

        let count = 0;

        context.messages.forEach((message: Message) => {
          let currentUser;
          if (message.user.userURL !== this.contactService.sessionUser.userURL) {
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

    this._newContextualComm.map((context: ContextualComm) => {

      context.users = context.users.map((user: User) => {
        return this.contactService.getUser(user.userURL);
      }).filter((user: User) => {
        return user.userURL !== this.contactService.sessionUser.userURL;
      });

      context.messages = context.messages.map((message: Message) => {
        const currentMessage = new Message(message);
        currentMessage.user = this.contactService.getUser(currentMessage.user.userURL);
        return currentMessage;
      });

      console.log('[Context Service - contextualCommUpdates] - map', context.url, context);

      return {type: 'add', context: context}
    }).subscribe(this._contextualCommUpdates);


    // TODO: this should be removed, the hot something
    this._contextualCommList.subscribe(result => console.log('LIST: ', result));

    if (this.localStorage.hasObject('contexts')) {
      const mapObj = this.localStorage.getObject('contexts');
      for (const k of Object.keys(mapObj)) {
        const currentContext = new ContextualComm(mapObj[k]);
        this.cxtList.set(k, currentContext);
        this._newContextualComm.next(currentContext);
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

  _searchByURL(url: string): ContextualComm {
    let found: ContextualComm;
    this.cxtList.forEach((context: ContextualComm) => {
      console.log('[Contextual Comm Service] - search by URL', context, url);
      if (!found) { found = context.url === url ? context : null; }
    });
    return found;
  }

  create(name: string, dataObject: any, parentNameId?: string, contextInfo?: string) {

    return new Promise<ContextualComm>((resolve, reject) => {

      const parentContextualComm: ContextualComm = this._filterByName(parentNameId);
      const newContextURL: string =  dataObject.url;
      let context: ContextualComm;

      console.log('[Contextual Comm Service] -  create: ', name, parentContextualComm, parentNameId, newContextURL);

      if (parentContextualComm) {

        const hasChild = parentContextualComm.contexts.find((contextualComm: ContextualComm) => {
          return contextualComm && contextualComm.url === newContextURL;
        });

        if (!hasChild) {

          // Create new ContextualComm
          const current: ContextualComm = this.createContextualComm(name, dataObject, parentContextualComm, contextInfo);

          // Add the current ContextualComm to his parent;
          parentContextualComm.contexts.push(current);

          context = current;

          this.updateContexts(parentContextualComm.url, parentContextualComm);
        }

      } else {

        if (!this.cxtList.has(newContextURL)) {

          // Create new ContextualComm
          const current: ContextualComm = this.createContextualComm(name, dataObject, undefined, contextInfo);
          context = current;

          this.updateContexts(context.url, context);
        }

      }

      this._newContextualComm.next(context);
      resolve(context);

    });
  }

  removeContextualComm(context: ContextualComm) {

    this._contextualCommUpdates.next({ type: 'remove', context: context });

  }

  private createContextualComm(name: string, dataObject: any, parent?: ContextualComm, contextInfo?: any): ContextualComm {

    const data: any = JSON.parse(JSON.stringify(dataObject.data));
    const metadata: any = JSON.parse(JSON.stringify(dataObject.metadata));

    const isReporter: boolean = contextInfo && contextInfo.reporter ? contextInfo.reporter : false;
    const icon: string = contextInfo && contextInfo.icon ? contextInfo.icon : '';

    console.log('[Contextual Comm Service] -  createContextualComm: ', name, data, metadata, parent, dataObject);

    const contextualComm = new ContextualComm({
      icon: icon,
      name: name,
      url: metadata.url,
      id: metadata.name,
      parent: parent ? parent.url : '',
      description: metadata.description || '',
      reporter: isReporter
    });


    const participants = data.participants || {};
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

    const communication: Communication = <Communication>(metadata);
    communication.resources = [HypertyResourceType.Chat];
    contextualComm.communication = communication;

    console.log('[Context Service - createContextualComm] - New ContextualComm:', contextualComm);

    this.contextualCommEvent.emit({
      type: 'add',
      contextualComm: JSON.parse(JSON.stringify(contextualComm))
    });

    return contextualComm;
  }

  updateContexts(url: string, context: ContextualComm) {
    this.cxtList.set(url, context);
    this.updateStorage();
  }

  private updateStorage() {
    this.localStorage.setObject('contexts', strMapToObj(this.cxtList));
  }

  updateContextMessages(message: Message, url: string) {
    console.log('[Context Service - Update Context Message:', message, url);
    console.log('[Context Service - Active Context:', this.cxtList.get(url));

    const context: ContextualComm = this.cxtList.get(url);
    context.addMessage(message);

    this._newContextualComm.next(context);

    console.log('[Context Service - update messages]', context.name, context.url, context);
  }

  updateContextUsers(user: User, url: string) {
    console.log('[Context Service - Update Context User:', user, url);
    console.log('[Context Service - Active Context:', this.cxtList, this.cxtList.get(url));


    const context: ContextualComm = this.cxtList.get(url);
    context.addUser(user);

    // Update the contact list
    this.contactService.addUser(user);

    this._newContextualComm.next(context);

    console.log('[Context Service - Update contacts]', context.name, context.url, context);

  }

  getContextByName(name: string): Promise<ContextualComm> {

    return new Promise<ContextualComm>((resolve, reject) => {

      let currentContext: ContextualComm;

      this.cxtList.forEach((context: ContextualComm) => {

        if (name.includes('@')) {
          const users = name.split('-');
          const user1 = users[0];
          const user2 = users[1];

          const variation1 = user1 + '-' + user2;
          const variation2 = user2 + '-' + user1;

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
          this._newContextualComm.next(context);
          return resolve(currentContext);
        }

      });

      reject('No context found');

    });

  }

  getContextByResource(resource: string) {

    return new Promise<ContextualComm>((resolve, reject) => {

      const currentContext: ContextualComm = this.cxtList.get(resource);

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

  getContextualComms(): Observable<ContextualComm[]> {
    return this._contextualCommList;
  }

  getContextualCommList(): Observable<ContextualComm[]> {

    const all = [];

    for (const cxt of this.cxtList.values()) {
      all.push(cxt);
    }

    return Observable.of(all);
  }

}
