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
var ActivateUserGuard = (function () {
    function ActivateUserGuard(router, chatService, rethinkService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.chatService = chatService;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ActivateUserGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        var path = state.url;
                        var context = route.params['context'];
                        var user_1 = route.params['user'];
                        var normalizedPath_1 = utils_1.normalizeFromURL(path, _this.rethinkService.getCurrentUser.username);
                        console.log('[Activate User Guard] - ', context, user_1, state, normalizedPath_1);
                        var normalizedName_1 = utils_1.normalizeName(normalizedPath_1);
                        console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath_1);
                        console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName_1);
                        _this.contextualCommDataService.getContext(normalizedName_1.name).subscribe(function (context) {
                            _this.activateContext(context);
                            resolve(true);
                        }, function (reason) {
                            // Get the parent
                            _this.contextualCommDataService.getContextById(normalizedName_1.parent).subscribe(function (context) {
                                console.log('[Activate User Guard - Activate] - parent context and user found: ', normalizedPath_1);
                                console.log('[Activate User Guard - Activate] - parent context and user found: ', context, user_1);
                                if (context && user_1) {
                                    _this.contextualCommDataService.createAtomicContext(user_1, normalizedName_1.name, normalizedName_1.id, normalizedName_1.parent)
                                        .then(function (context) {
                                        _this.activateContext(context);
                                        resolve(true);
                                    })
                                        .catch(function (reason) {
                                        console.log('[Activate User Guard - Activate] - Can Not Activate Route:', reason);
                                        _this.goHome();
                                        resolve(false);
                                    });
                                }
                                else {
                                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', 'Parent context not found');
                                    _this.goHome();
                                    resolve(false);
                                }
                            }, function (reason) {
                                console.log('[Activate User Guard - Activate] - Can Not Activate Route:', reason);
                                _this.goHome();
                                resolve(false);
                            });
                        });
                    }
                }
            });
        });
    };
    ActivateUserGuard.prototype.goHome = function () {
        console.log('[Activate User Guard - Activate] - Can not activate - Home ');
        this.router.navigate(['/']);
    };
    ActivateUserGuard.prototype.activateContext = function (context) {
        console.log('[Activate User Guard - Activate] - Can Activate Route - ', context.url);
        this.chatService.activeDataObjectURL = context.url;
        this.contextualCommService.setActiveContext = context.url;
    };
    return ActivateUserGuard;
}());
ActivateUserGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        chat_service_1.ChatService,
        rethink_service_1.RethinkService,
        contextualComm_service_1.ContextualCommService,
        contextualCommData_service_1.ContextualCommDataService])
], ActivateUserGuard);
exports.ActivateUserGuard = ActivateUserGuard;
//# sourceMappingURL=activateUser.service.js.map