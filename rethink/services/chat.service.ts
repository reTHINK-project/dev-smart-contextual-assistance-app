import { Injectable, bind } from '@angular/core';

import rethink from 'runtime-browser';

// Services
import { AppService } from './app.service';
import { MessageService } from './message.service';
import { ContactService } from './contact.service';
import { ContextService } from './context.service';

// Interfaces
import { Activity } from '../comp/activity/activity';

import { User, Message, ContextualComm } from '../models/models';

@Injectable()
export class ChatService {

  domain = this.appService.domain;
  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/GroupChatManager'
  chatController: any

  hyperty: any
  chatGroupManager: any

  contextualComm:ContextualComm

  private runtime: any
  private _onUserAdded:Function
  private _onMessage:Function
  private _onInvitation:Function

  constructor(
    private appService: AppService,
    private contextService: ContextService,
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.chatGroupManager) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.chatGroupManager = hyperty.instance;
          this.hyperty = hyperty
          resolve(this.hyperty);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        })
      } else {
        resolve(this.hyperty);
      }

    })

  }

  prepareHyperty() {

    this.chatGroupManager.onInvitation((event:any) => {
      console.log('[onInvitation]', event);

      this.join(event.url).then(a => {
        console.log(a);
      }).catch(reason => {
        console.log(reason);
      })

      if (this._onInvitation) this._onInvitation(event);
    })

    this.chatController.onUserAdded((user:any) => {

      console.log('[Chat Service - onUserAdded]', user);

      if (user.hasOwnProperty('data')) {
        let data = user.data;
        data.forEach((current:any) => {
          this.contactService.addContact(current);
          if(this._onUserAdded) this._onUserAdded(current);
        });

      } else {
        this.contactService.addContact(user);

        if(this._onUserAdded) this._onUserAdded(user);
      }

    })

    this.chatController.onMessage((message: any) => {
      console.log('[Chat Service - onMessage]', message);

      this.messageService.reciveMessag(message);

    })

  }

  create(name: string, users:string[], domains:string[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {
        this.chatController = chatController;
        console.log('[Chat Created]', chatController)

        this.prepareHyperty();

        resolve(chatController);
      }).catch((reason: any) => {
        reject(reason);
      });

    })

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.join(resource).then((chatController: any) => {
        this.chatController = chatController
        console.log('[Joined Chat]', chatController)

        let chatName:string = chatController.dataObject.data.name;

        this.contextService.create(chatName, chatController.dataObject).then((result:any) => {
          this.prepareHyperty();
          resolve(this.chatController)
        })
      })

    })

  }

  invite(listOfEmails:String[], listOfDomains:String[]) {

    return new Promise((resolve, reject) => {

      console.log('[Invite]', listOfEmails, '\n', listOfDomains);

      this.chatController.addUser(listOfEmails, listOfDomains).then((result: any) => {
        console.log('[Invite Chat]', result);
        resolve(this.chatController)
      })

    })

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('Send message: ', this.chatController);

      this.chatController.send(message).then((message:Message) => {
        console.log('[Chat Service - onMessage]', message);

        this.messageService.addMessage(message);
        resolve(message);
      }).catch(reject);

    })

  }

  onInvitation(callback: Function) {
    // this.hypertyChat.onInvitation(callback);
    this._onInvitation = callback;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

}

export var chatServiceInjectables: Array<any> = [
  bind(ChatService).toClass(ChatService)
];