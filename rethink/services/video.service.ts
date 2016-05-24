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
  hypertyVideo: any

  private runtime: any

  constructor(private appService: AppService) {

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyVideo) {

        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyVideo = hyperty.instance;
          resolve(this.hypertyVideo);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        })
      } else {
        resolve(this.hypertyVideo);
      }

    })
  }

}
