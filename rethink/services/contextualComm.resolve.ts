import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

// Model
import { ContextualComm } from '../models/models';

// Service
import { ContextService, MessageService, ChatService } from './services';

@Injectable()
export class ContextualCommResolve implements Resolve<ContextualComm> {

  constructor(
    private contextService: ContextService,
    private chatService: ChatService,
    private messageService: MessageService,
    private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ContextualComm> | Promise<ContextualComm> | ContextualComm {

    let context = route.params['context'] 
    let task = route.params['id'];
    let name = context;

    this.contextService.setContextPath = context;
    this.contextService.setTaskPath = task;

    if (task) {
      name = task; 
    }

    return new Promise((resolve, reject) => {

      // FIX this is to remove is temporary
      let participants:any = [];
      let domains:any =  [];
      if (name === 'work') {
        participants.push('openidtest10@gmail.com');
        domains.push('hybroker.rethink.ptinovacao.pt')
      } else if (name === 'team1') {
        participants.push('openidtest20@gmail.com');
        domains.push('hybroker.rethink.ptinovacao.pt')
      }

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
