"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rethink Services
var connector_service_1 = require("./rethink/connector.service");
exports.ConnectorService = connector_service_1.ConnectorService;
var rethink_service_1 = require("./rethink/rethink.service");
exports.RethinkService = rethink_service_1.RethinkService;
var chat_service_1 = require("./rethink/chat.service");
exports.ChatService = chat_service_1.ChatService;
// Services
var contextualCommActivate_service_1 = require("./contextualCommActivate.service");
exports.ContextualCommActivateService = contextualCommActivate_service_1.ContextualCommActivateService;
var contextualCommTrigger_service_1 = require("./contextualCommTrigger.service");
exports.ContextualCommTriggerService = contextualCommTrigger_service_1.ContextualCommTriggerService;
var contextualCommData_service_1 = require("./contextualCommData.service");
exports.ContextualCommDataService = contextualCommData_service_1.ContextualCommDataService;
var contextualCommData_resolver_1 = require("./contextualCommData.resolver");
exports.ContextualCommDataResolver = contextualCommData_resolver_1.ContextualCommDataResolver;
var contextualComm_service_1 = require("./contextualComm.service");
exports.ContextualCommService = contextualComm_service_1.ContextualCommService;
var triggerAction_service_1 = require("./triggerAction.service");
exports.TriggerActionService = triggerAction_service_1.TriggerActionService;
var notification_service_1 = require("./notification.service");
exports.NotificationService = notification_service_1.NotificationService;
var contact_service_1 = require("./contact.service");
exports.ContactService = contact_service_1.ContactService;
var storage_service_1 = require("./storage.service");
exports.LocalStorage = storage_service_1.LocalStorage;
var router_service_1 = require("./router.service");
exports.RouterService = router_service_1.RouterService;
var authGuard_service_1 = require("./authGuard.service");
exports.AuthGuard = authGuard_service_1.AuthGuard;
var user_resolver_1 = require("./user.resolver");
exports.UserResolver = user_resolver_1.UserResolver;
exports.servicesInjectables = [
    chat_service_1.ChatService,
    storage_service_1.LocalStorage,
    router_service_1.RouterService,
    rethink_service_1.RethinkService,
    contact_service_1.ContactService,
    connector_service_1.ConnectorService,
    notification_service_1.NotificationService,
    triggerAction_service_1.TriggerActionService,
    contextualCommTrigger_service_1.ContextualCommTriggerService
];
//# sourceMappingURL=services.js.map