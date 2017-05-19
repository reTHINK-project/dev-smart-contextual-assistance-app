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
// Service
var contextualCommData_service_1 = require("./contextualCommData.service");
var contextualComm_service_1 = require("./contextualComm.service");
var services_1 = require("./services");
var ContextualCommDataResolver = (function () {
    function ContextualCommDataResolver(router, chatService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.chatService = chatService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ContextualCommDataResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var context = route.params['context'];
            var task = route.params['task'];
            var name = '';
            if (context) {
                name = context;
            }
            ;
            if (task) {
                name = task;
            }
            ;
            _this.contextualCommDataService.getContext(name).subscribe({
                next: function (contextualComm) {
                    _this.contextualCommService.activeContext = contextualComm.url;
                    _this.chatService.activeDataObjectURL = contextualComm.url;
                    resolve(contextualComm);
                },
                error: function (reason) {
                    console.log('[ContextualCommData - Resolver] - ', reason);
                    reject(reason);
                }
            });
        });
    };
    return ContextualCommDataResolver;
}());
ContextualCommDataResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        services_1.ChatService,
        contextualComm_service_1.ContextualCommService,
        contextualCommData_service_1.ContextualCommDataService])
], ContextualCommDataResolver);
exports.ContextualCommDataResolver = ContextualCommDataResolver;
//# sourceMappingURL=contextualCommData.resolver.js.map