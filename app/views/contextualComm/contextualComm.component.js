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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
// Services
var services_1 = require('../../services/services');
var add_user_component_1 = require('../userView/add-user.component');
var ContextualCommComponent = (function () {
    function ContextualCommComponent(router, route, chatService, appService, messageService, contextService, contactService) {
        this.router = router;
        this.route = route;
        this.chatService = chatService;
        this.appService = appService;
        this.messageService = messageService;
        this.contextService = contextService;
        this.contactService = contactService;
        this.hostClass = 'context-view';
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
        this.contextService.contextualComm().subscribe(function (contextualComm) {
            console.log('[ContextualComm Component - update] - ', contextualComm, contextualComm.users);
            _this.users.next(contextualComm.users);
        });
    };
    ContextualCommComponent.prototype.onContactClick = function (user) {
        console.log('(contact-click)', user, this.router);
        this.router.navigate([this.router.url, user.username]);
    };
    ContextualCommComponent.prototype.onContactAdd = function () {
        this.addView.toogle();
    };
    ContextualCommComponent.prototype.onCloseEvent = function () {
        this.addView.toogle();
    };
    ContextualCommComponent.prototype.onInviteEvent = function (value) {
        console.log('Invite some one: ', value);
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContextualCommComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.ViewChild(add_user_component_1.AddUserComponent), 
        __metadata('design:type', add_user_component_1.AddUserComponent)
    ], ContextualCommComponent.prototype, "addView", void 0);
    ContextualCommComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'context-view',
            templateUrl: './contextualComm.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, services_1.ChatService, services_1.RethinkService, services_1.MessageService, services_1.ContextService, services_1.ContactService])
    ], ContextualCommComponent);
    return ContextualCommComponent;
}());
exports.ContextualCommComponent = ContextualCommComponent;
//# sourceMappingURL=contextualComm.component.js.map