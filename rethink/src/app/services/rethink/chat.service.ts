import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';
import { ContextualCommTriggerService } from '../contextualCommTrigger.service';

import { ContextualComm, User, Message } from '../../models/models';

@Injectable()
export class ChatService {

  public chatControllerActive: any;

  private controllerList: Map<string, any> = new Map<string, any>();

  hyperty: any;
  hypertyURL: string;

  chatGroupManager: any;

  private _onUserAdded: Function;
  private _onInvitation: Function;

  private _activeDataObjectURL: string;
  public get activeDataObjectURL(): string {
    return this._activeDataObjectURL;
  }

  public set activeDataObjectURL(value: string) {
    console.log('[Chat Service] - active controller:', value, this.controllerList);
    this._activeDataObjectURL = value;
    this.chatControllerActive = this.controllerList.get(value);
    console.info('[Chat Service] - active controller: ', this.chatControllerActive);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rethinkService: RethinkService,
    private ContextualCommService: ContextualCommService,
    private ContextualCommServiceTrigger: ContextualCommTriggerService,
    private contactService: ContactService
  ) {

    // this.route.params.subscribe((params) => {

    //   let selected = params['trigger'] || route.params['id'];

    //   console.log('[Chat Service] - route changes:', selected);

    //   if (route.params['user']) {
    //     selected = this.rethinkService.getCurrentUser.username + '-' + route.params['user'];
    //   }

    //   if (selected) {

    //     console.log('[Chat Service] - route selected:', selected);

    //     this.ContextualCommService.getContextByName(selected).then((contextualComm: ContextualComm) => {
    //       let dataObjectURL = contextualComm.url;
    //       this.chatControllerActive = this.controllerList.get(dataObjectURL);
    //     });

    //   }

    // });

  }

  private _updateControllersList(dataObjectURL: string, chatController: any) {

    this.controllerList.set(dataObjectURL, chatController);
    this.prepareController(chatController);

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/GroupChatManager';

      console.log('[Chat Service - getHyperty] - ', this.chatGroupManager);

      if (!this.chatGroupManager) {
        this.rethinkService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.chatGroupManager = hyperty.instance;
          this.hyperty = hyperty;
          this.prepareHyperty();
          resolve(this.hyperty);
        })
        .catch((reason) => {
          console.error(reason);
          reject(reason);
        });
      } else {
        resolve(this.hyperty);
      }

    });

  }

  prepareHyperty() {

    console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);

    this.chatGroupManager.onResumeReporter((controllers: any) => {
      console.log('[Chat Service - prepareHyperty] - onResume reporters: ', controllers);

      Object.keys(controllers).forEach((url: string) => {

        this.controllerList.set(url, controllers[url]);
        this._updateControllersList(url, controllers[url]);

      });

    });

    this.chatGroupManager.onResumeObserver((controllers: any) => {
      console.log('[Chat Service - prepareHyperty] - onResume observers: ', controllers);

      Object.keys(controllers).forEach((url: string) => {

        this.controllerList.set(url, controllers[url]);
        this._updateControllersList(url, controllers[url]);

      });

    });

    this.chatGroupManager.onInvitation((event: any) => {
      console.log('[Chat Service - prepareHyperty] - onInvitation', event);

      this.join(event.url).then(a => {

      }).catch(reason => {
        console.log(reason);
      });

      if (this._onInvitation) { this._onInvitation(event); }

    });

  }

  prepareController(chatController: any) {

    console.log('[Chat Service - prepareController]', chatController);

    chatController.onUserAdded((user: any) => {
      let dataObjectURL = chatController.dataObject.url;

      console.log('[Chat Service - prepareController] - onUserAdded', user, dataObjectURL);
      let current: User;

      if (user.hasOwnProperty('data')) {
        current = this.contactService.getUser(user.data.identity.userURL);
        if (!current) { current = new User(user.data.identity); }
      } else {
        current = this.contactService.getUser(user.userURL);
        if (!current) { current = new User(user); }
      }

      console.log('[Chat Service - prepareController] - current user:', current);
      this.ContextualCommService.updateContextUsers(current, dataObjectURL);
    });


    chatController.onMessage((message: any) => {

      console.log('[Chat Service - prepareController] - onMessage', message, this.chatControllerActive);

      let dataObjectURL = chatController.dataObject.url;
      let user: User = this.contactService.getUser(message.identity.userProfile.userURL);

      if (user) {
        let msg = {
          type: 'message',
          message: message.value.content,
          user: user
        };

        let currentMessage = new Message(msg);
        this.ContextualCommService.updateContextMessages(currentMessage, dataObjectURL);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    });

  }

  create(name: string, users: string[], domains: string[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {

        this._updateControllersList(chatController.dataObject.url, chatController);

        console.log('[Chat Created]', chatController);

        this.prepareHyperty();

        resolve(chatController);
      }).catch((reason: any) => {
        reject(reason);
      });

    });

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.join(resource).then((chatController: any) => {

        let dataObject = chatController.dataObject;

        this._updateControllersList(dataObject.url, chatController);

        this.verifyOrCreateContextualComm(dataObject).then((result) => {
          resolve(chatController);
        });

      });

    });

  }

  invite(listOfEmails: String[], listOfDomains: String[]) {

    return new Promise((resolve, reject) => {

      console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
      console.log('[Chat Service - invite]: ', this.chatControllerActive);

      this.chatControllerActive.addUser(listOfEmails, listOfDomains).then((result: any) => {
        console.log('[Invite Chat]', result);
        resolve(this.chatControllerActive);
      }).catch((reason: any) => {
        console.error('Error on invite:', reason);
      });

    });

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('[Chat Service - Send Message]', this.chatControllerActive, message);

      this.chatControllerActive.send(message).then((result: any) => {

        console.log('[Chat Service - Sended Message]', message, result, this.chatControllerActive);
        let user: User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        let msg = {
          type: 'message',
          message: result.value.content,
          user: user
        };

        let currentMessage = new Message(msg);
        this.ContextualCommService.updateContextMessages(currentMessage, this.chatControllerActive.dataObject.url);
        resolve(currentMessage);
      }).catch(reject);

    });

  }

  onInvitation(callback: Function) {
    // this.hypertyChat.onInvitation(callback);
    this._onInvitation = callback;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }


  verifyOrCreateContextualComm(dataObject: any): Promise<ContextualComm> {

    return new Promise((resolve, reject) => {

      let resource = dataObject.data.url;
      let contextTrigger = this.ContextualCommServiceTrigger.activeContextTrigger;
      let name = dataObject.data.name;

      console.log('[Chat Service] - verifyOrCreateContextualComm: ', dataObject);

      this.ContextualCommService.getContextByResource(resource).then((contextualComm: ContextualComm) => {
        console.info('[Chat Service] - Getting the current Context ', name, contextualComm);
        resolve(contextualComm);
      }).catch((error) => {
        console.error('error:', error);
        console.info('[Chat Service] - Creating the context ', name, contextTrigger, ' chat group');
        this.ContextualCommService.create(name, dataObject, contextTrigger).then((contextualComm: ContextualComm) => {
          resolve(contextualComm);
        }).catch((error) => {
          console.log('Error creating the context: ', error);
          reject(error);
        });
      });
    });

  }

}
