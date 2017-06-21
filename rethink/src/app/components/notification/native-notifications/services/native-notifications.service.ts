import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NativeNotification, Permission } from '../interfaces/native-notification.type';

declare const Notification: any;

@Injectable()
export class NativeNotificationsService {

  permission: Permission;

  constructor() {
    this.permission  = this.isSupported() ? Notification.permission : 'denied';
  }

  requestPermission() {
    if (this.isSupported()) {
      Notification.requestPermission((status: any) => this.permission = status);
    }
  }

  isSupported() {
    return 'Notification' in window;
  }

  create(title: string, options?: NativeNotification): any {

    return new Observable((obs: any) => {

      if (!this.isSupported()) {
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
