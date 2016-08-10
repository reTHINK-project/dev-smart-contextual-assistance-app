import { appServiceInjectables } from './app.service';
import { chatServiceInjectables } from './chat.service';
import { messageServiceInjectables } from './message.service';
import { contextServiceInjectables } from './context.service';
import { contactServiceInjectables } from './contact.service';
import { localStorageServiceInjectables } from './storage.service';
import { canActivateRoute } from './canActivateRoute.service';

export * from './app.service';
export * from './chat.service';
export * from './message.service';
export * from './context.service';
export * from './contact.service';
export * from './storage.service';
export * from './canActivateRoute.service';

export var servicesInjectables: Array<any> = [
  canActivateRoute,
  appServiceInjectables,
  chatServiceInjectables,
  messageServiceInjectables,
  contextServiceInjectables,
  contactServiceInjectables,
  localStorageServiceInjectables,
];