import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NativeNotification, Permission } from '../interfaces/native-notification.type';

declare const Notification: any;

@Injectable()
export class NativeNotificationsService {

  permission: Permission;

  @Input() haveFocus: boolean;

  constructor() {
    this.permission  = this.isSupported() ? Notification.permission : 'denied';
  }

  requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission((status: any) => this.permission = status);
    }
  }

  isSupported() {
    return 'Notification' in window;
  }

  create(title: string, options?: NativeNotification): any {

    if (this.haveFocus) {
      return new Observable((obs: any) => { obs.complete(); });
    }

    return new Observable((obs: any) => {

      if (!('Notification' in window)) {
        obs.error('Notifications are not available in this environment');
        obs.complete();
      }

      if (this.permission !== 'granted') {
        obs.error(`The user hasn't granted you permission to send Native notifications`);
        obs.complete();
      }

      const n = new Notification(title, options);

      n.onshow = (e: any) => obs.next({notification: n, event: e});
      n.onclick = (e: any) => obs.next({notification: n, event: e});
      n.onerror = (e: any) => obs.error({notification: n, event: e});
      n.onclose = () => obs.complete();
    });
  }

}
