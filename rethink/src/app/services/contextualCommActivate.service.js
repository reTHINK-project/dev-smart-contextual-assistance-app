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
// Services
var contact_service_1 = require("./contact.service");
var contextualComm_service_1 = require("./contextualComm.service");
// Rethink Services
var chat_service_1 = require("./rethink/chat.service");
var rethink_service_1 = require("./rethink/rethink.service");
var ContextualCommActivateService = (function () {
    function ContextualCommActivateService(router, chatService, contactService, rethinkService, contextualCommService) {
        this.router = router;
        this.chatService = chatService;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
    }
    ContextualCommActivateService.prototype.canActivateChild = function (route, state) {
        var _this = this;
        return new Promise(function (resolve) {
            var context = route.params['context'];
            var task = route.params['task'];
            var user = route.params['user'];
            var name = '';
            if (context) {
                name = context;
            }
            ;
            if (task) {
                name = task;
            }
            ;
            if (user) {
                name = _this.atomicContextualComm(user);
            }
            ;
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        _this.contextualCommService.getContextByName(name)
                            .then(function (context) {
                            console.log('[Can Activate Route] - ', context.url);
                            _this.chatService.activeDataObjectURL = context.url;
                            _this.contextualCommService.setActiveContext = context.url;
                            console.log('[Can Activate Route] - ', context.url);
                            resolve(true);
                        })
                            .catch(function (reason) {
                            console.log('[Can Activate Route] - ', reason);
                            resolve(true);
                        });
                    }
                }
            });
        });
    };
    ContextualCommActivateService.prototype.atomicContextualComm = function (user) {
        var currentUser = this.contactService.sessionUser.username;
        var invitedUser = user;
        return currentUser + '-' + invitedUser;
    };
    return ContextualCommActivateService;
}());
ContextualCommActivateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        chat_service_1.ChatService,
        contact_service_1.ContactService,
        rethink_service_1.RethinkService,
        contextualComm_service_1.ContextualCommService])
], ContextualCommActivateService);
exports.ContextualCommActivateService = ContextualCommActivateService;
//# sourceMappingURL=contextualCommActivate.service.js.map