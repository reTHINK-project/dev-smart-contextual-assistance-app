// Rethink Interfaces
import { HypertyResourceType } from './rethink/HypertyResource';
import { Communication } from './rethink/Communication';
import { Connection } from './rethink/Connection';
import { ContextValue } from './rethink/Context';
import { UserIdentity } from './rethink/UserIdentity';

export class User implements UserIdentity {

  guid: string;
  identifiers: string;
  idp: string;

  username: string;
  cn: string;
  avatar: string;
  locale: string;
  userURL: string;

  status: string;

  unread: number;
  domain: string;

  constructor(obj: any) {
    this.username = obj && obj.username;
    this.cn       = obj && obj.cn;
    this.avatar   = obj && obj.avatar;
    this.locale   = obj && obj.locale;
    this.userURL  = obj && obj.userURL;
    this.status   = obj && obj.status   || 'online';
    this.unread   = obj && obj.unread   || 0;
    this.domain   = obj && obj.domain   || 'hybroker.rethink.ptinovacao.pt';

    this.identifiers = '';

    // TODO: split by the @ from user and domain <domain>@<identifier>
    this.guid     = this.username;
  }

}

export class Message {
  type: string;
  message: string;
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

export class ContextualComm {

  name: string;
  description: string;
  parent: string;

  contexts: string[];
  url: string;
  communication: Communication | Connection;

  users: User[];
  messages: Message[];

  constructor(obj: any) {
    this.name              = obj && obj.name;
    this.description       = obj && obj.description;
    this.parent            = obj && obj.parent;
    this.url               = obj && obj.url;
    this.contexts          = obj && obj.contexts      || [];
    this.users             = obj && obj.users         || [];
    this.messages          = obj && obj.messages      || [];

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

}

export class ContextualCommTrigger {

  contextName: string;
  contextScheme: string;
  contextResource: HypertyResourceType[];
  values: ContextValue[];

  trigger: ContextualComm[];

  constructor(value: ContextualCommTrigger) {

    Object.assign(this, value);

  };

}
