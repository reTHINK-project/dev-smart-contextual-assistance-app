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
var router_service_1 = require("../../services/router.service");
var ContextBreadcrumbComponent = (function () {
    function ContextBreadcrumbComponent(routerService) {
        this.routerService = routerService;
        this.hostClass = 'contactlist all-45';
        this.openContext = new core_1.EventEmitter();
    }
    ContextBreadcrumbComponent.prototype.ngOnInit = function () {
        this.breadcrumb = this.routerService.breadcrumb;
    };
    return ContextBreadcrumbComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ContextBreadcrumbComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ContextBreadcrumbComponent.prototype, "openContext", void 0);
ContextBreadcrumbComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ul[context-breadcrumb]',
        templateUrl: './breadcrumb.component.html'
    }),
    __metadata("design:paramtypes", [router_service_1.RouterService])
], ContextBreadcrumbComponent);
exports.ContextBreadcrumbComponent = ContextBreadcrumbComponent;
//# sourceMappingURL=breadcrumb.component.js.map