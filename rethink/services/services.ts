// Rethink Services
import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';

// Services
import { MessageService } from './message.service';
import { ContextService } from './context.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';
import { AuthGuard } from './authGuard.service';

// Rethink Services
export * from './rethink/rethink.service';
export * from './rethink/chat.service';

// Services
export * from './message.service';
export * from './context.service';
export * from './contact.service';
export * from './storage.service';
export * from './authGuard.service';

export var servicesInjectables: Array<any> = [
  RethinkService,
  ChatService,
  MessageService,
  ContextService,
  ContactService,
  LocalStorage,
  AuthGuard,
];