import {List,Record} from 'immutable';

// Rethink Interfaces
import { HypertyResource, HypertyResourceType } from './rethink/HypertyResource';
import { Communication, CommunictionStatus } from './rethink/Communication';
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
  user: string;
  date: Date;

  constructor(obj: any) {
    this.type             = obj && obj.type;
    this.message          = obj && obj.message;
    this.user             = obj && obj.user;
    this.date             = obj && obj.date || new Date().toISOString();
  }
}

export class ContextualComm {

  name:string;
  description:string;
  parent:string;

  contexts:string[];
  url:string;
  communication:Communication | Connection;

  users:Array<User>;
  messages:Array<Message>;

  constructor(obj: any) {
    this.name              = obj && obj.name;
    this.description       = obj && obj.description;
    this.parent            = obj && obj.parent;
    this.url               = obj && obj.url;
    this.contexts          = obj && obj.contexts      || [];
    this.users             = obj && obj.users         || [];
    this.messages          = obj && obj.messages      || [];
  }

  addUser(user:User) {
    this.users.push(user);
  }

  addMessage(message:any) {
    this.messages.push(message);
  }

}

export class ContextualCommTrigger {

  contextName:string;
  contextScheme:string;
  contextResource: HypertyResourceType[];
  values: ContextValue[];

  trigger: ContextualComm[];

  constructor(trigger: ContextualComm[],
    name?: string, 
    contextScheme?: string,
    contextResource?: HypertyResourceType[],
    values?: ContextValue[]) {

      this.contextName = name
      this.contextScheme = contextScheme
      this.contextResource = contextResource
      this.values = values || []
      this.trigger = trigger || [];
  }

}