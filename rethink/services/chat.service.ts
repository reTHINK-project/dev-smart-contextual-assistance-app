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
  public hypertyReady = new EventEmitter();

  constructor(private appService: AppService) {

    appService.runtimeReady.subscribe((runtime: any) => {
      this.runtime = runtime;
      this.getHyperty();
    })

  }

  getHyperty() {

    this.runtime.requireHyperty(this.hypertyURL).then((hyperty: any) => {
      console.log('[Hyperty Loaded]', hyperty)
      this.instance = hyperty.instance;
      this.hypertyReady.emit(this.instance);
    }).catch((reason: any) => {
      console.error('[Hyperty Load Error]', reason);
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
