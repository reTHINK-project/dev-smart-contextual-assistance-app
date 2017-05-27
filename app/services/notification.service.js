"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var NotificationService = (function () {
    function NotificationService() {
        this.alerts = [];
        this.newNotification = new Subject_1.Subject();
        this.notification = this.newNotification;
        this.notification.subscribe(function (notification) {
            console.log('[Notification Service] - new Notification: ', notification);
        });
    }
    NotificationService.prototype.addNotification = function (type, message, metadata, callback) {
        if (callback === void 0) { callback = null; }
        var curr = this.alerts.length + 1;
        var alert = {
            id: curr,
            type: type,
            message: {
                message: 'notification message'
            },
            metadata: metadata,
            callback: callback
        };
        Object.assign(alert.message, message);
        this.alerts.push(alert);
        console.log('[Notification Service - addNotification] :', type, alert);
        this.newNotification.next(alert);
    };
    NotificationService.prototype.accept = function (alert) {
        var index = this.alerts.indexOf(alert);
        var currAlert = this.alerts[index];
        currAlert.message.reply = true;
        console.log('[Notification Service - accept] :', currAlert);
        if (currAlert.callback) {
            currAlert.callback(currAlert);
        }
    };
    NotificationService.prototype.reject = function (alert) {
        var index = this.alerts.indexOf(alert);
        var currAlert = this.alerts[index];
        currAlert.message.reply = false;
        console.log('[Notification Service - reject] :', alert);
        if (currAlert.callback) {
            currAlert.callback(currAlert.message.reply);
        }
    };
    return NotificationService;
}());
NotificationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map