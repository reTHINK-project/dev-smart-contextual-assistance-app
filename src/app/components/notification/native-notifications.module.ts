import { NgModule } from '@angular/core';
import { NativeNotificationsService } from './native-notifications/services/native-notifications.service';

export * from './native-notifications/interfaces/native-notification.type';
export * from './native-notifications/services/native-notifications.service';

@NgModule({
    providers: [NativeNotificationsService]
})
export class NativeNotificationsModule {}
