/*import { appServiceInjectables } from './app.service';
import { chatServiceInjectables } from './chat.service';
import { messageServiceInjectables } from './message.service';
import { contextServiceInjectables } from './context.service';
import { contactServiceInjectables } from './contact.service';
import { localStorageServiceInjectables } from './storage.service';
import { contextualServiceInjectables } from './contextualCommResolve.service';

export * from './app.service';
export * from './chat.service';
export * from './message.service';
export * from './context.service';
export * from './contact.service';
export * from './storage.service';
export * from './contextualCommResolve.service';

export var servicesInjectables: Array<any> = [
  contextualServiceInjectables,
  appServiceInjectables,
  chatServiceInjectables,
  messageServiceInjectables,
  contextServiceInjectables,
  contactServiceInjectables,
  localStorageServiceInjectables,
];*/

import { AppService } from './app.service';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { ContextService } from './context.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';

import { AuthGuard } from './authGuard.service';

export * from './app.service';
export * from './chat.service';
export * from './message.service';
export * from './context.service';
export * from './contact.service';
export * from './storage.service';
export * from './authGuard.service';

export var servicesInjectables: Array<any> = [
  AppService,
  ChatService,
  MessageService,
  ContextService,
  ContactService,
  LocalStorage,
  AuthGuard,
];