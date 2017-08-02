import { Injectable, EventEmitter, Output } from '@angular/core';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';

import { User, Message } from '../../models/models';

@Injectable()
export class ChatService {

  public chatControllerActive: any;

  controllerList: Map<string, any> = new Map<string, any>();

  hyperty: any;
  hypertyURL: string;

  chatGroupManager: any;

  public onMessageEvent = new EventEmitter<Message>();

  private _onUserAdded: Function;
  private _onMessage: Function;
  private _discovery: any;

  private _activeDataObjectURL: string;
  public get activeDataObjectURL(): string {
    return this._activeDataObjectURL;
  }

  public set activeDataObjectURL(value: string) {
    console.log('[Chat Service] - setActiveController:', value, this.controllerList);
    this._activeDataObjectURL = value;
    this.chatControllerActive = this.controllerList.get(value);
    console.info('[Chat Service] - active controller: ', this.chatControllerActive);
  }

  @Output() onInvitation: EventEmitter<any> = new EventEmitter();

  constructor(
    private rethinkService: RethinkService,
    private contextualCommService: ContextualCommService,
    private contactService: ContactService
  ) {}

  private _updateControllersList(dataObjectURL: string, chatController: any) {

    this.prepareController(chatController);

    this.controllerList.set(dataObjectURL, chatController);
    console.log('[Chat Service - Update Controller List] - ', chatController, this.controllerList);

  }

  getHyperty() {

    return new Promise((resolve, reject) => {

      this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/GroupChatManager';

      console.log('[Chat Service - getHyperty] - ', this.chatGroupManager);

      if (!this.chatGroupManager) {
        this.rethinkService.getHyperty(this.hypertyURL)
        .then((hyperty: any) => {
          this.chatGroupManager = hyperty.instance;
          this._discovery = this.chatGroupManager.discovery;
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

      this.onInvitation.emit(event);

    });

  }

  prepareController(chatController: any) {

    console.log('[Chat Service - prepareController]', chatController);

    chatController.onUserAdded((user: any) => {
      const dataObjectURL = chatController.dataObject.url;

      console.log('[Chat Service - prepareController] - onUserAdded', chatController, user, dataObjectURL);
      let current: User;
      const userInfo: any = {};

      if (user.hasOwnProperty('data')) {
        current = this.contactService.getUser(user.data.identity.userProfile.userURL);
        userInfo.domain = user.data.domain;
        userInfo.idp = user.data.identity.idp;
        Object.assign(userInfo, user.data.identity.userProfile);
      } else {
        current = this.contactService.getUser(user.identity.userProfile.userURL);
        userInfo.domain = user.domain;
        userInfo.idp = user.identity.idp;
        Object.assign(userInfo, user.identity.userProfile);
      }

      if (!current) { current = new User(userInfo); }

      console.log('[Chat Service - prepareController] - current user:', userInfo, current);
      this.contextualCommService.updateContextUsers(current, dataObjectURL);
    });


    chatController.onMessage((message: any) => {

      console.log('[Chat Service - prepareController] - onMessage', message, this.chatControllerActive);

      const dataObjectURL = chatController.dataObject.url;
      const user: User = this.contactService.getUser(message.identity.userProfile.userURL);

      if (user) {
        const msg = {
          type: 'message',
          message: message.value.content,
          user: user
        };

        const currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);

        this.onMessageEvent.emit(currentMessage);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    });

    // this._updateControllersList(chatController.dataObject.url, chatController);
  }

  create(name: string, users: string[], domains: string[]) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, users, domains).then((chatController: any) => {

        console.log('[Chat Created]', chatController);

        this._updateControllersList(chatController.dataObject.url, chatController);


        this.prepareHyperty();

        resolve(chatController);
      }).catch((reason: any) => {
        reject(reason);
      });

    });

  }

  /**
   *
   *
   * @param {object} event
   * @returns {*}
   *
   * @memberof ChatService
   */
  join(url: any): any {

    return new Promise((resolve, reject) => {

      console.log('[Chat Service - Join] - event: ', event);

      this.chatGroupManager.join(url).then((chatController: any) => {

        const dataObject = chatController.dataObject;

        this._updateControllersList(dataObject.url, chatController);

        resolve(dataObject);

      });

    });

  }

  invite(dataObjectURL: string, listOfEmails: String[], listOfDomains: String[]): Promise<any> {

    console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
    console.log('[Chat Service - invite]: ', this.controllerList, dataObjectURL, this.controllerList.get(dataObjectURL));

    const currentController = this.controllerList.get(dataObjectURL);

    return currentController.addUser(listOfEmails, listOfDomains);

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('[Chat Service - Send Message]', this.chatControllerActive, message);

      this.chatControllerActive.send(message).then((result: any) => {

        console.log('[Chat Service - Sended Message]', message, result, this.chatControllerActive);
        const user: User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        const msg = {
          type: 'message',
          message: result.value.content,
          user: user
        };

        const currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, this.chatControllerActive.dataObject.url);
        resolve(currentMessage);
      }).catch(reject);

    });

  }

  discovery() {
    return this._discovery;
  }

  onUserAdded(callback: Function) {
    this._onUserAdded = callback;
  }

  onMessage(callback: Function) {
    this._onMessage = callback;
  }

}
