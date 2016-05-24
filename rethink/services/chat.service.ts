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
  instance: any

  private runtime: any
  public hypertyChatReady = new EventEmitter();

  constructor(private appService: AppService) {}

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.instance) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.instance = hyperty.instance;
          this.hypertyChatReady.emit(this.instance);
          resolve(hyperty.instance);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        })
      } else {
        resolve(this.instance);
      }

    })

  }

  create(name: string, participants:Contact[]) {

    return new Promise((resolve, reject) => {

      this.instance.create(name, participants).then((chat: any) => {
        this.chat = chat;
        resolve(chat);
      }).catch((reason: any) => {
        reject(reason);
      })

    })

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.instance.join(resource).then((chat: any) => {
        console.log('[Joined Chat]', resource)
        this.chat = chat
        resolve(this.chat)
      })

    })

  }

}
