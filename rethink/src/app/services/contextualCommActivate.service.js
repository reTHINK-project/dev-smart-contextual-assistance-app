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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
// import 'rxjs/add/operator/take';
// import 'rxjs/add/combination/merge';
var config_1 = require("../config");
// Utils
var utils_1 = require("../utils/utils");
// Services
var contact_service_1 = require("./contact.service");
var contextualComm_service_1 = require("./contextualComm.service");
var contextualCommData_service_1 = require("./contextualCommData.service");
// Rethink Services
var chat_service_1 = require("./rethink/chat.service");
var rethink_service_1 = require("./rethink/rethink.service");
var ContextualCommActivateService = (function () {
    function ContextualCommActivateService(router, titleService, chatService, contactService, rethinkService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.titleService = titleService;
        this.chatService = chatService;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ContextualCommActivateService.prototype.canActivateChild = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        var context = route.params['context'];
                        var task = route.params['task'];
                        var user_1 = route.params['user'];
                        var name_1 = '';
                        var title = '';
                        if (context) {
                            name_1 = context;
                            title = context;
                        }
                        ;
                        if (task) {
                            name_1 = task;
                            title = task;
                        }
                        ;
                        if (user_1) {
                            title = user_1;
                            name_1 = user_1;
                        }
                        ;
                        _this.titleService.setTitle(config_1.config.pageTitlePrefix + title);
                        var path = state.url;
                        console.log('[ContextualCommData - Activate] - path: ', path, name_1);
                        var normalizedPath_1 = utils_1.normalizeFromURL(path, _this.rethinkService.getCurrentUser.username);
                        var normalizedName_1 = utils_1.normalizeName(normalizedPath_1);
                        console.log('[ContextualCommData - Activate] - normalized path: ', normalizedPath_1);
                        console.log('[ContextualCommData - Activate] - normalized name: ', normalizedName_1);
                        _this.contextualCommDataService.getContextById(normalizedName_1.id).subscribe(function (context) {
                            _this.activateContext(context);
                            resolve(true);
                        }, function (reason) {
                            // Observable.merge()
                            // Get the parent
                            _this.contextualCommDataService.getContextById(normalizedName_1.parent).subscribe(function (context) {
                                var invitedUser = _this.contactService.getUser(user_1);
                                console.log('[ContextualCommData - Activate] - parent context and user found: ', normalizedPath_1);
                                if (context && user_1 && invitedUser) {
                                    _this.contextualCommDataService.createAtomicContext(user_1, normalizedName_1.id, normalizedName_1.parent)
                                        .then(function (context) {
                                        _this.activateContext(context);
                                        resolve(true);
                                    })
                                        .catch(function (reason) {
                                        console.log('[ContextualCommData - Activate] - Can Not Activate Route:', reason);
                                        _this.goHome();
                                        resolve(false);
                                    });
                                }
                                else {
                                    console.log('[ContextualCommData - Activate] - Can Not Activate Route:', 'Parent context not found');
                                    _this.goHome();
                                    resolve(false);
                                }
                            }, function (reason) {
                                console.log('[ContextualCommData - Activate] - Can Not Activate Route:', reason);
                                _this.goHome();
                                resolve(false);
                            });
                        });
                    }
                }
            });
        });
    };
    ContextualCommActivateService.prototype.goHome = function () {
        console.log('[ContextualCommData - Activate] - home');
        this.router.navigate(['/']);
    };
    ContextualCommActivateService.prototype.activateContext = function (context) {
        console.log('[ContextualCommData - Activate] - Can Activate Route - ', context.url);
        this.chatService.activeDataObjectURL = context.url;
        this.contextualCommService.setActiveContext = context.url;
    };
    return ContextualCommActivateService;
}());
ContextualCommActivateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        platform_browser_1.Title,
        chat_service_1.ChatService,
        contact_service_1.ContactService,
        rethink_service_1.RethinkService,
        contextualComm_service_1.ContextualCommService,
        contextualCommData_service_1.ContextualCommDataService])
], ContextualCommActivateService);
exports.ContextualCommActivateService = ContextualCommActivateService;
//# sourceMappingURL=contextualCommActivate.service.js.map