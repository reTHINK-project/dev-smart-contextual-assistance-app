"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Rethink Services
var connector_service_1 = require("./rethink/connector.service");
var rethink_service_1 = require("./rethink/rethink.service");
var context_service_1 = require("./rethink/context.service");
var chat_service_1 = require("./rethink/chat.service");
// Services
var notification_service_1 = require("./notification.service");
var message_service_1 = require("./message.service");
var contact_service_1 = require("./contact.service");
var storage_service_1 = require("./storage.service");
var router_service_1 = require("./router.service");
// Rethink Services
__export(require("./rethink/connector.service"));
__export(require("./rethink/context.service"));
__export(require("./rethink/rethink.service"));
__export(require("./rethink/chat.service"));
// Services
__export(require("./message.service"));
__export(require("./contact.service"));
__export(require("./storage.service"));
__export(require("./router.service"));
__export(require("./notification.service"));
exports.servicesInjectables = [
    chat_service_1.ChatService,
    storage_service_1.LocalStorage,
    router_service_1.RouterService,
    context_service_1.ContextService,
    rethink_service_1.RethinkService,
    contact_service_1.ContactService,
    message_service_1.MessageService,
    connector_service_1.ConnectorService,
    notification_service_1.NotificationService
];
//# sourceMappingURL=services.js.map