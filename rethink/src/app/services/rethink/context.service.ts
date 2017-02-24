import { Injectable, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


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

  private cxtTrigger:Set<ContextualCommTrigger> = new Set<ContextualCommTrigger>();
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

    this.contextualCommObs = this._contextualComm.map((context:ContextualComm) => {
      console.log('[Context Service scan] - context', context);
      return context;
    });

    this.contextualCommObs.subscribe((context:ContextualComm) => {
      console.log('[Context Service scan] - contextualCommObs', context);
    })

  }

  create(name: string, dataObject: any, parent?: any) {


    // TODO Add the dataObject on Rx.Observable (stream);
    // TODO add a Stream to look on changes for dataObject changes;
    return new Promise<ContextualComm>((resolve, reject) => {

      this.createContextTrigger(this.contextPath).then((contextTrigger:ContextualCommTrigger) => {

        // TODO Create the verification to reuse a context, because at this moment we can't reuse a communication or connection dataObject;
        let context:ContextualComm;

        if (!this.localStorage.hasObject(dataObject.data.name)) {

          console.info('[Create a new context: ]', dataObject.data.name);

          context = new ContextualComm({
            url: dataObject.url,
            name: dataObject.data.name,
            description: 'Description of the context',
          });

          let communication:Communication = <Communication>(dataObject.data);
          communication.resources = [HypertyResourceType.chat]

          // set the communication to the Context
          context.communication = communication;

          // Set the active context
          this.activeContext = context;

          context.users = dataObject.data.participants.map((item:any) => {

            let currentUser:User = this.contactService.getUser(item.userURL);
            if (!currentUser) {
              currentUser = new User(item);
              this.contactService.addUser(currentUser);
              console.log('[Context Service - update users] - create new user: ', currentUser);
            }

            return currentUser;
          });

          // Set this context to the context triggers;
          contextTrigger.trigger.push(context);

        } else {
          console.info('[Get the context to localStorage: ]', dataObject.data.name);
          context = this.localStorage.getObject(dataObject.data.name) as ContextualComm;
        }

        console.info('[Active Context: ]', context);
        this.activeContext = context;

        context.url = dataObject.url,

        context.communication = <Communication>(dataObject.data);

        if (parent) context.parent = parent;

        // Update the localStorage context
        this.localStorage.setObject(context.name, context);

        this._contextualComm.next(context);
        resolve(context);

      });
    })

  }

  createContextTrigger(name: string) {

    return new Promise<ContextualCommTrigger>((resolve, reject) => {
      console.log('[Contextual Comm Trigger Service - Get Localstorage] ', name);

      if (!this.localStorage.hasObject('trigger-' + name)) {
        console.info('[Create a new ContextualTrigger]', name, parent);

        let contextName = name;
        let contextScheme = 'context';
        let contextResource = [HypertyResourceType.video, HypertyResourceType.audio, HypertyResourceType.chat];

        let contextTrigger = new ContextualCommTrigger(null, contextName, contextScheme, contextResource);

        /*let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }*/

        // Update the localStorage contextTrigger
        this.localStorage.setObject('trigger-' + contextTrigger.contextName, contextTrigger);

        // Set the active context trigger;
        this.activeContextTrigger = contextTrigger;

        this.cxtTrigger.add(contextTrigger)

        // Resolve the context trigger
        resolve(contextTrigger);
      } else {
        console.info('[Get the exist ContextualTrigger]', name);
        let contextualCommTrigger:ContextualCommTrigger = <ContextualCommTrigger> this.localStorage.getObject('trigger-' + name);
        resolve(contextualCommTrigger);
      }
    })

  }

  updateContextMessages(message:Message) {
    console.log('Active Context:', this.activeContext);

    let user = this.contactService.getUser(message.user);

    let contextName = this.activeContext.name;
    let context:ContextualComm = this.activeContext
    context.messages.push(message);
    this.localStorage.setObject(contextName, context);

    this._contextualComm.next(context);

    console.log('[Context Update messages]', contextName, context);
  }

  updateContextUsers(user:User) {
    console.log('Active Context:', this.activeContext);
    let contextName = this.activeContext.name;
    let context:ContextualComm = this.activeContext
    context.users.push(user);

    this.localStorage.setObject(contextName, context);
    this.contactService.addUser(user);

    this._contextualComm.next(context);

    console.log('[Context Update contacts]', contextName, context);
  }

  getContextByName(name:string):Promise<ContextualComm> {

    return new Promise<ContextualComm>((resolve, reject) => {

      let context:ContextualComm;

      if (this.localStorage.hasObject(name)) {
        context = this.localStorage.getObject(name) as ContextualComm;

        console.log('[context service - getContextByName] - ', name, context);

        // TODO: Solve the problem of active context
        this.activeContext = context;
        this._contextualComm.next(context);
        resolve(context);
      } else {
        reject('No context found');
      }

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
