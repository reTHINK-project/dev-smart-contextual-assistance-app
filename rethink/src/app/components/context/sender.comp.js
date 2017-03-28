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
var ContextSenderComponent = (function () {
    function ContextSenderComponent() {
        this.hostClass = 'message-sender all-75 medium-70 xlarge-80 hide-small hide-tiny push-right';
        this.active = false;
        this.onMessage = new core_1.EventEmitter();
    }
    ContextSenderComponent.prototype.submit = function (form) {
        this.onMessage.emit(form.value.message);
        form.controls.message.updateValue('');
    };
    return ContextSenderComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ContextSenderComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ContextSenderComponent.prototype, "active", void 0);
__decorate([
    core_1.Output('on-message'),
    __metadata("design:type", Object)
], ContextSenderComponent.prototype, "onMessage", void 0);
ContextSenderComponent = __decorate([
    core_1.Component({
        selector: 'div[context-sender]',
        templateUrl: 'comp/context/sender.comp.html'
    })
], ContextSenderComponent);
exports.ContextSenderComponent = ContextSenderComponent;
//# sourceMappingURL=sender.comp.js.map