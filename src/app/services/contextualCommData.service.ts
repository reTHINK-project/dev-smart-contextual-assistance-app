import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';

// Models
import { ContextualComm, ContextualCommEvent, InvitationEvent } from '../models/models';

import { isALegacyUser, filterContextsByName, normalizeName, objectToPath } from '../utils/utils';

// Services
import { ContextualCommService } from './contextualComm.service';
import { ChatService } from './rethink/chat.service';
import { ContactService } from './contact.service';
import { UserAdded } from '../models/app.models';
import { Communication } from '../models/rethink/Communication';

@Injectable()
export class ContextualCommDataService {

  private location: Location;

  private onUserAddeSubscription: Subscription;
  private chatInvitationSubscription: Subscription;

  public contextualCommEvent  = new EventEmitter<ContextualCommEvent>();
  public atomiContextualCommEvent = new EventEmitter<ContextualCommEvent>();

  constructor(
    location: Location,
    private router: Router,
    private chatService: ChatService,
    private contactService: ContactService,
    private contextualCommService: ContextualCommService
  ) {
    this.location = location;


    this.onUserAddeSubscription = chatService.onUserAdded.subscribe((userData: UserAdded) => {

      const currentUser: any = userData.user;
      const controller: any = userData.controller;

      this.chatService.controllerUserAdded(controller, currentUser);

    });

    this.chatInvitationSubscription = chatService.onInvitation.subscribe((event: InvitationEvent) => {

      const url = event.url;
      const metadata = event.value;
      const name = metadata.name;

      const normalizedName = normalizeName(name);

      this.joinContext(normalizedName.name, normalizedName.id, metadata, normalizedName.parent)
        .then(context => event.ack(200))
        .catch(reason => event.ack(406));

    })

  }

