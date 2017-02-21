"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Rethink Services
var rethink_service_1 = require('./rethink/rethink.service');
var context_service_1 = require('./rethink/context.service');
var chat_service_1 = require('./rethink/chat.service');
// Services
var message_service_1 = require('./message.service');
var contact_service_1 = require('./contact.service');
var storage_service_1 = require('./storage.service');
var router_service_1 = require('./router.service');
// Rethink Services
__export(require('./rethink/rethink.service'));
__export(require('./rethink/chat.service'));
__export(require('./rethink/context.service'));
// Services
__export(require('./message.service'));
__export(require('./contact.service'));
__export(require('./storage.service'));
__export(require('./router.service'));
exports.servicesInjectables = [
    rethink_service_1.RethinkService,
    chat_service_1.ChatService,
    message_service_1.MessageService,
    context_service_1.ContextService,
    contact_service_1.ContactService,
    storage_service_1.LocalStorage,
    router_service_1.RouterService
];
//# sourceMappingURL=services.js.map