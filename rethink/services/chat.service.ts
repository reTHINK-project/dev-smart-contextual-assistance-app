import { Injectable, EventEmitter} from '@angular/core';

import rethink from 'runtime-browser';

// Services
import { AppService } from './app.service';
import { ContextService } from './context.service';

// Interfaces
import { Activity } from '../comp/activity/activity';
import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';
import { ContextualCommTrigger } from '../models/ContextualCommTrigger';
import { UserProfile } from '../models/UserProfile';

// Data
import {contacts} from './contacts';

@Injectable()
export class ChatService {

  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/GroupChatManager'
  chatController: any

  hyperty: any
  hypertyChat: any

  contextualComm:ContextualCommTrigger

  private runtime: any

  constructor(
    private appService: AppService,
    private contextService: ContextService
  ) {}

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyChat) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyChat = hyperty.instance;
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

  create(name: string, users:Contact[]) {

    return new Promise((resolve, reject) => {

      this.hypertyChat.create(name, users).then((chatController: any) => {
        this.chatController = chatController;
        console.log('[Chat Created]', chatController)

        return this.contextService.create(chatController.dataObject)
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

      this.hypertyChat.join(resource).then((chatController: any) => {
        console.log('[Joined Chat]', resource)
        this.chatController = chatController
        resolve(this.chatController)
      })

    })

  }

  invite(listOfEmails:UserProfile[]) {

    return new Promise((resolve, reject) => {

      this.chatController.invite(listOfEmails).then((chatController: any) => {
        console.log('[Invite Chat]', chatController);
        this.chatController = chatController
        resolve(this.chatController)
      })

    })

  }

  send(message: string) {

    return new Promise((resolve, reject) => {

      this.chatController.send(message).then(resolve).catch(reject);

    })

  }

  onInvitation(callback: Function) {
    this.hypertyChat.onInvitation(callback);
  }

  onMessage(callback: Function) {
    this.chatController.onMessage(callback);
  }

}
