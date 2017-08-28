import { Notification } from './notification.type';

export enum ActionType {
  ACCEPT = <any>'accept',
  REJECT = <any>'reject',
  MAYBE = <any>'maybe'
};

export interface NotificationActionEvent {
  id: string;
  createdOn: Date;
  type: string;
  notification: Notification;
  action: ActionType;
  metadata?: any;
}
