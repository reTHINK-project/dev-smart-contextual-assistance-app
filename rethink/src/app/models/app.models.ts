import { User } from './models';

export enum AlertType {
  SUCCESS = <any>'success', 
  INFO = <any>'info', 
  DANGER = <any>'danger', 
  WARNING = <any>'Warning',
  QUESTION = <any>'question'
};

export interface IMessageAlert {
  user?: User
  message: string,
  options?: any,
  action?: string,
  reply?: boolean
}

export interface IAlert {
  id: number;
  type: AlertType;
  message: IMessageAlert,
  callback?: Function,
}
