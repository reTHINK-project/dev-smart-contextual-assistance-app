import { Injectable, Input, bind } from '@angular/core'
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx'

// Services
import { LocalStorage } from './storage.service'
import { ContactService } from './contact.service'
import { MessageService } from './message.service'

// Interfaces
import { Communication } from '../models/rethink/Communication'
import { HypertyResourceType } from '../models/rethink/HypertyResource'
import { ContextualCommTrigger, ContextualComm, User, Message } from '../models/models'

@Injectable()
export class ContextService {

  // activities: [Activity] = [
  //   { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
  //   { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
  //   { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  // ]

  private cxtTrigger:Set<ContextualCommTrigger> = new Set<ContextualCommTrigger>();
  private cxtList:Map<string, ContextualComm> = new Map<string, ContextualComm>();

  private activeContextTrigger: ContextualCommTrigger;
  private activeContext: ContextualComm;

  private contextPath: string;
  private taskPath: string

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

    this.contactService.newUser.subscribe((user:User) => this.updateContextUsers(user));
    this.messageService.newMessage.subscribe((message:Message) => this.updateContextMessages(message));

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

          // Set this context to the context triggers;
          contextTrigger.trigger.push(context);

        } else {
          console.info('[Get the context to localStorage: ]', dataObject.data.name);
          context = <ContextualComm> this.localStorage.getObject(dataObject.data.name);
        }

        console.info('[Active Context: ]', context);
        this.activeContext = context;

        context.communication = <Communication>(dataObject.data);

        if (parent) context.parent = parent;

        context.url = dataObject.url,
        context.users = dataObject.data.participants.map((item:any) => {
          this.contactService.addContact(item);
          return item
        });

        // Update the localStorage context
        this.localStorage.setObject(context.name, context);

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
    let contextName = this.activeContext.name;
    let context:ContextualComm = this.activeContext
    context.messages.push(message);
    this.localStorage.setObject(contextName, context);

    console.log('[Context Update messages]', contextName, context);
  }

  updateContextUsers(user:User) {
    console.log('Active Context:', this.activeContext);
    let contextName = this.activeContext.name;
    let context:ContextualComm = this.activeContext
    context.users.push(user);
    this.localStorage.setObject(contextName, context);

    console.log('[Context Update contacts]', contextName, context);
  }

  getContextByName(name:string):Promise<ContextualComm> {

    return new Promise<ContextualComm>((resolve, reject) => {

      let context:ContextualComm;

      if (this.localStorage.hasObject(name)) {
        context = this.localStorage.getObject(name);

        // TODO: Solve the problem of active context
        this.activeContext = context;
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

}