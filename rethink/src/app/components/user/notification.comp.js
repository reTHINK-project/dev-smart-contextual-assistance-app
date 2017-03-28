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
var core_1 = require("@angular/core");
var models_1 = require("../../models/models");
var NotificationBox = (function () {
    function NotificationBox() {
        this.hostClass = 'alert alert-info';
        this.acceptCall = new core_1.EventEmitter();
        this.rejectCall = new core_1.EventEmitter();
    }
    NotificationBox.prototype.ngOnInit = function () {
    };
    return NotificationBox;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], NotificationBox.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], NotificationBox.prototype, "model", void 0);
__decorate([
    core_1.Output('accept-call'),
    __metadata("design:type", Object)
], NotificationBox.prototype, "acceptCall", void 0);
__decorate([
    core_1.Output('reject-call'),
    __metadata("design:type", Object)
], NotificationBox.prototype, "rejectCall", void 0);
NotificationBox = __decorate([
    core_1.Component({
        selector: 'div[notification-box]',
        templateUrl: 'comp/user/notification.comp.html'
    })
], NotificationBox);
exports.NotificationBox = NotificationBox;
//# sourceMappingURL=notification.comp.js.map