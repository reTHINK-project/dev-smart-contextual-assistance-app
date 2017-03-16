// Rethink Services
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';
import { ChatService } from './rethink/chat.service';

// Services
import { MessageService } from './message.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';
import { RouterService } from './router.service';

// Rethink Services
export * from './rethink/rethink.service';
export * from './rethink/chat.service';
export * from './rethink/context.service';

// Services
export * from './message.service';
export * from './contact.service';
export * from './storage.service';
export * from './router.service';

export var servicesInjectables: Array<any> = [
  RethinkService,
  ChatService,
  MessageService,
  ContextService,
  ContactService,
  LocalStorage,
  RouterService
];