import { Injectable } from '@angular/core';

import { IAlert, AlertType } from '../models/app.models';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  notification: Observable<any>;

  private alerts: IAlert[] = [];
  private newNotification: Subject<any> = new Subject();

  constructor() {

    this.notification = this.newNotification;

  }

  addNotification(type: AlertType, message: any, metadata: any, callback: Function = null) {

    let curr = this.alerts.length + 1;
    let alert: IAlert = {
      id: curr,
      type: type,
      message: {
        message: 'notification message'
      },
      metadata: metadata,
      callback: callback
    };

    Object.assign(alert.message, message);

    this.alerts.push(alert);

    console.log('[Notification Service - addNotification] :', type, alert);
    this.newNotification.next(alert);

  }

  accept(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];

    currAlert.message.reply = true;

    console.log('[Notification Service - accept] :', currAlert);

    if (currAlert.callback) { currAlert.callback(currAlert); }

  }

  reject(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];

    currAlert.message.reply = false;
    console.log('[Notification Service - reject] :', alert);

    if (currAlert.callback) { currAlert.callback(currAlert.message.reply); }
  }

}
