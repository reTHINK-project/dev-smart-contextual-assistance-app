"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var notifications_component_1 = require("./notifications/components/notifications.component");
var notification_component_1 = require("./notifications/components/notification.component");
var max_pipe_1 = require("./notifications/pipes/max.pipe");
var notifications_service_1 = require("./notifications/services/notifications.service");
__export(require("./notifications/interfaces/icons"));
__export(require("./notifications/components/notifications.component"));
__export(require("./notifications/components/notification.component"));
__export(require("./notifications/pipes/max.pipe"));
__export(require("./notifications/services/notifications.service"));
var NotificationsModule = (function () {
    var NotificationsModule = NotificationsModule_1 = function NotificationsModule() {
    };
    NotificationsModule.forRoot = function () {
        return {
            ngModule: NotificationsModule_1,
            providers: [notifications_service_1.NotificationsService]
        };
    };
    NotificationsModule = NotificationsModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                notifications_component_1.NotificationsComponent,
                notification_component_1.NotificationComponent,
                max_pipe_1.MaxPipe
            ],
            exports: [notifications_component_1.NotificationsComponent]
        })
    ], NotificationsModule);
    return NotificationsModule;
    var NotificationsModule_1;
}());
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map