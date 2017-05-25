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
// Utils
var utils_1 = require("../utils/utils");
// Service
var contextualCommData_service_1 = require("./contextualCommData.service");
var contextualComm_service_1 = require("./contextualComm.service");
var triggerAction_service_1 = require("./triggerAction.service");
var contact_service_1 = require("./contact.service");
var ContextualCommDataResolver = (function () {
    function ContextualCommDataResolver(router, contactService, triggerActionService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.contactService = contactService;
        this.triggerActionService = triggerActionService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ContextualCommDataResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
                name = _this.contextualCommDataService.normalizeAtomicName(_this.atomicContextualComm(user));
            }
            ;
            var normalizedName = utils_1.normalizeName(name);
            console.log('[ContextualCommData - Resolve] - normalized name:', normalizedName);
            _this.contextualCommDataService.getContext(normalizedName.name).subscribe({
                next: function (contextualComm) { return resolve(contextualComm); },
                error: function (reason) {
                    console.log('[ContextualCommData - Resolve] - user:', user);
                    // if (user) {
                    //   return this.contextualCommDataService.createAtomicContext(user, normalizedName.id, normalizedName.parent)
                    //   .then(context => resolve(context))
                    //   .catch(reason => reject(reason));
                    // } else {
                    //   this.triggerActionService.trigger(TriggerActions.OpenContextMenuCreator);
                    //   reject(reason);
                    // }
                }
            });
        });
    };
    ContextualCommDataResolver.prototype.atomicContextualComm = function (user) {
        var currentUser = this.contactService.sessionUser.username;
        var invitedUser = user;
        return currentUser + '-' + invitedUser;
    };
    return ContextualCommDataResolver;
}());
ContextualCommDataResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        contact_service_1.ContactService,
        triggerAction_service_1.TriggerActionService,
        contextualComm_service_1.ContextualCommService,
        contextualCommData_service_1.ContextualCommDataService])
], ContextualCommDataResolver);
exports.ContextualCommDataResolver = ContextualCommDataResolver;
//# sourceMappingURL=contextualCommData.resolver.js.map