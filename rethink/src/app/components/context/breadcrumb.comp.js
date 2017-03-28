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
var ContextBreadCrumbComponent = (function () {
    function ContextBreadCrumbComponent() {
        this.hostClass = 'contactlist all-45';
        this.openContext = new core_1.EventEmitter();
    }
    return ContextBreadCrumbComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ContextBreadCrumbComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Output('open-context'),
    __metadata("design:type", Object)
], ContextBreadCrumbComponent.prototype, "openContext", void 0);
ContextBreadCrumbComponent = __decorate([
    core_1.Component({
        selector: 'ul[context-breadcrumb]',
        templateUrl: 'comp/context/breadcrumb.comp.html'
    })
], ContextBreadCrumbComponent);
exports.ContextBreadCrumbComponent = ContextBreadCrumbComponent;
//# sourceMappingURL=breadcrumb.comp.js.map