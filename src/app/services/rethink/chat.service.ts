import { Injectable, EventEmitter, Output } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { concat } from 'rxjs/operator/concat';

// Services
import { RethinkService } from './rethink.service';
import { ContactService } from '../contact.service';
import { ContextualCommService } from '../contextualComm.service';

import { User, Message, Resource } from '../../models/models';
import { HypertyResourceType, HypertyResource, HypertyResourceDirection } from '../../models/rethink/HypertyResource';

import { isEmpty } from '../../utils/utils';

import { MediaModalType } from '../../components/modal/interfaces/mediaModal.type';
import { ProgressEvent, ProgressEventType, UserAdded, InvitationEvent } from '../../models/app.models';

@Injectable()
export class ChatService {

  public chatControllerActive: any;

  controllerList: Map<string, any> = new Map<string, any>();
  resourceList: Map<string, any> = new Map<string, any>();

  hyperty: any;
  hypertyURL: string;

  chatGroupManager: any;

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

  @Output() onMessageEvent = new EventEmitter<Message>();

  // TODO: should be created an interface to handle the userAdded with controller and user;
  // something like: { controller: chatController, user: User }
  @Output() onUserAdded = new EventEmitter<UserAdded>();

  @Output() onInvitation: EventEmitter<any> = new EventEmitter();
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() onInvitationResponse: EventEmitter<InvitationEvent> = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
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

    this.chatGroupManager.onResumeReporter((controllers: any) => this._processResume(controllers));

    this.chatGroupManager.onResumeObserver((controllers: any) => this._processResume(controllers));

