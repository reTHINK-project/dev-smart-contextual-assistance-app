import { Notification } from './notification.type';

export interface NotificationEvent {
  add?: boolean;
  command: string;
  id?: string;
  notification?: Notification;
  action?: 'accept' | 'reject' | 'maybe';
}
