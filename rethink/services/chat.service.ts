import { Injectable} from '@angular/core';

import rethink from 'runtime-browser';

// Services
import { AppService } from './app.service';
import { ContextService } from './context.service';

// Interfaces
import { Activity } from '../comp/activity/activity';

import { User, Message, Context } from '../models/models';

@Injectable()
export class ChatService {

  domain = this.appService.domain;
  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/GroupChatManager'
  chatController: any

  hyperty: any
  chatGroupManager: any

  contextualComm:Context

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
          this.contextService.addUser(current);
          if(this._onUserAdded) this._onUserAdded(current);
        });

      } else {
        this.contextService.addUser(user);

        if(this._onUserAdded) this._onUserAdded(user);
      }

    })

    this.chatController.onMessage((message: any) => {
      console.log('[Chat Service - onMessage]', message);

      // if (this._onMessage) this._onMessage(message);
      this.contextService.addMessage(message);
    })

  }

  create(name: string, users:string[], domains:string[], parent?:string) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {
        this.chatController = chatController;
        console.log('[Chat Created]', chatController)

        this.prepareHyperty();

        return this.contextService.create(name, chatController.dataObject, parent);
      }).catch((reason: any) => {
        reject(reason);
      }).then((context:Context) => {

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

    return new Promise<any>((resolve, reject) => {

      this.chatController.send(message).then((message:Message) => {
        console.log('[Chat Service - onMessage]', message);
        this.contextService.addMessage(message);
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
