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
// Service
var services_1 = require('./services');
var ContextualCommResolver = (function () {
    function ContextualCommResolver(router, chatService, messageService, rethinkService, contextService) {
        this.router = router;
        this.chatService = chatService;
        this.messageService = messageService;
        this.rethinkService = rethinkService;
        this.contextService = contextService;
    }
    ContextualCommResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var context = route.params['trigger'];
            var task = route.params['id'];
            var user = route.params['user'];
            var participants = [];
            var domains = [];
            console.log('[ContextualCommResolver - resolve] - ', route);
            console.log('[ContextualCommResolver - resolve] - ', 'Context: ', context, 'Task: ', task, 'User: ', user);
            var name = context;
            _this.contextService.setContextPath = context;
            if (task) {
                _this.contextService.setTaskPath = task;
                name = task;
                context = route.parent.params['trigger'];
            }
            if (user) {
                name = user;
                context = route.parent.params['trigger'];
                participants.push(name);
            }
            _this.contextService.getContextByName(name).then(function (contextualComm) {
                console.info('[ContextualCommResolver - resolve] - Getting the current Context ', name, contextualComm);
                resolve(contextualComm);
            }).catch(function (error) {
                console.error('error:', error);
                console.info('[ContextualCommResolver - resolve] - Creating the context ', name, context, ' chat group');
                _this.chatService.create(name, participants, domains).then(function (chatController) {
                    console.log('Create chat service for all my contacts', chatController);
                    return _this.contextService.create(name, chatController.dataObject, context);
                }, function (error) {
                    console.log('Error creating the context: ', error);
                    reject(error);
                }).then(function (contextualComm) {
                    resolve(contextualComm);
                });
            });
        });
    };
    ContextualCommResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, services_1.ChatService, services_1.MessageService, services_1.RethinkService, services_1.ContextService])
    ], ContextualCommResolver);
    return ContextualCommResolver;
}());
exports.ContextualCommResolver = ContextualCommResolver;
//# sourceMappingURL=contextualComm.resolver.js.map