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
var services_1 = require("../../services/services");
var models_1 = require("../../models/models");
var NotificationComponent = (function () {
    function NotificationComponent(notificationService) {
        var _this = this;
        this.notificationService = notificationService;
        this.hostClass = 'notification-view';
        this.alerts = [];
        this.onAcceptClick = new core_1.EventEmitter();
        this.onRejectClick = new core_1.EventEmitter();
        this.notificationService.notification.subscribe(function (alert) {
            console.log('[Notification Component] - new notification', alert);
            _this.showAlert(alert);
        });
    }
    NotificationComponent.prototype.showAlert = function (alert) {
        console.log('[Notification Component] - showAlert', alert);
        this.alerts.push(alert);
    };
    NotificationComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    NotificationComponent.prototype.acceptClick = function (alert) {
        var index = this.alerts.indexOf(alert);
        var currAlert = this.alerts[index];
        console.log('[Notification Component] - accept', currAlert);
        this.notificationService.accept(currAlert);
        this.alerts.splice(index, 1);
    };
    NotificationComponent.prototype.rejectClick = function (alert) {
        var index = this.alerts.indexOf(alert);
        var currAlert = this.alerts[index];
        console.log('[Notification Component] - reject', currAlert);
        this.notificationService.reject(currAlert);
        this.alerts.splice(index, 1);
    };
    return NotificationComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], NotificationComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], NotificationComponent.prototype, "user", void 0);
__decorate([
    core_1.Output('onAcceptCall'),
    __metadata("design:type", Object)
], NotificationComponent.prototype, "onAcceptClick", void 0);
__decorate([
    core_1.Output('onRejectCall'),
    __metadata("design:type", Object)
], NotificationComponent.prototype, "onRejectClick", void 0);
NotificationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ngbd-alert-closeable',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.css']
    }),
    __metadata("design:paramtypes", [services_1.NotificationService])
], NotificationComponent);
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map