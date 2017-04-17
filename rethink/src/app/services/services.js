"use strict";
// Rethink Services
var connector_service_1 = require("./rethink/connector.service");
exports.ConnectorService = connector_service_1.ConnectorService;
var rethink_service_1 = require("./rethink/rethink.service");
exports.RethinkService = rethink_service_1.RethinkService;
var context_service_1 = require("./rethink/context.service");
exports.ContextService = context_service_1.ContextService;
var chat_service_1 = require("./rethink/chat.service");
exports.ChatService = chat_service_1.ChatService;
// Services
var contextualComm_resolver_1 = require("./contextualComm.resolver");
exports.ContextualCommResolver = contextualComm_resolver_1.ContextualCommResolver;
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
    notification_service_1.NotificationService
];
//# sourceMappingURL=services.js.map