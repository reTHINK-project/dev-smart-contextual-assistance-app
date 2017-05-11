import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ContextualCommService } from './contextualComm.service';
import { ContextualComm } from '../models/models';
import { ChatService } from './rethink/chat.service';


@Injectable()
export class ContextualCommDataService {

  constructor(
    private chatService: ChatService,
    private contextualCommService: ContextualCommService
  ) {

  }

  createContext(name: string, parent: string) {

    return new Promise((resolve, reject) => {

      this.contextualCommService.getContextByName(name)
      .then((context) => {

        console.info('[Application Component] - context found: ', context);
        resolve(context);

      }).catch((reason: any) => {

        console.info('[Application Component] - no contexts was found: ', reason);
        console.info('[Application Component] - creating new context: ', name);

        this.chatService.create(name, [], []).then((controller: any) => {

          console.info('[Application Component] - communication objects was created successfully: ', controller);
          console.info('[Application Component] - creating new contexts: ', controller, parent);

          return this.contextualCommService.create(controller.dataObject.metadata.name, controller.dataObject, parent);
        }).then((context: ContextualComm) => {
          console.info('[Application Component] -  ContextualComm created: ', context);
          resolve(context);
        }).catch((reason: any) => {
          console.error('Reason:', reason);
        });

      });

    });

  }

  getContexts(): Observable<ContextualComm[]> {
    return this.contextualCommService.getContextualComms();
  }

  getContacts() {

  }



}
