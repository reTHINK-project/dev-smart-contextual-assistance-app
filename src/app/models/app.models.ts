import { User, ContextualComm } from './models';
import { EventEmitter } from '@angular/core';

export enum AlertType {
  SUCCESS = <any>'success',
  INFO = <any>'info',
  DANGER = <any>'danger',
  WARNING = <any>'Warning',
  QUESTION = <any>'question'
};

export interface IMessageAlert {
  user?: User;
  message: string;
  options?: any;
  action?: string;
  reply?: boolean;
}

export interface IAlert {
  id: number;
  type: AlertType;
  message: IMessageAlert;
  metadata?: any;
  callback?: Function;
}

export enum TriggerActions {
  OpenContextMenu = <any>'open-context',
  OpenContextMenuCreator = <any>'open-context-creation'
};

export interface PageSection {
  section: string;
  title: string;
};

export enum RemoveContextEventType {
  Remove = <any>'remove',
  Dismissed = <any>'dismissed',
  Error = <any>'error'
}

export interface RemoveContextEvent {
  type: RemoveContextEventType;
  context?: ContextualComm;
  reason?: string;
}

export interface InviteUser {
  email: string
  domain: string
}


export enum ProgressEventType {
  START = <any>'start',
  UPDATE = <any>'update',
  ERROR = <any>'error',
  END = <any>'end'
}

export interface ProgressEvent {
  type: ProgressEventType;
  resource: string;
  description?: string;
  value?: number;
}

export interface DownloadFileEvent {
  url: string;
  callback: EventEmitter<ProgressEvent>;
}

export interface UserAdded {
  controller: any;
  user: User;
}

export interface InvitationEvent {
  type: 'success' | 'rejected' | 'time out' | 'unknown';
  code: number;
  url: string;
}
