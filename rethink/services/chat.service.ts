import { Injectable} from '@angular/core';

import rethink from 'runtime-browser';

// Services
import { AppService } from './app.service';
import { ContextService } from './context.service';

// Interfaces
import { Activity } from '../comp/activity/activity';
import { Contact } from '../comp/contact/contact';

import { ContextualComm } from '../models/ContextualComm';
import { ContextualCommUser } from '../models/ContextualCommUser';
import { ChatMessage } from '../models/Communication';

@Injectable()
export class ChatService {

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
    private contextService: ContextService
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

      if (event.hasOwnProperty('identity')) {
        this.contextService.updateContextCommUsers([event.identity.userProfile]);
      }

      if (this._onInvitation) this._onInvitation(event);
    })

    this.chatController.onUserAdded((user:any) => {

      console.log('[Chat Service - onUserAdded]', user);

      if (user.hasOwnProperty('userProfile')) {
        this.contextService.updateContextCommUsers([user.userProfile]);
      } else if (user.hasOwnProperty('data')) {
        let data = user.data;
        let users:ContextualCommUser[] = []

        data.forEach((current:any) => {
          users.push(current.userProfile);
        });
        this.contextService.updateContextCommUsers(users);
      }

    })
  }

  create(name: string, users:Contact[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users).then((chatController: any) => {
        this.chatController = chatController;
        console.log('[Chat Created]', chatController)

        this.prepareHyperty();

        return this.contextService.create(name, chatController.dataObject)
      }).catch((reason: any) => {
        reject(reason);
      }).then((context:ContextualComm) => {

        console.log('Context Created:', context);

        resolve(this.chatController);
      })

    })

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.join(resource).then((chatController: any) => {
        console.log('[Joined Chat]', resource)
        this.chatController = chatController

        this.prepareHyperty();

        resolve(this.chatController)
      })

    })

  }

  invite(listOfEmails:String[]) {

    return new Promise((resolve, reject) => {

      console.log('[Invite]', this.chatController);

      this.chatController.addUser(listOfEmails).then((result: any) => {
        console.log('[Invite Chat]', result);
        resolve(this.chatController)
      })

    })

  }

  send(message: string) {

    return new Promise<ChatMessage>((resolve, reject) => {

      console.log(this.chatController);

      this.chatController.send(message).then((chatMessage:ChatMessage) => {
        if (this._onMessage) this._onMessage(chatMessage);
        resolve(chatMessage);
      }).catch(reject);

    })

  }

  onInvitation(callback: Function) {
    // this.hypertyChat.onInvitation(callback);
    this._onInvitation = callback;
  }

  onMessage(callback: Function) {
    this._onMessage = callback;
    //this.chatController.onMessage(callback);
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

}
