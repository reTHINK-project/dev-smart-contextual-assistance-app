import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { MessageService } from '../message.service';
import { ContactService } from '../contact.service';
import { ContextService } from '../rethink/context.service';

import { User, Message, ContextualComm } from '../../models/models';

@Injectable()
export class ChatService {

  chatController: any;

  hyperty: any;
  hypertyURL: string;

  chatGroupManager: any;

  contextualComm:ContextualComm;

  private runtime: any
  private _onUserAdded:Function
  private _onMessage:Function
  private _onInvitation:Function

  constructor(
    private appService: RethinkService,
    private contextService: ContextService,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/GroupChatManager'

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

    console.log('[Chat Service - prepareHyperty]');

    this.chatGroupManager.onResume((chatController:any) => {
      console.log('[Chat Service - prepareHyperty] - onResume: ', chatController);
      this.chatController = chatController;
    });

    this.chatGroupManager.onInvitation((event:any) => {
      console.log('[Chat Service - prepareHyperty] - onInvitation', event);

      this.contactService.addUser(new User(event.identity.userProfile));

      this.join(event.url).then(a => {
        console.log(a);
      }).catch(reason => {
        console.log(reason);
      })

      if (this._onInvitation) this._onInvitation(event);
    })

    this.chatController.onUserAdded((user:any) => {

      console.log('[Chat Service - prepareHyperty] - onUserAdded', user);
      let current:User;

      if (user.hasOwnProperty('data')) {
        current = new User(user.data);
      } else {
        current = new User(user);
      }

      this.contextService.updateContextUsers(current);
      if(this._onUserAdded) this._onUserAdded(current);

    })

    this.chatController.onMessage((message: any) => {
      console.log('[Chat Service - onMessage]', message);

      let msg = {
        type: 'message',
        message: message.value.message,
        user: message.identity.userProfile.username
      };

      let currentMessage = new Message(msg);
      this.contextService.updateContextMessages(currentMessage);

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

      console.log('[Invite]', listOfEmails, ' - ', listOfDomains);

      this.chatController.addUser(listOfEmails, listOfDomains).then((result: any) => {
        console.log('[Invite Chat]', result);
        resolve(this.chatController)
      }).catch((reason:any) => {
        console.error('Error on invite:', reason);
      })

    })

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('Send message: ', this.chatController, message);

      this.chatController.send(message).then((result:any) => {

        let msg = {
          type: 'message',
          message: result.value.message,
          user: result.identity.userProfile.username
        };

        let currentMessage = new Message(msg);
        console.log('[Chat Service - onMessage]', message, result, currentMessage);
        this.contextService.updateContextMessages(currentMessage);
        resolve(currentMessage);
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