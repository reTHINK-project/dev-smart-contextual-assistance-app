import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/elementAt';

import { ContextualComm } from '../models/models';

import { ContextualCommService } from './contextualComm.service';
import { ChatService } from './rethink/chat.service';


@Injectable()
export class ContextualCommDataService {

  constructor(
    private chatService: ChatService,
    private contextualCommService: ContextualCommService
  ) {

  }

  createContext(name: string, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      this.contextualCommService.getContextByName(name)
      .then((context) => {

        console.info('[Application Component] - context found: ', context);
        resolve(context);

      }).catch((reason: any) => {

        let normalizedName = 'sca-' + name.toLowerCase();
        if (parentNameId) {
          normalizedName = parentNameId + '-' + name.toLowerCase();
        }

        console.info('[Application Component] - no contexts was found: ', reason);
        console.info('[Application Component] - creating new context: ', name, parentNameId, normalizedName);

        this.chatService.create(normalizedName, [], []).then((controller: any) => {

          console.info('[Application Component] - communication objects was created successfully: ', controller);
          console.info('[Application Component] - creating new contexts: ', controller, parentNameId);

          return this.contextualCommService.create(name, controller.dataObject, parentNameId);
        }).then((context: ContextualComm) => {
          console.info('[Application Component] -  ContextualComm created: ', context);
          resolve(context);
        }).catch((reason: any) => {
          console.error('Reason:', reason);
        });

      });

    });

  }

  joinContext(name: string, dataObject: any, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      this.contextualCommService.getContextByName(name).then((context: ContextualComm) => {

        console.info('[Application Component] - communication objects was created successfully: ', dataObject);
        console.info('[Application Component] - creating new contexts: ', dataObject, parentNameId);

        resolve(context);
      }).catch((reason: any) => {
        console.error('Reason:', reason);

        return this.contextualCommService.create(name, dataObject, parentNameId);
      }).then((context: ContextualComm) => {

        resolve(context);
      });

    });
  }

  /**
   *
   *
   * @returns {Observable<ContextualComm[]>}
   *
   * @memberof ContextualCommDataService
   */
  getContexts(): Observable<ContextualComm[]> {
    return this.contextualCommService.getContextualComms()
      .map(contexts => contexts.filter(context => context.parent === ''));
  }

  getContext(name: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualComms()
      .map(contexts => contexts.filter(context => context.name === name)[0]);
  }

  getTasks(url: string): Observable<ContextualComm[]> {
    return this.contextualCommService.getContextualComms().map(contexts => contexts.filter(context => context.parent === url));
  }

  getUsers() {
    return this.contextualCommService.getContextualComms()
      .map(contexts => contexts.filter(context => context.name === name)[0].users);
  }



}
