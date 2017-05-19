// Rethink Services
import { ConnectorService } from './rethink/connector.service';
import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';

// Services
import { ContextualCommTriggerService } from './contextualCommTrigger.service';
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommDataResolver } from './contextualCommData.resolver';
import { ContextualCommService } from './contextualComm.service';
import { TriggerActionService } from './triggerAction.service';
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
  TriggerActionService,
  ContextualCommService,
  ContextualCommDataService,
  ContextualCommDataResolver,
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
  TriggerActionService,
  ContextualCommTriggerService
];
