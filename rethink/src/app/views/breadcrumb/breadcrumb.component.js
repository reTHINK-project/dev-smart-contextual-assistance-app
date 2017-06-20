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
var router_1 = require("@angular/router");
require("rxjs/add/operator/pairwise");
var services_1 = require("../../services/services");
var ContextBreadcrumbComponent = (function () {
    function ContextBreadcrumbComponent(router, routerService) {
        this.router = router;
        this.routerService = routerService;
        this.hostClass = 'rethink-breadcrumb';
        this.openContext = new core_1.EventEmitter();
    }
    ContextBreadcrumbComponent.prototype.ngOnInit = function () {
        this.breadcrumb = this.routerService.breadcrumb.map(function (paths) {
            return paths.map(function (path) {
                if (path.indexOf('?') !== -1) {
                    path = path.substring(0, path.indexOf('?'));
                }
                if (path.indexOf('user') !== -1) {
                    path = path.replace('user', '');
                }
                return path;
            }).map(function (item) {
                item = item.replace('/', '').substr(item.lastIndexOf('/'));
                if (item && item.length > 0) {
                    return item;
                }
            }).filter(function (item) { return item ? true : false; });
        });
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
    __metadata("design:paramtypes", [router_1.Router,
        services_1.RouterService])
], ContextBreadcrumbComponent);
exports.ContextBreadcrumbComponent = ContextBreadcrumbComponent;
//# sourceMappingURL=breadcrumb.component.js.map