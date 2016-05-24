import { Injectable, EventEmitter, Output } from '@angular/core';

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
export class VideoService {

  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/HypertyConnector'
  controller: any
  instance: any

  private runtime: any
  @Output() hypertyConnectorReady = new EventEmitter();

  constructor(private appService: AppService) {

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.instance) {

        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.instance = hyperty.instance;
          this.hypertyConnectorReady.emit(this.instance);
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

}
