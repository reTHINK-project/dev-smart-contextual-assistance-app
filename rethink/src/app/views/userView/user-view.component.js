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
var UserViewComponent = (function () {
    function UserViewComponent(router, route, chatService) {
        this.router = router;
        this.route = route;
        this.chatService = chatService;
        this.hostClass = '';
        this.audioEvent = new core_1.EventEmitter();
        this.videoEvent = new core_1.EventEmitter();
        this.messages = new BehaviorSubject_1.BehaviorSubject([]);
    }
    UserViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.forEach(function (data) {
            console.log('Resolve data User: ', data.user);
            console.log('Resolve data Context: ', data.context);
            _this.user = data.user;
            _this.messages.next(data.context.messages);
        });
    };
    UserViewComponent.prototype.ngOnDestroy = function () {
        console.log('[User View - onMessage] - OnDestroy', this.messages);
        this.messages.unsubscribe();
    };
    UserViewComponent.prototype.onMessage = function (message) {
        console.log("Message:", message);
        this.chatService.send(message).then(function (message) {
            console.log('[User View - onMessage] - message sent', message);
        });
    };
    UserViewComponent.prototype.onCloseEvent = function () {
        console.log('Close:');
        //history.back();
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], UserViewComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserViewComponent.prototype, "audioEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserViewComponent.prototype, "videoEvent", void 0);
    UserViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[contact-box]',
            templateUrl: './user-view.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, services_1.ChatService])
    ], UserViewComponent);
    return UserViewComponent;
}());
exports.UserViewComponent = UserViewComponent;
//# sourceMappingURL=user-view.component.js.map