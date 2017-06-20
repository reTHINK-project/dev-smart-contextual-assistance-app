// Rethink Services
import { ConnectorService } from './rethink/connector.service';
import { RethinkService } from './rethink/rethink.service';
import { ChatService } from './rethink/chat.service';

// Services
import { ContextualCommActivateService } from './contextualCommActivate.service';
import { ContextualCommTriggerService } from './contextualCommTrigger.service';
import { ContextualCommDataService } from './contextualCommData.service';
import { ContextualCommDataResolver } from './contextualCommData.resolver';
import { ContextualCommService } from './contextualComm.service';
import { TriggerActionService } from './triggerAction.service';
import { NotificationService } from './notification.service';
import { ActivateTaskGuard } from './activateTask.service';
import { ActivateUserGuard } from './activateUser.service';
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
  ActivateTaskGuard,
  ActivateUserGuard,
  NotificationService,
  TriggerActionService,
  ContextualCommService,
  ContextualCommDataService,
  ContextualCommDataResolver,
  ContextualCommTriggerService,
  ContextualCommActivateService
};

export let servicesInjectables: Array<any> = [
  ChatService,
  LocalStorage,
  RouterService,
  RethinkService,
  ContactService,
  ConnectorService,
  ActivateTaskGuard,
  ActivateUserGuard,
  NotificationService,
  TriggerActionService,
  ContextualCommTriggerService
];
