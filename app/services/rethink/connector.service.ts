import { Injectable, EventEmitter, Output } from '@angular/core';

// Services
import  { RethinkService } from './rethink.service';

@Injectable()
export class ConnectorService {

  hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector'
  controller: any
  hyperty: any
  hypertyVideo: any

  private runtime: any

  constructor(private appService: RethinkService) {

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      if (!this.hypertyVideo) {

        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.hypertyVideo = hyperty.instance;
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

}
