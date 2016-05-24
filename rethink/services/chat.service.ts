import { Injectable, EventEmitter } from '@angular/core';

import rethink from 'runtime-browser';

// Services
import  { AppService } from './app.service';

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
  hypertyChat: any

  private runtime: any

  constructor(private appService: AppService) {}

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyChat) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyChat = hyperty.instance;
          resolve(this.hypertyChat);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        })
      } else {
        resolve(this.hypertyChat);
      }

    })

  }

  create(name: string, participants:Contact[]) {

    return new Promise((resolve, reject) => {

      this.hypertyChat.create(name, participants).then((chat: any) => {
        this.chat = chat;
        console.log('[Chat Created]', chat)
        resolve(chat);
      }).catch((reason: any) => {
        reject(reason);
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

}