  createContext(name: string, parentNameId?: string, contextInfo?: any): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      this.contextualCommService.getContextByName(name)
      .then((context) => {

        console.info('[ContextualCommData Service] - context found: ', context);

        this.contextualCommEvent.emit({
          type: 'add',
          contextualComm: context
        });

        resolve(context);

      }).catch((reason: any) => {

        const normalizedName = normalizeName(name, parentNameId);

        console.info('[ContextualCommData Service] - no contexts was found: ', reason);
        console.info('[ContextualCommData Service] - creating new context: ', name, normalizedName);

        this.chatService.create(normalizedName.id, [], contextInfo).then((controller: any) => {

          console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
          console.info('[ContextualCommData Service] - creating new contexts: ', controller, normalizedName.parent);

          return this.contextualCommService.create(name, controller.dataObject, normalizedName.parent, contextInfo);
        }).then((context: ContextualComm) => {
          console.info('[ContextualCommData Service] -  ContextualComm created: ', context);

          this.contextualCommEvent.emit({
            type: 'add',
            contextualComm: context
          });

          resolve(context);
        }).catch((error: any) => {
          console.warn('Context not found', error);
          // console.error('Reason:', reason);
        });

      });

    });

  }

  joinContext(name: string, id: string, metadata: any, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      console.info('[ContextualCommData Service] - join: ', name, id);

      this.getContextById(id).subscribe((context: ContextualComm) => {

        console.info('[ContextualCommData Service] - already exists joinning: ', context, name, id);

        const found = this.compareMetadata(context.communication, metadata);

        console.info('[ContextualCommData Service] - already found the most recent:', found);

        if (found) {
          this.processJoin(name, found, parentNameId).then((result) => {
            console.log('JOINED', result);
          }).catch((reason: any) => {
            console.error('NOT JOINED', reason);
          });
        } else {
          reject('An older context already exists');
        }

      }, (reason: any) => {

        this.processJoin(name, metadata, parentNameId).then((result) => {
          console.log('JOINED', result);
        }).catch((error: any) => {
          console.error('NOT JOINED', error);
        });

      })

    });
  }

  private processJoin(name: string, metadata: Communication, parentNameId?: string) {

    return new Promise((resolve, reject) => {
      console.info('[ContextualCommData Service] - communication objects was created successfully: ', metadata);
      console.info('[ContextualCommData Service] - creating new contexts: ', metadata, parentNameId);

      const url = metadata.url;

      this.chatService.join(url).then((dataObject: any) => {
        console.log('AQUI:', dataObject);
        return this.contextualCommService.create(name, dataObject, parentNameId);
      }).catch((error: any) => {
        reject(error);
      }).then((context: ContextualComm) => {

        this.contextualCommEvent.emit({
          type: 'add',
          contextualComm: context
        });

        resolve(context);
      }).catch((error: any) => {

        console.error('ERROR:', error);

      })
    })
  }

  createAtomicContext(user: any[], name: string, id: string, parentNameId?: string): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      const activeContext = this.contextualCommService.getActiveContext;

      console.log('[ContextualCommData Service] - normalizedName:', name, id, parentNameId);

      this.getContextById(id).subscribe((context: ContextualComm) => {
        resolve(context);
      }, (error: any) => {

        this.chatService.create(id, user).then((controller: any) => {

          console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
          console.info('[ContextualCommData Service] - creating new contexts: ', controller, activeContext);

          return this.contextualCommService.create(name, controller.dataObject, parentNameId);
        }).then((context: ContextualComm) => {
          console.info('[ContextualCommData Service] -  ContextualComm created: ', context);

          this.contextualCommEvent.emit({
            type: 'add',
            contextualComm: context
          });

          resolve(context);
        }).catch((reason: any) => {
          console.error('Reason:', reason);
          reject(reason);
        });

      });

    });

  }

  removeContext(context: ContextualComm): Observable<boolean> {

    return Observable.fromPromise(new Promise((resolve, reject) => {

      if (context) {

        const chatToClose = context.contexts ? context.contexts.map(sub => this.chatService.close(sub.url)) : [];
        const contextToRemove = context.contexts ? context.contexts.map(sub => this.contextualCommService.removeContextualComm(sub)) : [];

        // add the main context
        chatToClose.push(this.chatService.close(context.url));
        contextToRemove.push(this.contextualCommService.removeContextualComm(context));

        console.log('Childs to remove:', chatToClose, contextToRemove);

        return Promise.all([chatToClose])
          .then(result => Promise.all(contextToRemove))
          .then(() => { resolve(true); this._redirect(context); })
          .catch(error => reject(error));
      }

    }));

  }

  _redirect(context: ContextualComm) {
    const basePath = this.router.url;
    const contextPathObj = normalizeName(context.id);
    const basePathObj = normalizeName(basePath);

    if (contextPathObj.id === basePathObj.id) {
      console.log('Navigate to the parent object path: ', contextPathObj);

      let parent = objectToPath(contextPathObj.parent);

      if (!parent) { parent = '/'; }

      this.router.navigate([parent]);
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

  activeContext(): ContextualComm {
    const contextualComm = this.contextualCommService.getActiveContext;

    if (contextualComm) {
      return contextualComm;
    } else {
      throw new Error('No Contextual Comm Active');
    }

  }

  getContext(name: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualCommList()
      .map(contexts => {
        const found = contexts.filter(context => filterContextsByName(name, context))[0];
        console.log('[ContextualCommData Service] - found: ', found);
        if (!found) {
          throw new Error('Context not found');
        }

        return found;
      });
  }

  getContextTask(id: string): Observable<ContextualComm[]> {
    return this.contextualCommService.getContextualComms()
      .map(contexts => contexts.find(context => context.id === id))
      .map(context => context ? context.contexts.filter(current => !current.id.includes('@')) : []);
  }

  getContextById(id: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualCommList()
      .map(contexts => {
        const found = contexts.filter(context => this.filterContextsById(id, context))[0]

        console.log('[ContextualCommData Service] - found: ', found);

        if (!found) {
          throw new Error('Context not found');
        }

        return found;
      });
  }

  getContextByResource(resource: string): Observable<ContextualComm> {
    return this.contextualCommService.getContextualCommList()
      .map(contexts => {
        return contexts.filter((context: ContextualComm) => {
          return context.url === resource;
        })[0];
      });
  }

  currentContext(): Observable<ContextualComm> {
    return this.contextualCommService.currentContext();
  }

  private filterContextsById(id: string, context: ContextualComm) {

    if (id.includes('@')) {
      const base = id.substr(0, id.lastIndexOf('/') + 1);
      const user = id.substr(id.lastIndexOf('/') + 1);
      const users = user.split('-');

      const variation1 = base + users[0] + '-' + users[1];
      const variation2 = base + users[1] + '-' + users[0];

      if (context.id === variation1) {
        id = variation1;
      } else if (context.id === variation2) {
        id = variation2;
      }
    }

    console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
    return context.id === id;
  }

  private findContextsById(id: string, context: ContextualComm) {

    console.log('AQII:', id);

    if (id.includes('@')) {
      const base = id.substr(0, id.lastIndexOf('/') + 1);
      const user = id.substr(id.lastIndexOf('/') + 1);
      const users = user.split('-');

      const variation1 = base + users[0] + '-' + users[1];
      const variation2 = base + users[1] + '-' + users[0];

      if (context.id === variation1) {
        id = variation1;
      } else if (context.id === variation2) {
        id = variation2;
      }
    }

    console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
    return context.id === id;
  }

  private findByOlderContext(context: ContextualComm, index: number, contexts: ContextualComm[]) {

    const result = contexts.reduce((acc, current: ContextualComm) => {

      const date1 = new Date(current.communication.created).getTime();
      const date2 = new Date(context.communication.created).getTime();

      if (date2 > date1) {
        return current;
      } else {
        return context;
      }

    })

    return result ? true : false;

  }

  private compareMetadata(communicationNew: Communication, communicationOld: Communication): Communication {

    const date1 = new Date(communicationNew.created).getTime();
    const date2 = new Date(communicationOld.created).getTime();

    if (date1 > date2) {
      return communicationOld;
    } else {
      return null
    }

  }

}
