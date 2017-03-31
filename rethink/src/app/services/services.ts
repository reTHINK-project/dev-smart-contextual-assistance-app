// Rethink Services
import { ConnectorService } from './rethink/connector.service';
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';
import { ChatService } from './rethink/chat.service';

// Services
import { NotificationService } from './notification.service';
import { MessageService } from './message.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';
import { RouterService } from './router.service';

// Rethink Services
export * from './rethink/connector.service';
export * from './rethink/context.service';
export * from './rethink/rethink.service';
export * from './rethink/chat.service';

// Services
export * from './message.service';
export * from './contact.service';
export * from './storage.service';
export * from './router.service';
export * from './notification.service';

export var servicesInjectables: Array<any> = [
  ChatService,
  LocalStorage,
  RouterService,
  ContextService,
  RethinkService,
  ContactService,
  MessageService,
  ConnectorService,
  NotificationService
];