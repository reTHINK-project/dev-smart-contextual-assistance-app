// Rethink Interfaces
import { HypertyResourceType } from './rethink/HypertyResource';
import { Communication } from './rethink/Communication';
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
  statustUrl: string;

  unread: number;
  domain: string;

  constructor(obj: any) {
    this.username = obj && obj.username;
    this.cn       = obj && obj.cn;
    this.avatar   = obj && obj.avatar;
    this.locale   = obj && obj.locale;
    this.userURL  = obj && obj.userURL;
    this.status   = obj && obj.status   || 'available';
    this.unread   = obj && obj.unread   || 0;
    this.domain   = obj && obj.domain   || 'hybroker.rethink.ptinovacao.pt';

    this.identifiers = '';

    // TODO: split by the @ from user and domain <domain>@<identifier>
    this.guid     = this.username;
  }

  startStatusObservation(availability: any) {

    this.statustUrl = availability.url;

    this.status = availability.data.values[0].value;

    availability.onChange('*', function(event: any) {

    this.status = availability.data.values[0].value;

    });
    
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

  id: string;
  url: string;
  name: string;
  description?: string;

  // TODO this should not be optional
  communication?: Communication;
  context?: string;

  messages?: Message[];
  files?: HypertyResourceType[];
  photos?: HypertyResourceType[];
  audios?: HypertyResourceType[];
  videos?: HypertyResourceType[];

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

    this.icon              = obj && obj.icon          || '';

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
