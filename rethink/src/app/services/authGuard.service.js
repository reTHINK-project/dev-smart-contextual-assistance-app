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
var rethink_service_1 = require('./rethink/rethink.service');
var chat_service_1 = require('./rethink/chat.service');
var AuthGuard = (function () {
    function AuthGuard(rethinkService, chatService, router) {
        this.rethinkService = rethinkService;
        this.chatService = chatService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    console.log('CAN ACTIVATE? ', value);
                    if (value) {
                        resolve(value);
                    }
                }
            });
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [rethink_service_1.RethinkService, chat_service_1.ChatService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=authGuard.service.js.map