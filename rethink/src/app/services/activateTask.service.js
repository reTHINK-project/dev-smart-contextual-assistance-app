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
// Services
var contextualCommData_service_1 = require("./contextualCommData.service");
var contextualComm_service_1 = require("./contextualComm.service");
var rethink_service_1 = require("./rethink/rethink.service");
var chat_service_1 = require("./rethink/chat.service");
var ActivateTaskGuard = (function () {
    function ActivateTaskGuard(router, chatService, rethinkService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.chatService = chatService;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ActivateTaskGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        var path = state.url;
                        var context = route.params['context'];
                        var task = route.params['task'];
                        var normalizedPath = utils_1.normalizeFromURL(path, _this.rethinkService.getCurrentUser.username);
                        console.log('[Activate Task Guard] - ', context, task, state, normalizedPath);
                        var normalizedName = utils_1.normalizeName(normalizedPath);
                        console.log('[Activate Task Guard - Activate] - normalized path: ', normalizedPath);
                        console.log('[Activate Task Guard - Activate] - normalized name: ', normalizedName);
                        _this.contextualCommDataService.getContextById(normalizedName.id).subscribe(function (context) {
                            _this.activateContext(context);
                            resolve(true);
                        }, function (reason) {
                            console.log('[Activate Task Guard - Activate] - Can not activate - reason: ', reason);
                            _this.goHome();
                            resolve(false);
                        });
                    }
                }
            });
        });
    };
    ActivateTaskGuard.prototype.goHome = function () {
        console.log('[Activate Task Guard - Activate] - Can not activate - Home ');
        this.router.navigate(['/']);
    };
    ActivateTaskGuard.prototype.activateContext = function (context) {
        console.log('[Activate Task Guard - Activate] - Can Activate Route - ', context.url);
        this.chatService.activeDataObjectURL = context.url;
        this.contextualCommService.setActiveContext = context.url;
    };
    return ActivateTaskGuard;
}());
ActivateTaskGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        chat_service_1.ChatService,
        rethink_service_1.RethinkService,
        contextualComm_service_1.ContextualCommService,
        contextualCommData_service_1.ContextualCommDataService])
], ActivateTaskGuard);
exports.ActivateTaskGuard = ActivateTaskGuard;
//# sourceMappingURL=activateTask.service.js.map