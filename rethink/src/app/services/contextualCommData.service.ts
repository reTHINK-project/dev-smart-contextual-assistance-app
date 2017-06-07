import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// Models
import { ContextualComm } from '../models/models';

// Utils
import { config } from '../config';
import { normalizeName, normalizeFromURL } from '../utils/utils';

// Services
import { ContextualCommService } from './contextualComm.service';
import { ChatService } from './rethink/chat.service';
import { ContactService } from './contact.service';

@Injectable()
export class ContextualCommDataService {

  private appPrefix = config.appPrefix;
  private location: Location;

  constructor(
    location: Location,
    private router: Router,
    private chatService: ChatService,
    private contactService: ContactService,
    private contextualCommService: ContextualCommService
  ) {
    this.location = location;
  }

  createContext(name: string, parentNameId?: string, contextInfo?: any): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      this.contextualCommService.getContextByName(name)
      .then((context) => {

        console.info('[ContextualCommData Service] - context found: ', context);
        resolve(context);

      }).catch((reason: any) => {

        // TODO: use the util normalizeName;
        let normalizedName = this.appPrefix + '-' + name.toLowerCase();
        if (parentNameId) {
          normalizedName = parentNameId + '-' + name.toLowerCase();
        }

        console.info('[ContextualCommData Service] - no contexts was found: ', reason);
        console.info('[ContextualCommData Service] - creating new context: ', name, parentNameId, normalizedName);

        this.chatService.create(normalizedName, [], []).then((controller: any) => {

          console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
          console.info('[ContextualCommData Service] - creating new contexts: ', controller, parentNameId);

          return this.contextualCommService.create(name, controller.dataObject, parentNameId, contextInfo);
        }).then((context: ContextualComm) => {
          console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
          resolve(context);
        }).catch((reason: any) => {
          console.error('Reason:', reason);
        });

      });

    });

  }

  joinContext(name: string, dataObject: any, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      console.info('[ContextualCommData Service] - join: ', name);

      this.contextualCommService.getContextByName(name).then((context: ContextualComm) => {

        console.info('[ContextualCommData Service] - communication objects was created successfully: ', dataObject);
        console.info('[ContextualCommData Service] - creating new contexts: ', dataObject, parentNameId);

        resolve(context);
      }).catch((reason: any) => {
        console.error('Reason:', reason);

        return this.contextualCommService.create(name, dataObject, parentNameId);
      }).then((context: ContextualComm) => {

        resolve(context);
      });

    });
  }

  createAtomicContext(username: string, name: string, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let normalizedName = normalizeName(name);
      let activeContext = this.contextualCommService.getActiveContext;

      console.log('[ContextualCommData Service] - normalizedName:', normalizedName);

      this.chatService.create(normalizedName.id, [username], []).then((controller: any) => {

        console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
        console.info('[ContextualCommData Service] - creating new contexts: ', controller, activeContext);

        return this.contextualCommService.create(normalizedName.name, controller.dataObject, normalizedName.parent);
      }).then((context: ContextualComm) => {
        console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
        resolve(context);
      }).catch((reason: any) => {
        console.error('Reason:', reason);
      });

    });

  }

  normalizeAtomicName(name: string): string {

    let activeContext = this.contextualCommService.getActiveContext;
    if (activeContext) {
      return activeContext.id + '-' + name;
    } else {
      let path = this.location.path();
      return normalizeFromURL(path, this.contactService.sessionUser.username);
    }

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

  getActiveContext(): ContextualComm {
    let contextualComm: ContextualComm = this.contextualCommService.getActiveContext;

    if (contextualComm) {
      return contextualComm;
    } else {
      throw new Error('No Contextual Comm Active');
    }

  }

  getContext(name: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualCommList()
      .map(contexts => {
        let found = contexts.filter(context => this.filterContextsByName(name, context))[0];
        console.log('[ContextualCommData Service] - found: ', found);
        if (!found) {
          throw new Error('Context not found');
        }

        return found;
      });
  }

  getContextById(id: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualCommList()
      .map(contexts => {
        let found = contexts.filter(context => this.filterContextsById(id, context))[0];
        if (!found) {
          throw new Error('Context not found');
        }

        return found;
      });
  }

  getTasks(url: string): Observable<ContextualComm[]> {
    return this.contextualCommService.getContextualComms().map(contexts => contexts.filter(context => context.parent === url));
  }

  getUsers() {
    return this.contextualCommService.getContextualComms()
      .map(contexts => contexts.filter(context => context.name === name)[0].users);
  }

  private filterContextsById(id: string, context: ContextualComm) {
    console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
    return context.id === id;
  }

  private filterContextsByName(name: string, context: ContextualComm) {

    if (name.indexOf('-') !== -1 && name.includes('@')) {
      let users = name.split('-');
      let user1 = users[0];
      let user2 = users[1];

      let variation1 = user1 + '-' + user2;
      let variation2 = user2 + '-' + user1;

      if (context.name === variation1) {
        name = variation1;
      } else if (context.name === variation2) {
        name = variation2;
      }
    }

    console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
    return context.name === name;

  }

}
