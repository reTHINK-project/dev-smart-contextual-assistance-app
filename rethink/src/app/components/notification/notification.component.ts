import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

import { IAlert } from '../../models/app.models';

import { NotificationService } from '../../services/services';

import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'ngbd-alert-closeable',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @HostBinding('class') hostClass = 'notification-view';
  @HostBinding('class.show') hostShow = false;

  @Input() user: User;

  alerts: IAlert[] = [];

  @Output() onAcceptClick = new EventEmitter();
  @Output() onRejectClick = new EventEmitter();

  constructor(private notificationService: NotificationService) {

    this.notificationService.notification.subscribe((alert: IAlert) => {
      console.log('[Notification Component] - new notification', alert);
      this.showAlert(alert);
    });

  }

  showAlert(alert: IAlert) {
    console.log('[Notification Component] - showAlert', alert);
    this.alerts.push(alert);

    this.checkAlerts();
  }

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);

    this.checkAlerts();
  }

  acceptClick(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];
    console.log('[Notification Component] - accept', currAlert);
    this.notificationService.accept(currAlert);
    this.alerts.splice(index, 1);

    this.checkAlerts();
  }

  rejectClick(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];
    console.log('[Notification Component] - reject', currAlert);
    this.notificationService.reject(currAlert);
    this.alerts.splice(index, 1);

    this.checkAlerts();
  }

  checkAlerts() {
    if (this.alerts.length === 0) {
      this.hostShow = false;
    } else {
      this.hostShow = true;
    }
  }

}
