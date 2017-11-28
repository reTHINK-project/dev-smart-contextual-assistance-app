import { NgModule } from '@angular/core';
import { NativeNotificationsService } from './native-notifications/services/native-notifications.service';
import { RequestNotificationComponent } from './native-notifications/components/request-notification.component';

export * from './native-notifications/interfaces/native-notification.type';
export * from './native-notifications/services/native-notifications.service';
export * from './native-notifications/components/request-notification.component';

@NgModule({
  declarations: [RequestNotificationComponent],
  providers: [NativeNotificationsService]
})

export class NativeNotificationsModule {}
