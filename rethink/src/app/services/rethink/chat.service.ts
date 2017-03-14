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

      console.log('[Chat Service - getHyperty] - ', this.chatGroupManager);

      if (!this.chatGroupManager) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.chatGroupManager = hyperty.instance;
          this.hyperty = hyperty
          this.prepareHyperty();
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

    console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);

    this.chatGroupManager.onResume((chatController:any) => {
      console.log('[Chat Service - prepareHyperty] - onResume: ', chatController);
      this.chatController = chatController;

      this.prepareController();
    });

    this.chatGroupManager.onInvitation((event:any) => {
      console.log('[Chat Service - prepareHyperty] - onInvitation', event);

      let currentUser:User = this.contactService.getUser(event.identity.userProfile.userURL);
      if (!currentUser) {
        currentUser = new User(event.identity.userProfile);
        this.contactService.addUser(currentUser);
      }

      this.join(event.url).then(a => {
        this.prepareController();
      }).catch(reason => {
        console.log(reason);
      })

      if (this._onInvitation) this._onInvitation(event);
    })

  }

  prepareController() {

    console.log('[Chat Service - prepareController]', this.chatController);

    this.chatController.onUserAdded((user:any) => {

      console.log('[Chat Service - prepareController] - onUserAdded', user);
      let current:User;

      if (user.hasOwnProperty('data')) {
        current = this.contactService.getUser(user.data.userURL);
      } else {
        current = this.contactService.getUser(user.userURL);
      }

      console.log('[Chat Service - prepareController] - current user:', current);

      if (!current) { current = new User(user); }

      this.contextService.updateContextUsers(current);
      // if(this._onUserAdded) this._onUserAdded(current);

    })

    this.chatController.onMessage((message: any) => {
      console.log('[Chat Service - onMessage]', message);
      let user:User = this.contactService.getUser(message.identity.userProfile.userURL);
      console.log('[Chat Service] - user:', user, message.identity.userProfile.userURL);

      if (user) {
        let msg = {
          type: 'message',
          message: message.value.message,
          user: user
        };

        let currentMessage = new Message(msg);
        this.contextService.updateContextMessages(currentMessage);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    })

  }

  create(name: string, users:string[], domains:string[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {
        this.chatController = chatController;
        console.log('[Chat Created]', chatController)

        this.prepareHyperty();
        this.prepareController();

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
          this.prepareController();

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

        console.log('[Chat Service - Sended Message]', message);
        let user:User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        let msg = {
          type: 'message',
          message: result.value.message,
          user: user
        };

        let currentMessage = new Message(msg);
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