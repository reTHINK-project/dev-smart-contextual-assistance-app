import { Resolve } from '@angular/router';
// Rethink Interfaces
import { HypertyResourceType, HypertyResource, HypertyResourceDirection } from './rethink/HypertyResource';
import { Communication } from './rethink/Communication';
import { ContextValue } from './rethink/Context';
import { UserIdentity } from './rethink/UserIdentity';

import { isALegacyUser } from '../utils/utils';

import { config } from '../../app/config';

export interface InvitationEvent {
  ack: Function;
  domain: string;
  from: string; // should be an url
  identity: any; // should be an Identity with domain and userProfile
  schema: string;
  type: string;
  url: string;
  value: any;
}

export class User implements UserIdentity {

  guid: string;
  identifiers: string;
  idp: string;

  email: string;
  name: string;
  picture: string;
  locale: string;
  userURL: string;

  status: string;
  statustUrl: string;

  unread: number;
  domain: string;

  isLegacy: boolean;

  // email: "vitorsilva@boldint.com"
  // email_verified: true
  // family_name: "Silva"
  // given_name: "Vitor"
  // hd: "boldint.com"
  // locale: "en"
  // name: "Vitor Silva"
  // picture: "https://lh4.googleusercontent.com/-XCRAb8jSTIU/AAAAAAAAAAI/AAAAAAAAAB0/6FBI8MCBXDU/photo.jpg"
  // preferred_username: "vitorsilva"
  // sub: "115897973163620220925"
  // userURL: "user://google.com/vitorsilva@boldint.com"

  constructor(obj: any) {
    this.email    = obj && obj.email;
    this.name       = obj && obj.name;
    this.picture   = obj && obj.picture;
    this.locale   = obj && obj.locale;
    this.userURL  = obj && obj.userURL;
    this.status   = obj && obj.status   || 'unavailable';
    this.unread   = obj && obj.unread   || 0;
    this.domain   = obj && obj.domain   || config.domain;

    this.isLegacy = false;

    this.identifiers = '';

    // TODO: this should be removed
    if (!this.email.includes('@')) { this.isLegacy = true; }

    // TODO: split by the @ from user and domain <domain>@<identifier>
    this.guid     = this.email;
  }

  startStatusObservation(availability: any) {
    console.log('[UserModel.startStatusObservation] ', availability);

    this.statustUrl = availability.url;

    this.status = availability.data.values[0].value;

    availability.onChange('*', (event: any) => {
      console.log('[UserModel] Availability change', event.data);
      this.status = availability.data.values[0].value;

      console.log('[UserModel] Availability change', this);
    });

  }

}

export class Message {
  type: string;
  message: any;
  user: User;
  date: Date;
  isRead: boolean;

  constructor(obj: any) {
    this.isRead           = false;
    this.type             = obj && obj.type;
    this.message          = obj && obj.message;
    this.user             = obj && obj.user;
    this.date             = obj && obj.date || new Date().toISOString();
  }
}

export class Resource {

  type: HypertyResourceType;
  direction?: HypertyResourceDirection;
  author?: string;
  content?: any;
  contentURL?: string;
  preview?: string;
  mimetype?: string;
  size?: number;
  player?: string;

  constructor(obj: Resource ) {

    try {
      this.type = obj.type;
      this.direction = obj.direction ? obj.direction : HypertyResourceDirection.IN;

      if (obj.author) { this.author = obj.author }
      if (obj.content) { this.content = obj.content }
      if (obj.contentURL) { this.contentURL = obj.contentURL }
      if (obj.preview) { this.preview = obj.preview }
      if (obj.mimetype) { this.mimetype = obj.mimetype }
      if (obj.size) { this.size = obj.size }
      if (obj.player) { this.player = obj.player }

    } catch (error) {
      throw error;
    }

  }

}

export interface ContextualCommEvent {
  type: 'add' | 'update' | 'remove' | 'error';
  contextualComm: ContextualComm;
}

export class ContextualComm {

  id: string;
  url: string;
  name: string;
  description?: string;

  reporter: boolean;

  // TODO this should not be optional
  communication?: Communication;
  context?: string;

  messages?: Message[];
  resources?: Resource[];

  parent?: string;
  contexts?: ContextualComm[];
  users?: User[];
  icon?: string;

  constructor(obj: any) {
    this.id                = obj && String(obj.id).toLowerCase();
    this.url               = obj && obj.url;
    this.name              = obj && String(obj.name).toLowerCase();
    this.description       = obj && obj.description;

    this.communication     = obj && obj.communication;
    this.context           = obj && obj.context;

    this.contexts          = obj && obj.contexts      || [];
    this.users             = obj && obj.users         || [];
    this.messages          = obj && obj.messages      || [];
    this.resources         = obj && obj.resources     || [];

    this.icon              = obj && obj.icon          || '';

    this.reporter          = obj && obj.reporter      || false;

    this.parent            = obj && obj.parent;
    console.log('[Models - ContextualComm] - constructor: ', this.users);

    this.users = this.users.map((user) => {
      return new User(user);
    });

  }

  addUser(user: User) {
    console.log('[Models - ContextualComm] - addUser: ', this.users.indexOf(user));
    if (this.users.indexOf(user) === -1) {
      this.users.push(user);
    }

  }

  addMessage(message: Message) {
    console.log('[Models - ContextualComm] - addMessage: ', this.messages, message);
    this.messages.push(message);
  }

  addResource(resource: Resource) {
    console.log('[Models - ContextualComm] - addMessage: ', this.resources, resource);
    this.resources.push(resource);
  }

  removeContexts(urls: string[]) {
    urls.forEach(url => this.removeContext(url));
  }

  removeContext(url: string) {
    this.contexts.splice(this.contexts.findIndex(current => current.url === url), 1);
  }

}

export class ContextualCommTrigger {

  contextName: string;
  contextScheme: string;
  contextResource: HypertyResourceType[];
  values: ContextValue[];

  trigger: ContextualComm[];

  icon?: string;

  constructor(value: ContextualCommTrigger) {

    Object.assign(this, value);

  };

}
