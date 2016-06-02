import { Injectable, EventEmitter} from '@angular/core';

import rethink from 'runtime-browser';

// Services
import { AppService } from './app.service';
import { ContextService } from './context.service';

// Interfaces
import {Activity} from '../comp/activity/activity';
import {Contact} from '../comp/contact/contact';
import {Context} from '../comp/context/context';

// Data
import {contacts} from './contacts';

@Injectable()
export class ChatService {

  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/HypertyChat'
  chat: any
  hyperty: any
  hypertyChat: any

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

  create(name: string, participants:Contact[]) {

    return new Promise((resolve, reject) => {

      this.hypertyChat.create(name, participants).then((chat: any) => {
        this.chat = chat;
        console.log('[Chat Created]', chat)

        chat.addEventListener('participant:added', (participant: any) => {
          console.info('new participant', participant);
        });

        return this.contextService.create(chat.dataObject)
      }).catch((reason: any) => {
        reject(reason);
      }).then((context:Context) => {

        console.log('Context Created:', context);

        resolve(this.chat);
      })

    })

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.hypertyChat.join(resource).then((chat: any) => {
        console.log('[Joined Chat]', resource)
        this.chat = chat
        resolve(this.chat)
      })

    })

  }

  invite(listOfEmails: any) {

    return new Promise((resolve, reject) => {

      this.hypertyChat.invite(listOfEmails).then((chat: any) => {
        console.log('[Invite Chat]', chat);
        this.chat = chat
        resolve(this.chat)
      })

    })

  }

}
