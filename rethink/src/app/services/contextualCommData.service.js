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
var contextualComm_service_1 = require("./contextualComm.service");
var chat_service_1 = require("./rethink/chat.service");
var ContextualCommDataService = (function () {
    function ContextualCommDataService(router, chatService, contextualCommService) {
        this.router = router;
        this.chatService = chatService;
        this.contextualCommService = contextualCommService;
        this.appPrefix = 'sca-';
    }
    ContextualCommDataService.prototype.createContext = function (name, parentNameId, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.contextualCommService.getContextByName(name)
                .then(function (context) {
                console.info('[ContextualCommData Service] - context found: ', context);
                resolve(context);
            }).catch(function (reason) {
                var normalizedName = _this.appPrefix + name.toLowerCase();
                if (parentNameId) {
                    normalizedName = parentNameId + '-' + name.toLowerCase();
                }
                console.info('[ContextualCommData Service] - no contexts was found: ', reason);
                console.info('[ContextualCommData Service] - creating new context: ', name, parentNameId, normalizedName);
                _this.chatService.create(normalizedName, [], []).then(function (controller) {
                    console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
                    console.info('[ContextualCommData Service] - creating new contexts: ', controller, parentNameId);
                    return _this.contextualCommService.create(name, controller.dataObject, parentNameId, contextInfo);
                }).then(function (context) {
                    console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
                    resolve(context);
                }).catch(function (reason) {
                    console.error('Reason:', reason);
                });
            });
        });
    };
    ContextualCommDataService.prototype.joinContext = function (name, dataObject, parentNameId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.info('[ContextualCommData Service] - join: ', name, utils_1.normalizeName(name));
            _this.contextualCommService.getContextByName(name).then(function (context) {
                console.info('[ContextualCommData Service] - communication objects was created successfully: ', dataObject);
                console.info('[ContextualCommData Service] - creating new contexts: ', dataObject, parentNameId);
                resolve(context);
            }).catch(function (reason) {
                console.error('Reason:', reason);
                return _this.contextualCommService.create(name, dataObject, parentNameId);
            }).then(function (context) {
                resolve(context);
            });
        });
    };
    ContextualCommDataService.prototype.createAtomicContext = function (username, name, parentNameId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var normalizedName = utils_1.normalizeName(name);
            var activeContext = _this.contextualCommService.getActiveContext;
            console.log('[ContextualCommData Service] - normalizedName:', normalizedName);
            _this.chatService.create(normalizedName.id, [username], []).then(function (controller) {
                console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
                console.info('[ContextualCommData Service] - creating new contexts: ', controller, activeContext.id);
                return _this.contextualCommService.create(normalizedName.name, controller.dataObject, activeContext.id);
            }).then(function (context) {
                console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
                resolve(context);
            }).catch(function (reason) {
                console.error('Reason:', reason);
            });
        });
    };
    ContextualCommDataService.prototype.normalizeAtomicName = function (name) {
        var activeContext = this.contextualCommService.getActiveContext;
        return activeContext.id + '-' + name;
    };
    /**
     *
     *
     * @returns {Observable<ContextualComm[]>}
     *
     * @memberof ContextualCommDataService
     */
    ContextualCommDataService.prototype.getContexts = function () {
        return this.contextualCommService.getContextualComms()
            .map(function (contexts) { return contexts.filter(function (context) { return context.parent === ''; }); });
    };
    ContextualCommDataService.prototype.getContext = function (name) {
        var _this = this;
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            var found = contexts.filter(function (context) { return _this.filterContextsByName(name, context); })[0];
            console.log('[ContextualCommData Service] - found: ', found);
            if (!found) {
                throw new Error('Context not found');
            }
            return found;
        });
    };
    ContextualCommDataService.prototype.getContextById = function (id) {
        var _this = this;
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            var found = contexts.filter(function (context) { return _this.filterContextsById(id, context); })[0];
            if (!found) {
                throw new Error('Context not found');
            }
            return found;
        });
    };
    ContextualCommDataService.prototype.getTasks = function (url) {
        return this.contextualCommService.getContextualComms().map(function (contexts) { return contexts.filter(function (context) { return context.parent === url; }); });
    };
    ContextualCommDataService.prototype.getUsers = function () {
        return this.contextualCommService.getContextualComms()
            .map(function (contexts) { return contexts.filter(function (context) { return context.name === name; })[0].users; });
    };
    ContextualCommDataService.prototype.filterContextsById = function (id, context) {
        console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
        return context.id === id;
    };
    ContextualCommDataService.prototype.filterContextsByName = function (name, context) {
        if (name.indexOf('-') !== -1 && name.includes('@')) {
            var users = name.split('-');
            var user1 = users[0];
            var user2 = users[1];
            var variation1 = user1 + '-' + user2;
            var variation2 = user2 + '-' + user1;
            if (context.name === variation1) {
                name = variation1;
            }
            else if (context.name === variation2) {
                name = variation2;
            }
        }
        console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
        return context.name === name;
    };
    return ContextualCommDataService;
}());
ContextualCommDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        chat_service_1.ChatService,
        contextualComm_service_1.ContextualCommService])
], ContextualCommDataService);
exports.ContextualCommDataService = ContextualCommDataService;
//# sourceMappingURL=contextualCommData.service.js.map