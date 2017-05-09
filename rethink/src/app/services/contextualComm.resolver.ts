import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

// Model
import { ContextualComm } from './../models/models';

import { ContextualCommService } from './contextualComm.service';

// Service
import { ChatService, RethinkService } from './services';

@Injectable()
export class ContextualCommResolver implements Resolve<ContextualComm> {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private rethinkService: RethinkService,
    private ContextualCommService: ContextualCommService
    ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let context = route.params['trigger'];
      let task = route.params['id'];
      let user = route.params['user'];

      let participants: any = [];
      let domains: any =  [];

      console.log('[ContextualCommResolver - resolve] - ', route);
      console.log('[ContextualCommResolver - resolve] - ', 'Context: ', context,  'Task: ', task,  'User: ', user);

      let name = context;
      this.ContextualCommService.setContextPath = context;

      if (task) {
        this.ContextualCommService.setTaskPath = task;
        name = task;
        context = route.parent.params['trigger'];
      }

      if (user) {
        name = this.rethinkService.getCurrentUser.username + '-' + user;
        context = route.parent.params['trigger'];
      }

      console.info('[ContextualCommResolver - resolve] - Getting the current Context ', name, context);

      this.ContextualCommService.getContextByName(name).then((contextualComm: ContextualComm) => {
        console.info('[ContextualCommResolver - resolve] - current context ', name, contextualComm);

        this.ContextualCommService.activeContext = contextualComm.url;
        this.chatService.activeDataObjectURL = contextualComm.url;

        resolve(contextualComm);
      }).catch((error) => {
        console.error('error:', error);

        if (user) {
          name = this.rethinkService.getCurrentUser.username + '-' + user;
          participants.push(user);
        }

        console.info('[ContextualCommResolver - resolve] - Creating the context ', name, context, ' chat group');

        this.chatService.create(name, participants, domains).then((chatController: any) => {
          console.log('Create chat service for all my contacts', chatController);
          return this.ContextualCommService.create(name, chatController.dataObject, context);
        }, (error) => {
          console.log('Error creating the context: ', error);
          reject(error);
        }).then((contextualComm: ContextualComm) => {

          this.ContextualCommService.activeContext = contextualComm.url;
          this.chatService.activeDataObjectURL = contextualComm.url;

          resolve(contextualComm);
        });
      });

    });

  }

}
