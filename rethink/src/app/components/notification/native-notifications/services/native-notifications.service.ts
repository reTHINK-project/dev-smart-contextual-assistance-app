import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NativeNotification, Permission } from '../interfaces/native-notification.type';

import { config } from '../../../../config';

declare const Notification: any;

@Injectable()
export class NativeNotificationsService {

  private audio: HTMLAudioElement;
  private registration: ServiceWorkerContainer;

  permission: Permission;

  @Input() haveFocus: boolean;

  constructor() {
    this.permission  = this.isSupported() ? Notification.permission : 'denied';

    // TODO: add a list of sounds to each type of event
    this.audio = new Audio();
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
        return;
      }

      if (this.permission !== 'granted') {
        obs.error(`The user hasn't granted you permission to send Native notifications`);
        obs.complete();
        return;
      }

      console.log('ServiceWorker Registration:', this.permission, options);

      if (options.persistent) {

        console.log('ServiceWorker Registration:', navigator.serviceWorker.onmessage);

        navigator.serviceWorker.ready.then((swRegistration: ServiceWorkerRegistration) => {

          console.log('ServiceWorker Registration:', swRegistration);

          const persistentOps = options;
          if (options.data.hasOwnProperty('actions')) {
            persistentOps.actions = options.data.actions;
          };

          swRegistration.showNotification(title, persistentOps).then(() => {
            console.log('ServiceWorker Registration - show Notification:', title, options);

            // console.log('ServiceWorker Registration - show Notification:', title, options, n);

            if (options.sound) {
              this.audio.src = options.sound;
              this.audio.load();
              this.audio.play();
            }

          }).catch((reason: any) => {

            obs.error({event: reason});
            obs.complete();

          })

        });

        navigator.serviceWorker.onmessage = (e: ServiceWorkerMessageEvent) => {
          obs.next({event: e});
          obs.complete();
        };

      } else {

        const n = new Notification(title, options);

        if (options.sound) {
          this.audio.src = options.sound;
          this.audio.load();
          this.audio.play();
        }

        n.onshow = (e: any) => obs.next({notification: n, event: e});
        n.onclick = (e: any) => obs.next({notification: n, event: e});
        n.onerror = (e: any) => obs.error({notification: n, event: e});
        n.onclose = () => obs.complete();

      }
    });
  }

}
