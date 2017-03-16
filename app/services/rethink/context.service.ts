import { Injectable, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// utils
import { objToStrMap, strMapToObj } from '../../utils/utils';

// Services
import { LocalStorage } from '../storage.service'
import { ContactService } from '../contact.service'
import { MessageService } from '../message.service'

// Interfaces
import { Communication } from '../../models/rethink/Communication'
import { HypertyResourceType } from '../../models/rethink/HypertyResource'
import { ContextualCommTrigger, ContextualComm, User, Message } from '../../models/models'

@Injectable()
export class ContextService {

  private cxtTrigger:Map<string, ContextualCommTrigger> = new Map<string, ContextualCommTrigger>();
  private cxtList:Map<string, ContextualComm> = new Map<string, ContextualComm>();

  private activeContextTrigger: ContextualCommTrigger;
  private activeContext: ContextualComm;

  private _contextualComm:Subject<ContextualComm> = new BehaviorSubject({});
  private contextualCommObs:Observable<ContextualComm>;

  private contextPath: string;
  private taskPath: string

  public getActiveContext(v: string): ContextualComm {
    return this.localStorage.hasObject(v) ? this.localStorage.getObject(v) as ContextualComm : null;
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

  constructor(
    private localStorage:LocalStorage,
    private contactService: ContactService,
    private messageService: MessageService
  ) {

    if (this.localStorage.hasObject('context-triggers')) {
      let mapObj = this.localStorage.getObject('context-triggers');
      for (let k of Object.keys(mapObj)) {
        this.cxtTrigger.set(k, mapObj[k]);
      }
    }

    if (this.localStorage.hasObject('contexts')) {
      let mapObj = this.localStorage.getObject('contexts');
      for (let k of Object.keys(mapObj)) {
        this.cxtList.set(k, new ContextualComm(mapObj[k]));
      }
    }

    this.contextualCommObs = this._contextualComm.map((context:ContextualComm) => {

/*      let mapped = context.users.filter((user:User) => {
        console.log('FILTER Current:', user.userURL, this.contactService.sessionUser.userURL);
        return user.userURL !== this.contactService.sessionUser.userURL;
      })

      console.log('MAPPED:', mapped);*/

      context.users = context.users.map((user:User) => {
        return this.contactService.getUser(user.userURL);
      });

      context.messages = context.messages.map((message:Message) => {
        let currentMessage = new Message(message);
        currentMessage.user = this.contactService.getUser(currentMessage.user.userURL);
        return currentMessage;
      })
      
      console.log('[Context Service - contextualComm] - scan', context.url, context);
      this.updateContexts(context.url, context);

      return context;
    });

  }

  create(name: string, dataObject: any, parent?: any) {


    // TODO Add the dataObject on Rx.Observable (stream);
    // TODO add a Stream to look on changes for dataObject changes;
    return new Promise<ContextualComm>((resolve, reject) => {

      this.createContextTrigger(name).then((contextTrigger:ContextualCommTrigger) => {

        // TODO Create the verification to reuse a context, because at this moment we can't reuse a communication or connection dataObject;
        let context:ContextualComm;

        console.info('[Context Trigger] - existing: ', this.cxtList.has(dataObject.url), contextTrigger);

        if (!this.cxtList.has(dataObject.url)) {
          console.info('[Create a new context: ]', dataObject);

          context = new ContextualComm({
            url: dataObject.url,
            name: dataObject.data.name,
            description: 'Description of the context',
          });

          let communication:Communication = <Communication>(dataObject.data);
          communication.resources = [HypertyResourceType.chat]

          // set the communication to the Context
          context.communication = communication;

        } else {
          console.info('[Get the context to localStorage: ]', dataObject.data);
          context = this.cxtList.get(dataObject.data.url) as ContextualComm;
        }

        dataObject.data.participants.forEach((item:any) => {
          console.log('MAP:', item);
          let currentUser:User = this.contactService.getUser(item.userURL);
          if (!currentUser) {
            currentUser = new User(item);
            this.contactService.addUser(currentUser);
            console.log('[Context Service - update users] - create new user: ', currentUser);
          }

          context.addUser(currentUser);
        });

        context.url = dataObject.url,

        context.communication = <Communication>(dataObject.data);

        if (parent) context.parent = parent;

        contextTrigger.trigger.push(context);
        this.updateContextTrigger(contextTrigger.contextName, contextTrigger);
        this.updateContexts(context.url, context);

        console.info('[Active Context - ContextualComm]', context);
        this.activeContext = context;
        this._contextualComm.next(context);
        resolve(context);

      });
    })

  }

  createContextTrigger(name: string) {

    return new Promise<ContextualCommTrigger>((resolve, reject) => {
      console.log('[Contextual Comm Trigger Service - Get Localstorage] ', name);

      let contextualCommTriggerName = 'trigger-' + name;
      let contextTrigger:ContextualCommTrigger;

      if (!this.cxtTrigger.has(contextualCommTriggerName)) {
        console.info('[Create a new ContextualTrigger]', name, parent);

        let contextName = name;
        let contextScheme = 'context';
        let contextResource = [HypertyResourceType.video, HypertyResourceType.audio, HypertyResourceType.chat];

        contextTrigger = new ContextualCommTrigger(null, contextName, contextScheme, contextResource);

        /*let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }*/

        // Set the active context trigger;
        this.activeContextTrigger = contextTrigger;

        // Resolve the context trigger
        resolve(contextTrigger);
      } else {
        console.info('[Get the exist ContextualTrigger]', name);
        contextTrigger = <ContextualCommTrigger> this.cxtTrigger.get(contextualCommTriggerName) as ContextualCommTrigger;
        resolve(contextTrigger);
      }

      this.updateContextTrigger(contextualCommTriggerName, contextTrigger);
    })

  }

  updateContextTrigger(name:string, contextTrigger:ContextualCommTrigger) {

    let contextTriggerName:string;
    if (name.includes('trigger')) {
      contextTriggerName = name;
    } else {
      contextTriggerName = 'trigger-' + name;
    }

    this.cxtTrigger.set(contextTriggerName, contextTrigger);
    this.localStorage.setObject('context-triggers', strMapToObj(this.cxtTrigger));
  }

  updateContexts(url:string, context:ContextualComm) {
    this.cxtList.set(url, context);
    this.localStorage.setObject('contexts', strMapToObj(this.cxtList));
  }

  updateContextMessages(message:Message) {
    console.log('[Context Service - Update Context Message:', message);
    console.log('[Context Service - Active Context:', this.activeContext);

    let contextName = this.activeContext.url;
    let context:ContextualComm = this.activeContext
    context.messages.push(message);

    this._contextualComm.next(context);
    console.log('[Context Update messages]', contextName, context);
  }

  updateContextUsers(user:User, url:string) {
    console.log('[Context Service - Update Context User:', user);
    console.log('[Context Service - Active Context:', this.activeContext);

    if (url) {
      this.activeContext = this.cxtList.get(url);
    }

    let contextName = this.activeContext.url;
    let context:ContextualComm = this.activeContext

    // TODO: this should be replaced by a map or observable;
    context.addUser(user);

    // Update the contact list
    this.contactService.addUser(user);

    this._contextualComm.next(context);
    console.log('[Context Update contacts]', contextName, context);
  }

  getContextByName(name:string):Promise<ContextualComm> {

    return new Promise<ContextualComm>((resolve, reject) => {

      let currentContext:ContextualComm;

      this.cxtList.forEach((context:ContextualComm) => {

        if (context.name === name) {
          // TODO: Solve the problem of active context
          currentContext = context as ContextualComm;
          this.activeContext = currentContext;

          console.log('[context service - getContextByName] - ', name, currentContext);
          this._contextualComm.next(context);
          return resolve(currentContext);
        }

      })

      reject('No context found');

    });

  }

  getContextByResource(resource:string) {

    // TODO: Optimize this promise to handle with multiple contacts
    return new Promise<ContextualComm>((resolve, reject) => {

/*      let context = this.sourceContextsList.filter((context) => {
        if(context.url.indexOf(resource) !== -1) return true
      })

      if (context.length === 1) {
        resolve(context[0])
      } else {
        reject('Context not found');
      }*/
    })

  }

  getContextUsers(context:String):Observable<User[]> {

    console.log('this.contactService.getUsers(): ');
    this.contactService.getUsers().subscribe({
      next: (list) => console.log('List of contacts:', list)
    });

    return this.contactService.getUsers();
  }

  getContextMessages(context:String):Observable<Message[]> {
    return this.messageService.messageList;
  }

  contextualComm():Observable<ContextualComm> {
    return this.contextualCommObs;
  }

}
