import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

// Model
import { ContextualComm } from '../../models/models';

// Service
import { ContextService, MessageService, ChatService, RethinkService } from '../services';

@Injectable()
export class ContextualCommResolve implements Resolve<ContextualComm> {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService,
    private rethinkService: RethinkService,
    private contextService: ContextService
    ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ContextualComm> | Promise<ContextualComm> | ContextualComm {

    return new Promise((resolve, reject) => {

      let context = route.params['context'] 
      let task = route.params['id'];
      let user = route.params['user'];
      let name = context;

      if (context) {
        this.contextService.setContextPath = context;
      }

      if (task) {
        this.contextService.setTaskPath = task;

        name = task;
        context = this.contextService.getContextPath;
      }

      if (user) {
        name = user;
        context = this.contextService.getContextPath;
      }

      console.log('[Contextual Comm] Resolve: ', route.params, name, context);

      let participants:any = [];
      let domains:any =  [];

      this.chatService.create(name, participants, domains).then((chatController: any) => {
        console.log('Create chat service for all my contacts', chatController);
        return this.contextService.create(name, chatController.dataObject, context)
      }, (error) => {
        console.log('Error creating the context: ', error);
        reject(error);
      }).then((contextualComm:ContextualComm) => {
        this.contextService.getContextByName(name).then((contextualComm:ContextualComm) => {
          resolve(contextualComm);
        })
      });
    
    // TODO this is the correct way.. but we can't reuse the chatController
    // TODO the solution is implement the dataObject reusing;
/*    this.contextService.getContextByName(name).then((contextualComm:ContextualComm) => {
        resolve(contextualComm);
      }).catch((error) => {
        console.info('Creating the context ', name, context, ' chat group');
        this.chatService.create(name, [], []).then((chatController: any) => {
          console.log('Create chat service for all my contacts', chatController);
          return this.contextService.create(name, chatController.dataObject, context)
        }, (error) => {
          console.log('Error creating the context: ', error);
          reject(error);
        }).then((contextualComm:ContextualComm) => {
          resolve(contextualComm);
        })
      })*/

    })

  }

}
