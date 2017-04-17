// Rethink Services
import { ConnectorService } from './rethink/connector.service';
import { RethinkService } from './rethink/rethink.service';
import { ContextService } from './rethink/context.service';
import { ChatService } from './rethink/chat.service';

// Services
import { ContextualCommResolver } from './contextualComm.resolver';
import { NotificationService } from './notification.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';
import { RouterService } from './router.service';
import { AuthGuard } from './authGuard.service';
import { UserResolver } from './user.resolver';


// // Rethink Services
// export * from './rethink/connector.service';
// export * from './rethink/context.service';
// export * from './rethink/rethink.service';
// export * from './rethink/chat.service';

// // Services
// export * from './user.resolver';
// export * from './router.service';
// // export * from './contact.service';
// export * from './storage.service';
// export * from './authGuard.service';
// export * from './notification.service';
// export * from './contextualComm.resolver';

export {
  AuthGuard,
  ChatService,
  UserResolver,
  LocalStorage,
  RouterService,
  RethinkService,
  ContactService,
  ContextService,
  ConnectorService,
  NotificationService,
  ContextualCommResolver,
};

export let servicesInjectables: Array<any> = [
  ChatService,
  LocalStorage,
  RouterService,
  RethinkService,
  ContactService,
  ConnectorService,
  NotificationService
];
