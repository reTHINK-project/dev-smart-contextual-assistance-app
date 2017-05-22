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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var models_1 = require("../../models/models");
var MySelfComponent = (function () {
    function MySelfComponent(config) {
        this.hostClass = 'float-right';
        config.autoClose = false;
    }
    MySelfComponent.prototype.ngOnInit = function () {
    };
    return MySelfComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], MySelfComponent.prototype, "model", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], MySelfComponent.prototype, "hostClass", void 0);
MySelfComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-self',
        templateUrl: './my-self.component.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbDropdownConfig])
], MySelfComponent);
exports.MySelfComponent = MySelfComponent;
//# sourceMappingURL=my-self.component.js.map