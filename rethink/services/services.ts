import { appServiceInjectables } from './app.service';
import { chatServiceInjectables } from './chat.service';
import { contextServiceInjectables } from './context.service';
import { contactServiceInjectables } from './contact.service';
import { localStorageServiceInjectables } from './storage.service';

export * from './app.service';
export * from './chat.service';
export * from './context.service';
export * from './contact.service';
export * from './storage.service';

export var servicesInjectables: Array<any> = [
  appServiceInjectables,
  chatServiceInjectables,
  contextServiceInjectables,
  contactServiceInjectables,
  localStorageServiceInjectables,
];