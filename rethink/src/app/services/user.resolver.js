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
// Service
var contact_service_1 = require("./contact.service");
var services_1 = require("./services");
var UserResolver = (function () {
    function UserResolver(rethinkService, chatService, ContextualCommService, contactService, router) {
        this.rethinkService = rethinkService;
        this.chatService = chatService;
        this.ContextualCommService = ContextualCommService;
        this.contactService = contactService;
        this.router = router;
    }
    UserResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var selectedUser = decodeURIComponent(route.params['user']);
            console.log(selectedUser);
            var user = _this.contactService.getByUserName(selectedUser);
            console.log('[User Resolver] - ', user);
            if (user) {
                resolve(user);
            }
            else {
                reject('no user found');
            }
        });
    };
    return UserResolver;
}());
UserResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [services_1.RethinkService,
        services_1.ChatService,
        services_1.ContextualCommService,
        contact_service_1.ContactService,
        router_1.Router])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map