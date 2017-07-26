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
import { ActivateTaskGuard } from './activateTask.service';
import { ActivateUserGuard } from './activateUser.service';
import { BreadcrumbService } from './breadcrumb.service';
import { ContactService } from './contact.service';
import { RoutingService } from './routing.service';
import { LocalStorage } from './storage.service';
import { AuthGuard } from './authGuard.service';
import { UserResolver } from './user.resolver';

export {
  AuthGuard,
  ChatService,
  UserResolver,
  LocalStorage,
  RoutingService,
  RethinkService,
  ContactService,
  ConnectorService,
  BreadcrumbService,
  ActivateTaskGuard,
  ActivateUserGuard,
  TriggerActionService,
  ContextualCommService,
  ContextualCommDataService,
  ContextualCommDataResolver,
  ContextualCommTriggerService
};

export let servicesInjectables: Array<any> = [
  ChatService,
  LocalStorage,
  RoutingService,
  RethinkService,
  ContactService,
  ConnectorService,
  BreadcrumbService,
  ActivateTaskGuard,
  ActivateUserGuard,
  TriggerActionService,
  ContextualCommTriggerService
];
