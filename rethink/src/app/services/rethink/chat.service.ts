import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextService } from '../rethink/context.service';

import { User, Message } from '../../models/models';

@Injectable()
export class ChatService {

  controllerList:Map<string, any> = new Map<string, any>();
  chatControllerActive: any;

  hyperty: any;
  hypertyURL: string;

  chatGroupManager: any;

  private runtime: any
  private _onUserAdded:Function
  private _onMessage:Function
  private _onInvitation:Function

  constructor(
    private appService: RethinkService,
    private contextService: ContextService,
    private contactService: ContactService
  ) {
  }

  private _updateControllersList(dataObjectURL:string, chatController:any) {

    this.controllerList.set(dataObjectURL, chatController);
    this.prepareController(chatController);

    this.chatControllerActive = this.controllerList.get(dataObjectURL);

  }

  setActiveController(dataObjectURL:string):void {
    console.log('[Chat Service] - setActiveController: ', dataObjectURL, this.controllerList, this.controllerList.get(dataObjectURL));
    this.chatControllerActive = this.controllerList.get(dataObjectURL);
  } 

  getHyperty() {

    return new Promise((resolve, reject) => {

      this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/GroupChatManager'

      console.log('[Chat Service - getHyperty] - ', this.chatGroupManager);

      if (!this.chatGroupManager) {
        this.appService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.chatGroupManager = hyperty.instance;
          this.hyperty = hyperty
          this.prepareHyperty();
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

  prepareHyperty() {

    console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);

    this.chatGroupManager.onResume((controllers:any) => {
      console.log('[Chat Service - prepareHyperty] - onResume: ', controllers);

      Object.keys(controllers).forEach((url:string) => {

        this.controllerList.set(url, controllers[url]);        
        this._updateControllersList(url, controllers[url]);

      })

    });

    this.chatGroupManager.onInvitation((event:any) => {
      console.log('[Chat Service - prepareHyperty] - onInvitation', event);
      
      this.join(event.url).then(a => {

      }).catch(reason => {
        console.log(reason);
      })

      if (this._onInvitation) this._onInvitation(event);
    })

  }

  prepareController(chatController:any) {

    console.log('[Chat Service - prepareController]', chatController);

    chatController.onUserAdded((user:any) => {
      let dataObjectURL = chatController.dataObject.url;

      console.log('[Chat Service - prepareController] - onUserAdded', user, dataObjectURL);
      let current:User;

      if (user.hasOwnProperty('data')) {
        current = this.contactService.getUser(user.data.userURL);
        if (!current) { current = new User(user.data); }
      } else {
        current = this.contactService.getUser(user.userURL);
        if (!current) { current = new User(user); }
      }

      console.log('[Chat Service - prepareController] - current user:', current);
      this.contextService.updateContextUsers(current, dataObjectURL);
    })


    chatController.onMessage((message: any) => {

      let dataObjectURL = chatController.dataObject.url;
      let user:User = this.contactService.getUser(message.identity.userProfile.userURL);

      console.log('[Chat Service - prepareController] - onMessage', dataObjectURL, message, chatController);

      if (user) {
        let msg = {
          type: 'message',
          message: message.value.message,
          user: user
        };

        let currentMessage = new Message(msg);
        this.contextService.updateContextMessages(currentMessage, dataObjectURL);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    })

  }

  create(name: string, users:string[], domains:string[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {

        this._updateControllersList(chatController.dataObject.url, chatController);

        console.log('[Chat Created]', chatController)

        this.prepareHyperty();

        resolve(chatController);
      }).catch((reason: any) => {
        reject(reason);
      });

    })

  }

  join(resource: string) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.join(resource).then((chatController: any) => {

        this._updateControllersList(chatController.dataObject.url, chatController);
        console.log('[Joined Chat]', chatController)

        let chatName:string = chatController.dataObject.data.name;

        this.contextService.create(chatName, chatController.dataObject).then((result:any) => {
          this.prepareHyperty();

          resolve(chatController)
        })
      })

    })

  }

  invite(listOfEmails:String[], listOfDomains:String[]) {

    return new Promise((resolve, reject) => {

      console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
      console.log('[Chat Service - invite]: ', this.chatControllerActive);

      this.chatControllerActive.addUser(listOfEmails, listOfDomains).then((result: any) => {
        console.log('[Invite Chat]', result);
        resolve(this.chatControllerActive)
      }).catch((reason:any) => {
        console.error('Error on invite:', reason);
      })

    })

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('Send message: ', this.chatControllerActive, message);

      this.chatControllerActive.send(message).then((result:any) => {

        console.log('[Chat Service - Sended Message]', message, result, this.chatControllerActive);
        let user:User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        let msg = {
          type: 'message',
          message: result.value.message,
          user: user
        };

        let currentMessage = new Message(msg);
        this.contextService.updateContextMessages(currentMessage, this.chatControllerActive.dataObject.url);
        resolve(currentMessage);
      }).catch(reject);

    })

  }

  onInvitation(callback: Function) {
    // this.hypertyChat.onInvitation(callback);
    this._onInvitation = callback;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

}