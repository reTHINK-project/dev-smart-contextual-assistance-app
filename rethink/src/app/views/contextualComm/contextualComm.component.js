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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// Services
var services_1 = require("../../services/services");
// Components
var add_user_component_1 = require("../contextualCommUsers/add-user.component");
var ContextualCommComponent = (function () {
    function ContextualCommComponent(router, route, appService, contextualCommService, contactService) {
        this.router = router;
        this.route = route;
        this.appService = appService;
        this.contextualCommService = contextualCommService;
        this.contactService = contactService;
        this.hostClass = 'context-view row no-gutters';
        this.users = new BehaviorSubject_1.BehaviorSubject([]);
    }
    // Load data ones componet is ready
    ContextualCommComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('[ContextualComm View - onInit]');
        this.route.data
            .subscribe(function (data) {
            console.log('Resolved context:', data.context);
            _this.users.next(data.context.users);
            // console.log('Resolved users:', data.users);
        });
        this.contextualCommService.contextualComm().subscribe(function (contextualComm) {
            console.log('[ContextualComm Component - update] - ', contextualComm, contextualComm.users);
            _this.users.next(contextualComm.users);
        });
    };
    ContextualCommComponent.prototype.onInviteEvent = function (value) {
        console.log('Invite some one: ', value);
    };
    ContextualCommComponent.prototype.onCloseEvent = function () {
    };
    ContextualCommComponent.prototype.onContactClick = function () {
    };
    return ContextualCommComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ContextualCommComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.ViewChild(add_user_component_1.AddUserComponent),
    __metadata("design:type", add_user_component_1.AddUserComponent)
], ContextualCommComponent.prototype, "addUserComponent", void 0);
ContextualCommComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'context-view',
        templateUrl: './contextualComm.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        services_1.RethinkService,
        services_1.ContextualCommService,
        services_1.ContactService])
], ContextualCommComponent);
exports.ContextualCommComponent = ContextualCommComponent;
//# sourceMappingURL=contextualComm.component.js.map