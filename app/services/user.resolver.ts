import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

// Model
import { User, ContextualComm } from '../models/models';

// Service
import { ContactService, RethinkService, ChatService, ContextService, MessageService } from './services';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private rethinkService: RethinkService,
    private chatService: ChatService,
    private messageService: MessageService,
    private contextService: ContextService,
    private contactService: ContactService,
    private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot):Promise<User> {

    return new Promise((resolve, reject) => {
      let selectedUser = route.params['user'];
      console.log(selectedUser);
      let user:User = this.contactService.getByUserName(selectedUser);

      if (user) resolve(user);
      else reject('no user found');
    })

    /*let userURL:string = route.params['user'];

    console.log('[User] Resolve: ', userURL, route );

    // TODO: check why the Observable don't work;
    return new Promise((resolve, reject) => {

      // let user:User = this.contactService.getContact(userURL);
      let name: string = user.userURL;
      let context: string = this.contextService.getContextPath;
      let task: string = this.contextService.getTaskPath;

      let parent: string = context;

      if (task) {
        parent = task;
      }

      this.chatService.create(name, [user.userURL], [user.domain]).then((chatController: any) => {
        console.log('Create chat service for all my contacts', chatController);
        return this.contextService.create(name, chatController.dataObject, parent)
      }, (error) => {
        console.log('Error creating the context: ', error);
        reject(error);
      }).then((contextualComm:ContextualComm) => {
        this.contextService.getContextByName(name).then((contextualComm:ContextualComm) => {

          this.messageService.setMessages(contextualComm.messages);

          resolve(user);
        })
      });

    });
*/
  }

}