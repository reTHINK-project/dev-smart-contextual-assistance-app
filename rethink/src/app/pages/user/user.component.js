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
// Services
var services_1 = require('../../services/services');
var UserComponent = (function () {
    function UserComponent(router, route, chatService, messageService) {
        this.router = router;
        this.route = route;
        this.chatService = chatService;
        this.messageService = messageService;
        this.hostClass = '';
        this.audioEvent = new core_1.EventEmitter();
        this.videoEvent = new core_1.EventEmitter();
        this.chatActive = true;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messages = this.messageService.messageList;
        this.route.data.forEach(function (data) {
            console.log('Resolve data User: ', data.user);
            _this.user = data.user;
        });
    };
    UserComponent.prototype.onMessage = function (message) {
        console.log("Message:", message);
        this.chatService.send(message).then(function (message) {
            console.log('[Activity View - onMessage] - message sent', message);
        });
    };
    UserComponent.prototype.onCloseEvent = function () {
        console.log('Close:');
        //history.back();
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], UserComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserComponent.prototype, "audioEvent", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserComponent.prototype, "videoEvent", void 0);
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[contact-box]',
            templateUrl: './user.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, services_1.ChatService, services_1.MessageService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map