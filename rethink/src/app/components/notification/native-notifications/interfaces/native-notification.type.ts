export type Permission = 'denied' | 'granted' | 'default';

export interface NativeNotification {
    body?: string;
    icon?: string;
    tag?: string;
    data?: any;
    renotify?: boolean;
    silent?: boolean;
    sound?: string;
    noscreen?: boolean;
    sticky?: boolean;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    vibrate?: number[];
}
