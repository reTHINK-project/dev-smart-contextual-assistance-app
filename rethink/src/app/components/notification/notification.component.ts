import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { IAlert, AlertType } from '../../models/app.models';

import { NotificationService } from '../../services/notification.service';

import { User } from '../../models/models';
import { Observable } from "rxjs/Observable";

@Component({
  moduleId: module.id,
  selector: 'ngbd-alert-closeable',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @HostBinding('class') hostClass = 'notification-view'

  @Input() user:User

  private alerts:IAlert[] = [];

  @Output('onAcceptCall') onAcceptClick = new EventEmitter()
  @Output('onRejectCall') onRejectClick = new EventEmitter()

  constructor(private notificationService:NotificationService) {

    this.notificationService.notification.subscribe((alert:IAlert) => {
      console.log('[Notification Component] - new notification', alert);
      this.showAlert(alert);
    });

  }

  showAlert(alert:IAlert) {
    console.log('[Notification Component] - showAlert', alert);
    this.alerts.push(alert)
  }

  closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  acceptClick(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];
    console.log('[Notification Component] - accept', currAlert);
    this.notificationService.accept(currAlert);
    this.alerts.splice(index, 1);
  }

  rejectClick(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    let currAlert = this.alerts[index];
    console.log('[Notification Component] - reject', currAlert);
    this.notificationService.reject(currAlert);
    this.alerts.splice(index, 1);
  }

}