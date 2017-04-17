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
var router_1 = require("@angular/router");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// Services
var services_1 = require("../../services/services");
// Components
var contextualCommActivity_component_1 = require("../contextualCommActivity/contextualCommActivity.component");
var UserViewComponent = (function () {
    function UserViewComponent(router, route, contactService, contextService, chatService) {
        this.router = router;
        this.route = route;
        this.contactService = contactService;
        this.contextService = contextService;
        this.chatService = chatService;
        this.hostClass = '';
        this.messages = new BehaviorSubject_1.BehaviorSubject([]);
    }
    UserViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route
            .queryParams
            .subscribe(function (params) {
            console.log('Params Action:', params['action']);
            _this.action = params['action'];
        });
        this.route.data.forEach(function (data) {
            console.log('Resolve data User: ', data.user);
            console.log('Resolve data Context: ', data.context);
            _this.user = data.user;
            _this.messages.next(data.context.messages);
        });
        this.contextService.contextualComm().subscribe(function (contextualComm) {
            console.log('[ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
            _this.contextualCommActivityComponent.updateView();
        });
    };
    UserViewComponent.prototype.ngOnDestroy = function () {
        console.log('[User View] - OnDestroy', this.messages);
        // this.messages.unsubscribe();
    };
    UserViewComponent.prototype.onMessage = function (message) {
        console.log('[User View - onMessage] - Message:', message, this.chatService.chatControllerActive);
        this.chatService.send(message).then(function (message) {
            console.log('[User View - onMessage] - message sent', message);
        });
    };
    UserViewComponent.prototype.onAcceptCall = function () {
        console.log('[User View] - onAcceptCall');
    };
    UserViewComponent.prototype.onRejectCall = function () {
        console.log('[User View] - onRejectCall');
    };
    UserViewComponent.prototype.onCloseEvent = function () {
        history.back();
    };
    return UserViewComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], UserViewComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.ViewChild(contextualCommActivity_component_1.ContextualCommActivityComponent),
    __metadata("design:type", contextualCommActivity_component_1.ContextualCommActivityComponent)
], UserViewComponent.prototype, "contextualCommActivityComponent", void 0);
UserViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'div[user-view]',
        templateUrl: './user-view.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        services_1.ContactService,
        services_1.ContextService,
        services_1.ChatService])
], UserViewComponent);
exports.UserViewComponent = UserViewComponent;
//# sourceMappingURL=user-view.component.js.map