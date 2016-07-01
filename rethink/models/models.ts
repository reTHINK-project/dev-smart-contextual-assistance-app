import { ICommunication, ICommunictionStatus, IChatMessage } from './rethink/ICommunication';
import { IContextualComm } from './rethink/IContextualComm';
import { IHypertyResource } from './rethink/IHypertyResource';
import { IContextualCommUser } from './rethink/IContextualCommUser';
import { IContextualCommTrigger } from './rethink/IContextualCommTrigger';

export class User implements IContextualCommUser {

  id: string;

  username:string;
  cn:string;
  avatar:string;
  locale:string;
  userURL:string;

  status:string;
  unread:number;

  constructor(obj: any) {
    this.username = obj && obj.username;
    this.cn       = obj && obj.cn;
    this.avatar   = obj && obj.avatar;
    this.locale   = obj && obj.locale;
    this.userURL  = obj && obj.userURL;
    this.status   = obj && obj.status   || 'online';
    this.unread   = obj && obj.unread   || 0;

    this.id       = this.userURL.substr(this.userURL.lastIndexOf('/'));
  }

}

export class Communication implements ICommunication {

  scheme:string
  startingTime: Date
  lastModified: Date
  status: ICommunictionStatus
  resources: IHypertyResource[]
  children: string

  id: string
  name: string
  duration: Date
  participants: User
  owner: string

  schema: string
  
  constructor(obj: any) {

    this.duration	          = obj && obj.duration;
    this.id                 = obj && obj.id;
    this.lastModified       = obj && obj.lastModified;
    this.name               = obj && obj.name;
    this.owner              = obj && obj.owner;

    this.participants	      = obj && obj.participants;

    this.scheme             = obj && obj.scheme;
    this.schema             = obj && obj.schema;

    this.startingTime       = obj && obj.startingTime;
    this.status             = obj && obj.status;

    // Extra fields
    this.resources          = obj && obj.resources  || '';
    this.children           = obj && obj.children   || [];
    
  }

}

export class Message implements IChatMessage {
  type: string;
  message: string;
  user: User;
  date: Date;

  constructor(obj: any) {
    this.type             = obj && obj.type;
    this.message          = obj && obj.message;
    this.user             = obj && obj.user;
    this.date             = obj && obj.date || new Date().toISOString();
  }
}

export class Context implements IContextualComm {

  name:string;
  description:string;
  parent:string;

  contexts:string[];
  url:string;
  communication:Communication;

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

// TODO: Optimize the contextTrigger to use the IHypertyResource types
export class ContextTrigger {

  name:string;
  contextScheme:string;
  contextResource: string[];
  values: Array<string|number>;

  trigger:Context[];

  constructor(trigger: Context[],
    name?: string, 
    contextScheme?: string,
    contextResource?: string[],
    values?: Array<string|number>) {

      this.name = name
      this.contextScheme = contextScheme
      this.contextResource = contextResource
      this.values = values || []
      this.trigger = trigger || [];
  }

}