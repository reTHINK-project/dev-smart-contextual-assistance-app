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
var platform_browser_1 = require("@angular/platform-browser");
var config_1 = require("../config");
// Utils
var utils_1 = require("../utils/utils");
// Service
var contextualCommData_service_1 = require("./contextualCommData.service");
var contextualComm_service_1 = require("./contextualComm.service");
var triggerAction_service_1 = require("./triggerAction.service");
var contact_service_1 = require("./contact.service");
var ContextualCommDataResolver = (function () {
    function ContextualCommDataResolver(router, titleService, contactService, triggerActionService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.titleService = titleService;
        this.contactService = contactService;
        this.triggerActionService = triggerActionService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ContextualCommDataResolver.prototype.resolve = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var context = route.params['context'];
            var task = route.params['task'];
            var user = route.params['user'];
            var path = state.url;
            var name = '';
            var title = '';
            if (context) {
                name = context;
                title = context;
            }
            ;
            if (task) {
                name = task;
                title = task;
            }
            ;
            if (user) {
                name = user;
                title = user;
            }
            ;
            _this.titleService.setTitle(config_1.config.pageTitlePrefix + title);
            name = utils_1.normalizeFromURL(path, _this.contactService.sessionUser.username);
            var normalizedName = utils_1.normalizeName(name);
            console.log('[ContextualCommData - Resolve] - normalized name:', name, task, normalizedName, path, user);
            if (utils_1.isAnUser(normalizedName.name)) {
                _this.contextualCommDataService.getContext(normalizedName.name).subscribe({
                    next: function (contextualComm) { return resolve(contextualComm); },
                    error: function (reason) {
                        console.log('[ContextualCommData - Resolve] - user:', reason);
                        reject(reason);
                        _this.goHome();
                    }
                });
            }
            else {
                _this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
                    next: function (contextualComm) { return resolve(contextualComm); },
                    error: function (reason) {
                        console.log('[ContextualCommData - Resolve] - task or context:', reason);
                        reject(reason);
                        _this.goHome();
                    }
                });
            }
        });
    };
    ContextualCommDataResolver.prototype.goHome = function () {
        console.log('[ContextualCommData - Resolve] - Can not resolve - Home ');
        this.router.navigate(['/']);
    };
    ContextualCommDataResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            contact_service_1.ContactService,
            triggerAction_service_1.TriggerActionService,
            contextualComm_service_1.ContextualCommService,
            contextualCommData_service_1.ContextualCommDataService])
    ], ContextualCommDataResolver);
    return ContextualCommDataResolver;
}());
exports.ContextualCommDataResolver = ContextualCommDataResolver;
//# sourceMappingURL=contextualCommData.resolver.js.map