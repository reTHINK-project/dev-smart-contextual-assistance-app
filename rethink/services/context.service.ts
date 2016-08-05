import { Injectable, Input, bind } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

// Services
import { LocalStorage } from './storage.service';
import { ContactService } from './contact.service';
import { MessageService } from './message.service';

// Interfaces
import { ContextTrigger, Context, Communication, User, Message } from '../models/models';

@Injectable()
export class ContextService {

  // activities: [Activity] = [
  //   { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
  //   { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
  //   { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
  //   { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
  // ]

  private cxtTrigger:Set<ContextTrigger> = new Set<ContextTrigger>();
  private cxtList:Map<string, Context> = new Map<string, Context>();

  private activeContextTrigger: ContextTrigger;
  private activeContext: Context;

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

  create(name: string, dataObject: any, parent?:string) {


    // TODO Add the dataObject on Rx.Observable (stream);
    // TODO add a Stream to look on changes for dataObject changes;
    return new Promise<Context>((resolve, reject) => {

      this.createContextTrigger(this.contextPath, dataObject, parent).then((contextTrigger:ContextTrigger) => {

        // TODO Create the verification to reuse a context, because at this moment we can't reuse a communication or connection dataObject;
        let context:Context;

        if (!this.localStorage.hasObject(dataObject.data.name)) {

          console.info('[Create a new context: ]', dataObject.data.name);

          context = new Context({
            url: dataObject.url,
            name: dataObject.data.name,
            description: 'Description of the context'
          });

          let communication:Communication = new Communication(dataObject.data);
          communication.resources = ['chat'];

          // set the communication to the Context
          context.communication = communication;

          // Set the active context
          this.activeContext = context;

          // set the parent to the context
          if (parent) { context.parent = parent; }

          // Set this context to the context triggers;
          contextTrigger.trigger.push(context);

        } else {
          console.info('[Get the context to localStorage: ]', dataObject.data.name);
          context = <Context> this.localStorage.getObject(dataObject.data.name);
        }

        context.users = dataObject.data.participants;

        Object.keys(dataObject.data.participants).forEach((key: any, value: any) => {
          let user:User = new User(dataObject.data.participants[key]);
          this.contactService.addContact(user);
        });

        // Update the localStorage context
        this.localStorage.setObject(context.name, context);

        console.info('[Active Context: ]', context);
        resolve(context);

      });
    })

  }

  createContextTrigger(name: string, dataObject: any, parent?:string) {

    return new Promise<ContextTrigger>((resolve, reject) => {
      console.log('[Context Service - Get Localstorage] ', name, parent, this.localStorage.hasObject(parent), this.localStorage.hasObject('trigger-' + name), this.localStorage);

      if (!this.localStorage.hasObject('trigger-' + name)) {
        console.info('[Create a new context]', name, parent);

        let contextName = name;
        let contextScheme = 'context';
        let contextResource = ['video', 'audio', 'chat'];

        let contextTrigger = new ContextTrigger(null, contextName, contextScheme, contextResource);

        /*let contextValue:ContextValues = {
          name: 'location',
          unit: 'rad',
          value: 0,
          sum: 0
        }*/

        // Update the localStorage contextTrigger
        this.localStorage.setObject('trigger-' + contextTrigger.name, contextTrigger);

        // Set the active context trigger;
        this.activeContextTrigger = contextTrigger;

        this.cxtTrigger.add(contextTrigger)

        // Resolve the context trigger
        resolve(contextTrigger);
      } else {
        console.info('[Get the exist context]', name, parent);
        let contextualCommTrigger:ContextTrigger = this.localStorage.getObject('trigger-' + name);
        resolve(contextualCommTrigger);
      }
    })

  }

  updateContextMessages(message:Message) {

    console.log('Active Context:', this.activeContext);
    if (!this.activeContext) {

    }
    let contextName = this.activeContext.name;
    let context:Context = this.localStorage.getObject(contextName);
    context.messages.push(message);
    this.localStorage.setObject(contextName, context);

    console.log('[Context Update messages]', contextName, context);
  }

  updateContextUsers(user:User) {
    console.log('Active Context:', this.activeContext);
    let context:Context = this.activeContext;
    context.users.push(user);
    console.log('[Context Update users]', context);
  }

  getContextByName(name:string):Promise<Context> {

    return new Promise<Context>((resolve, reject) => {

      let context:Context;

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
    return new Promise<Context>((resolve, reject) => {

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

export var contextServiceInjectables: Array<any> = [
  bind(ContextService).toClass(ContextService)
];
