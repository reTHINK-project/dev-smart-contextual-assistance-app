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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var utils_1 = require("../utils/utils");
// Services
var contextualComm_service_1 = require("./contextualComm.service");
var chat_service_1 = require("./rethink/chat.service");
var contact_service_1 = require("./contact.service");
var ContextualCommDataService = (function () {
    function ContextualCommDataService(location, router, chatService, contactService, contextualCommService) {
        this.router = router;
        this.chatService = chatService;
        this.contactService = contactService;
        this.contextualCommService = contextualCommService;
        this.location = location;
    }
    ContextualCommDataService.prototype.createContext = function (name, parentNameId, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.contextualCommService.getContextByName(name)
                .then(function (context) {
                console.info('[ContextualCommData Service] - context found: ', context);
                resolve(context);
            }).catch(function (reason) {
                var normalizedName = utils_1.normalizeName(name, parentNameId);
                console.info('[ContextualCommData Service] - no contexts was found: ', reason);
                console.info('[ContextualCommData Service] - creating new context: ', name, normalizedName);
                _this.chatService.create(normalizedName.id, [], []).then(function (controller) {
                    console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
                    console.info('[ContextualCommData Service] - creating new contexts: ', controller, normalizedName.parent);
                    return _this.contextualCommService.create(name, controller.dataObject, normalizedName.parent, contextInfo);
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
            console.info('[ContextualCommData Service] - join: ', name);
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
                console.info('[ContextualCommData Service] - creating new contexts: ', controller, activeContext);
                return _this.contextualCommService.create(normalizedName.name, controller.dataObject, normalizedName.parent);
            }).then(function (context) {
                console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
                resolve(context);
            }).catch(function (reason) {
                console.error('Reason:', reason);
            });
        });
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
    ContextualCommDataService.prototype.activeContext = function () {
        var contextualComm = this.contextualCommService.getActiveContext;
        if (contextualComm) {
            return contextualComm;
        }
        else {
            throw new Error('No Contextual Comm Active');
        }
    };
    ContextualCommDataService.prototype.getContext = function (name) {
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            var found = contexts.filter(function (context) { return utils_1.filterContextsByName(name, context); })[0];
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
    ContextualCommDataService.prototype.getContextByResource = function (resource) {
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            return contexts.filter(function (context) {
                return context.url === resource;
            })[0];
        });
    };
    ContextualCommDataService.prototype.currentContext = function () {
        return this.contextualCommService.currentContext();
    };
    ContextualCommDataService.prototype.filterContextsById = function (id, context) {
        if (id.includes('@')) {
            var base = id.substr(0, id.lastIndexOf('/') + 1);
            var user = id.substr(id.lastIndexOf('/') + 1);
            var users = user.split('-');
            var variation1 = base + users[0] + '-' + users[1];
            var variation2 = base + users[1] + '-' + users[0];
            if (context.id === variation1) {
                id = variation1;
            }
            else if (context.id === variation2) {
                id = variation2;
            }
        }
        console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
        return context.id === id;
    };
    return ContextualCommDataService;
}());
ContextualCommDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [common_1.Location,
        router_1.Router,
        chat_service_1.ChatService,
        contact_service_1.ContactService,
        contextualComm_service_1.ContextualCommService])
], ContextualCommDataService);
exports.ContextualCommDataService = ContextualCommDataService;
//# sourceMappingURL=contextualCommData.service.js.map