    this.chatGroupManager.onInvitation((event: any) => {

      console.log('[Chat Service - OnInvitation] - ', event);

      this.onInvitation.emit(event);

    });

  }

  _processResume(controllers: any) {

    console.log('[Chat Service - prepareHyperty] - onResume dataObjects: ', controllers);

    Object.keys(controllers).forEach((url: string) => {

      const current = controllers[url];
      const childrens = current.messages

      if (!isEmpty(childrens)) { this._processResources(childrens) }

      this.controllerList.set(url, current);
      this._updateControllersList(url, current);

    });
  }

  _processResources(childrens: any) {
    Object.keys(childrens).forEach(children => this.resourceList.set(children, childrens[children]) );
  }

  prepareController(chatController: any) {

    console.log('[Chat Service - prepareController]', chatController);

    chatController.onInvitationResponse((result: any) => {

      console.log('On Response to Invitation:', result);

      const url: string = chatController.dataObject.url;

      if (result.hasOwnProperty('code')) {

        switch (result.code) {

          case 200: {
            this.onInvitationResponse.emit({
              type: 'success',
              code: result.code,
              url: url
            })
            break;
          }

          case 401:
          case 406: {
            /*const found = this.controllerList.get(url);
            console.log('Close Chat:', found);
            found.close();*/
            break;
          }

          default:
            this.onInvitationResponse.emit({
              type: 'unknown',
              code: result.code,
              url: url
            })
            break;

        }

      }

    });

    chatController.onUserAdded((event: any) => {

      const user: any = event.data || event;

      const current: any = JSON.parse(JSON.stringify(user));

      const e: UserAdded = {
        controller: chatController,
        user: current
      }

      this.onUserAdded.emit(e);

    });

    chatController.onMessage((message: any) => {

      console.log('[Chat Service - prepareController] - onMessage', message, this.chatControllerActive);

      const dataObjectURL = chatController.dataObject.url;
      const user: User = this.contactService.getUser(message.identity.userProfile.userURL);

      if (user) {

        let msg;

        if (message.child.metadata.resourceType === HypertyResourceType.File) {

          msg = {
            type: HypertyResourceType.File,
            message: message.child.metadata,
            user: user
          };

          const resource: Resource = {
            type: message.child.metadata.resourceType,
            direction: HypertyResourceDirection.IN,
            content: message.child.metadata,
            contentURL: message.child.metadata.contentURL,
            mimetype: message.child.metadata.mimetype,
            size: message.child.metadata.size,
            preview: message.child.metadata.preview,
            author: message.identity.userProfile.userURL
          };

          this.resourceList.set(message.child.childId, message.child);

          const currentResource = new Resource(resource);
          this.contextualCommService.updateContextResources(currentResource, dataObjectURL);

        } else {

          msg = {
            type: HypertyResourceType.Chat,
            message: message.value.content,
            user: user
          };

        }

        const currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);

        this.onMessageEvent.emit(currentMessage);
      } else {
        console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
      }
    });

    chatController.onClose((event: any) => {
      this.onCloseEvent.emit(event);
    })

    // this._updateControllersList(chatController.dataObject.url, chatController);
  }

  create(name: string, invitingUsers: any[], contextInfo?: any) {

    return new Promise((resolve, reject) => {

      this.chatGroupManager.create(name, invitingUsers, contextInfo).then((chatController: any) => {

        console.log('[Chat Created]', chatController);

        this._updateControllersList(chatController.dataObject.url, chatController);


        this.prepareHyperty();

        resolve(chatController);
      }).catch((reason: any) => {
        reject(reason);
      });

    });

  }

  controllerUserAdded(chatController: any, user: any) {
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

    if (!current) {
      current = new User(userInfo);
    }

    console.log('[Chat Service - prepareController] - current user:', userInfo, current);
    this.contextualCommService.updateContextUsers(current, dataObjectURL);
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

      console.log('[Chat Service - Join] - event: ', url);

      this.chatGroupManager.join(url).then((chatController: any) => {

        const dataObject = chatController.dataObject;

        this._updateControllersList(dataObject.url, chatController);

        resolve(dataObject);

      }).catch((reason: any) => {
        console.error('REASON: ', reason);
        reject(reason);
      })

    });

  }

  invite(dataObjectURL: string, invitingUsers: any[]): Promise<any> {

    return new Promise((resolve, reject) => {

      console.log('[Invite]', invitingUsers);
      console.log('[Chat Service - invite]: ', this.controllerList, dataObjectURL, this.controllerList.get(dataObjectURL));

      const currentController = this.controllerList.get(dataObjectURL);

      return currentController.addUser(invitingUsers)
        .then((result: any) => {
          console.log('[Chat Service - invite]: ', result);
          resolve(currentController)
        })
        .catch((reason: any) => {
          console.log('[Chat Service - invite]: ', reason);
          reject(reason);
        });

    });

  }

  send(message: string) {

    return new Promise<any>((resolve, reject) => {

      console.log('[Chat Service - Send Message]', this.chatControllerActive, message);

      this.chatControllerActive.send(message).then((result: any) => {

        console.log('[Chat Service - Sended Message]', message, result, this.chatControllerActive);
        const user: User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        const msg = {
          type: HypertyResourceType.Chat,
          message: result.value.content,
          user: user
        };

        const currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, this.chatControllerActive.dataObject.url);
        resolve(currentMessage);
      }).catch(reject);

    });

  }

  sendFile(file: File) {

    return new Promise<any>((resolve, reject) => {

      console.log('[Chat Service - Send File]', this.chatControllerActive, file);

      this.chatControllerActive.sendFile(file).then((result: any) => {

        console.log('[Chat Service - Sended File]', file, result, this.chatControllerActive);
        const user: User = this.contactService.getUser(result.identity.userProfile.userURL);
        console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);

        const resource: Resource = {
          type: result.value.metadata.resourceType,
          direction: HypertyResourceDirection.OUT,
          content: result.value.metadata,
          contentURL: result.value.metadata.contentURL,
          mimetype: result.value.metadata.mimetype,
          size: result.value.metadata.size,
          preview: result.value.metadata.preview,
          author: result.identity.userProfile.userURL
        };

        this.resourceList.set(result.resource.childId, result.resource);

        const msg = {
          type: result.value.metadata.resourceType,
          message: result.value.metadata,
          user: user
        };

        const currentMessage = new Message(msg);
        this.contextualCommService.updateContextMessages(currentMessage, this.chatControllerActive.dataObject.url);

        const currentResource = new Resource(resource);
        this.contextualCommService.updateContextResources(currentResource, this.chatControllerActive.dataObject.url);
        resolve(currentResource);

      }).catch(reject);
    });

  }


  close(url: string): Promise<boolean> {

    const found = this.controllerList.get(url);

    console.log('Close Chat:', this.controllerList);
    return found.close().then((result: any) => this.controllerList.delete(url))

  }

  discovery() {
    return this._discovery;
  }

  readResource(data: any, progressEvent: EventEmitter<ProgressEvent>): Promise<any> {

    return new Promise((resolve, reject) => {

      const resource: any = this.resourceList.get(data.url);

      // TODO: check why sometimes the identity comes empty;
      const identity: User = JSON.parse(JSON.stringify(resource.identity.userProfile));
      const user = this.contactService.getUser(identity.userURL);

      progressEvent.emit({
        resource: data.url,
        type: ProgressEventType.START
      });

      resource.read((progress: any) => {
        console.log('[ContextualComm Activity Progress: ', progress);

        progressEvent.emit({
          resource: data.url,
          type: ProgressEventType.UPDATE,
          value: progress
        });

      }).then((result: any) => {

        const title = result.metadata.name;
        const size = result.metadata.size;
        const mimetype = result.metadata.mimetype;
        const content = result.content;

        let type = mimetype;
        let mediaContentURL: SafeUrl

        // TODO: improve the mimetype discovery
        if (mimetype.includes('image') ) {
          type = 'image';
        } else if (mimetype.includes('video')) {
          type = 'video';
        } else {
          type = 'file';
        }

        try {
          let blob;

          if (Array.isArray(content)) {
            blob = new Blob(content, { type: mimetype });
          } else {
            blob = new Blob([content], { type: mimetype });
          }

          const secureBlob = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          mediaContentURL = secureBlob;

          const media: MediaModalType = {
            title: title,
            size: size,
            type: type,
            user: user,
            mimetype: mimetype,
            mediaContentURL: mediaContentURL
          }

          resolve(media);

          progressEvent.emit({resource: data.url, type: ProgressEventType.END });

        } catch (error) {
          progressEvent.emit({resource: data.url, type: ProgressEventType.ERROR });
          reject(error);
        }

      }).catch((reason: any) => {
        console.log('ERROR READING FILE:', reason);
        progressEvent.emit({resource: data.url, type: ProgressEventType.ERROR, description: reason });
        reject(reason);
      })

    })
  }

}
