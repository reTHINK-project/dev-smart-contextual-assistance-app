import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NativeNotification, Permission } from '../interfaces/native-notification.type';

import { config } from '../../../../config';

declare const Notification: any;

@Injectable()
export class NativeNotificationsService {

  private audio: any;
  private registration: ServiceWorkerRegistration;

  permission: Permission;

  @Input() haveFocus: boolean;

  constructor() {
    this.permission  = this.isSupported() ? Notification.permission : 'denied';

    // TODO: add a list of sounds to each type of event
    this.audio = new Audio();
    this.audio.src = config.sounds + 'solemn.mp3';
    this.audio.load();
  }

  requestPermission() {

    return new Observable((obs: any) => {

      if (!('Notification' in window)) {
        obs.error('Notifications are not available in this environment');
        obs.complete();
      }

      if ('Notification' in window) {
        Notification.requestPermission((status: any) => {
          this.permission = status;

          if (this.permission !== 'granted') {
            obs.error(`You hasn't granted permission to send Native notifications`);
            obs.complete();
          } else if (this.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(registration => {
              this.registration = registration;
              obs.complete();
            });
          }
        });
      }
    });

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

      // try {

      //   console.log('ServiceWorker Registration:', this.registration);

      //   this.registration.showNotification(title, Object.assign({requireInteraction: true}, options)).then((n: any) => {

      //     this.audio.play();

      //   }).catch((reason: any) => {

      //     obs.error({event: reason});
      //     obs.complete();

      //   })

      // } catch (error) {

       //  console.log('Error:', error);

        const n = new Notification(title, options);

        this.audio.play();

        n.onshow = (e: any) => obs.next({notification: n, event: e});
        n.onclick = (e: any) => obs.next({notification: n, event: e});
        n.onerror = (e: any) => obs.error({notification: n, event: e});
        n.onclose = () => obs.complete();

      // }

    });
  }

}
