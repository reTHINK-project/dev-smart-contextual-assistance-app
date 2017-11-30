import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { NotificationComponent } from './notifications/components/notification.component';
import { MaxPipe } from './notifications/pipes/max.pipe';
import { NotificationsService } from './notifications/services/notifications.service';

// Type
export * from './notifications/interfaces/notification.type';
export * from './notifications/interfaces/options.type';
export * from './notifications/interfaces/icons';

export * from './notifications/components/notifications.component';
export * from './notifications/components/notification.component';
export * from './notifications/pipes/max.pipe';
export * from './notifications/services/notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotificationsComponent,
    NotificationComponent,
    MaxPipe
  ],
  exports: [NotificationsComponent]
})
export class NotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotificationsModule,
      providers: [NotificationsService]
    };
  }
}
