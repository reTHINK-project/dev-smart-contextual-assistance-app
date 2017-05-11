// Rethink Services
import { ConnectorService } from './rethink/connector.service';
import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';

// Services
import { ContextualCommTriggerService } from './contextualCommTrigger.service';
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommResolver } from './contextualComm.resolver';
import { ContextualCommService } from './contextualComm.service';
import { NotificationService } from './notification.service';
import { ContactService } from './contact.service';
import { LocalStorage } from './storage.service';
import { RouterService } from './router.service';
import { AuthGuard } from './authGuard.service';
import { UserResolver } from './user.resolver';

export {
  AuthGuard,
  ChatService,
  UserResolver,
  LocalStorage,
  RouterService,
  RethinkService,
  ContactService,
  ConnectorService,
  NotificationService,
  ContextualCommService,
  ContextualCommResolver,
  ContextualCommDataService,
  ContextualCommTriggerService
};

export let servicesInjectables: Array<any> = [
  ChatService,
  LocalStorage,
  RouterService,
  RethinkService,
  ContactService,
  ConnectorService,
  NotificationService,
  ContextualCommTriggerService
];
