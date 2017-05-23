import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';

import { User, Message } from '../../models/models';

@Injectable()
export class UserAvailabilityService {

  /*public chatControllerActive: any;

  private controllerList: Map<string, any> = new Map<string, any>();*/

  hyperty: any;
  hypertyURL: string;

  myAvailabilityReporter: any;
  myAvailability: any;

  /*private _onUserAdded: Function;
  private _onInvitation: Function;
  private _onMessage: Function;
  private _discovery: any;*/

  /*private _activeDataObjectURL: string;
  public get activeDataObjectURL(): string {
    return this._activeDataObjectURL;
  }

  public set activeDataObjectURL(value: string) {
    console.log('[Chat Service] - active controller:', value, this.controllerList);
    this._activeDataObjectURL = value;
    this.chatControllerActive = this.controllerList.get(value);
    console.info('[Chat Service] - active controller: ', this.chatControllerActive);
  }*/

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rethinkService: RethinkService
   ) {       
    console.log('[UserAvailability Service - constructor] - ');

      this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityReporter';
    
      this.rethinkService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.myAvailabilityReporter = hyperty.instance;
          console.log('[UserAvailability Service - getHyperty] hyperty was instantiated ', this.myAvailabilityReporter);
          //this._discovery = this.chatGroupManager.discovery;
          this.hyperty = hyperty;
          this.myAvailabilityReporter.start().then((availability: any) => {
            this.myAvailability = availability;

          });
       });
   }



  setStatus(status: string) {

    console.log('[UserAvailability service. setStatus]', status);

    this.myAvailabilityReporter.setStatus(status);
 
  }
  /*prepareHyperty() {

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
      console.log('[Chat Service - prepareHyperty] - onInvitation', event, this._onInvitation);
      if (this._onInvitation) { this._onInvitation(event); }
    });

  }*/

  /*prepareController(chatController: any) {

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
      this.contextualCommService.updateContextUsers(current, dataObjectURL);
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
        this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    });

  }*/

  


/*  onSubscription(callback: Function) {
    this._onInvitation = callback;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

  onMessage(callback: Function) {
    this._onMessage = callback;
  }*/

}
