import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';

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

  private contextPath: string;
  private taskPath: string;

  public getActiveContext(v: string): ContextualComm {
    return this.localStorage.hasObject(v) ? this.localStorage.getObject(v) as ContextualComm : null;
  }

  public set activeContext(value: string) {
    console.log('[Context Service] - setActiveContext: ', value, this.cxtList.get(value));
    this.currentActiveContext = this.cxtList.get(value);
    this._contextualComm.next(this.currentActiveContext);
  }

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

/*  private work: ContextualComm = {
    name: 'Work',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'briefcase'
  };

  private fitness: ContextualComm = {
    contextName: 'Fitness',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'heartbeat'
  };

  private school: ContextualComm = {
    contextName: 'School',
    contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    contextScheme: '',
    values: [],
    trigger: [],
    icon: 'heart'
  };*/

  constructor(
    private localStorage: LocalStorage,
    private rethinkService: RethinkService,
    private contactService: ContactService,
    private contextualCommTriggerService: ContextualCommTriggerService
  ) {

    this._contextualCommList = this._contextualCommUpdates.map((context: ContextualComm) => {

      context.users = context.users.filter((user: User) => {
        return user instanceof User;
      }).map((user: User) => {
        return this.contactService.getUser(user.userURL);
      }).filter((user: User) => {
        return user.userURL !== this.rethinkService.getCurrentUser.userURL;
      });

      context.messages = context.messages.map((message: Message) => {
        let currentMessage = new Message(message);
        console.log('[Context Service - contextualCommUpdates] - typeof: ', currentMessage.user instanceof User);
        currentMessage.user = this.contactService.getUser(currentMessage.user.userURL);
        return message;
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

  create(name: string, dataObject: any, parentDataObjectURL?: string) {

    return new Promise<ContextualComm>((resolve, reject) => {

      let parentContextualComm: ContextualComm = this.cxtList.get(parentDataObjectURL);
      let newContextURL: string =  dataObject.url;
      let context: ContextualComm;

      console.log('AQUI:', parentContextualComm);

      if (parentContextualComm) {

        let hasChild = parentContextualComm.contexts.find((context: ContextualComm) => {
          return context && context.url === newContextURL;
        });

        if (!hasChild) {

          // Create new ContextualComm
          context = this.createContextualComm(dataObject, parentContextualComm);

          // Add the current ContextualComm to his parent;
          parentContextualComm.contexts.push(context);

          this.updateContexts(parentContextualComm.url, parentContextualComm);
          this._contextualComm.next(parentContextualComm);
          resolve(parentContextualComm);
        }

      } else {

        if (!this.cxtList.has(newContextURL)) {

          // Create new ContextualComm
          context = this.createContextualComm(dataObject);

          this.updateContexts(context.url, context);
          this._contextualComm.next(context);
          resolve(context);
        }

      }

    });
  }

  createContextualComm(dataObject: any, parent?: ContextualComm): ContextualComm {

    let data: any = JSON.parse(JSON.stringify(dataObject.data));
    let metadata: any = JSON.parse(JSON.stringify(dataObject.metadata));

    let contextualComm = new ContextualComm({
      url: metadata.url,
      name: metadata.name,
      description: metadata.description || '',
      parent: parent ? parent.url : ''
    });

    let participants = data.participants || {};
    Object.keys(participants).forEach((item: any) => {
      console.log('MAP:', item, participants[item]);
      let currentUser: User = this.contactService.getUser(item);
      if (!currentUser) {
        currentUser = new User(participants[item].identity);
        this.contactService.addUser(currentUser);
        console.log('[Context Service - update users] - create new user: ', currentUser);
      }

      contextualComm.addUser(currentUser);
    });

    let communication: Communication = <Communication>(data);
    communication.resources = [HypertyResourceType.chat];
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
    console.log('[Context Service - Active Context:', this.cxtList.get(url));

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

        // TODO: this should be removed, because at this moment
        // we do not have any way to destinguish from me-<other-user> or <other-user>-me
        // and the dataObjectURL should be the same
        if (name.indexOf('-') !== -1) {
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


  contextualComm(): Observable<ContextualComm> {
    return this.contextualCommObs;
  }

  getContextualComms(): Observable<ContextualComm[]> {
    return this._contextualCommList;
  }

}
