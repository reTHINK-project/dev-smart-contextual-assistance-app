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
var models_1 = require("../../models/models");
var ContactBoxComponent = (function () {
    function ContactBoxComponent() {
        // TODO: Use with the Bootstrap: user-identity contactbox p-4 col-12
        this.hostClass = 'user-identity contactbox all-75 large-65 xlarge-65 medium-100';
        this.closeEvent = new core_1.EventEmitter();
    }
    ContactBoxComponent.prototype.onCloseClick = function () {
        this.closeEvent.emit();
    };
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], ContactBoxComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", models_1.User)
    ], ContactBoxComponent.prototype, "user", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ContactBoxComponent.prototype, "closeEvent", void 0);
    ContactBoxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[contact-box]',
            templateUrl: './contact-box.component.html'
        })
    ], ContactBoxComponent);
    return ContactBoxComponent;
}());
exports.ContactBoxComponent = ContactBoxComponent;
//# sourceMappingURL=contact-box.component.js.map