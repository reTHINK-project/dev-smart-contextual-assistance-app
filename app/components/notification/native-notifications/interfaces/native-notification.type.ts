export type Permission = 'denied' | 'granted' | 'default';

export enum NotificationTag {
  NEW_MESSAGE = 'new-message',
  INCOMING_CALL = 'incoming-call',
  NEW_CONTEXT = 'new-context'
}

export enum NotificationVibrate {
  NEW_MESSAGE = <any>[200, 100, 200, 100, 200, 100, 200],
  INCOMING_CALL = <any>[200, 10, 200, 10, 200, 10, 200],
  NEW_CONTEXT = <any>[200, 100, 200, 100, 200, 100, 200]
}

export interface NotificationAction {
  action?: string;
  title?: string;
  icon?: string;
}

export interface NativeNotification {
    body: string;
    icon?: string;
    tag?: NotificationTag;
    data?: any;
    renotify?: boolean;
    silent?: boolean;
    sound?: string;
    noscreen?: boolean;
    sticky?: boolean;
    persistent?: boolean;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    vibrate?: NotificationVibrate;
    actions?: NotificationAction[];
    onclick?: Function;
    onclose?: Function;
    onerror?: Function;
    onshow?: Function;
}
