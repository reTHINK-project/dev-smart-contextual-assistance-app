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
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/empty");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/isEmpty");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/defaultIfEmpty");
// utils
var utils_1 = require("../utils/utils");
// Services
var storage_service_1 = require("./storage.service");
var contact_service_1 = require("./contact.service");
var contextualCommTrigger_service_1 = require("./contextualCommTrigger.service");
// Interfaces
var models_1 = require("../models/models");
var HypertyResource_1 = require("../models/rethink/HypertyResource");
var rethink_service_1 = require("./rethink/rethink.service");
var ContextualCommService = (function () {
    function ContextualCommService(localStorage, rethinkService, contactService, contextualCommTriggerService) {
        var _this = this;
        this.localStorage = localStorage;
        this.rethinkService = rethinkService;
        this.contactService = contactService;
        this.contextualCommTriggerService = contextualCommTriggerService;
        this.cxtList = new Map();
        this._contextualCommUpdates = new Subject_1.Subject();
        this._contextualComm = new Subject_1.Subject();
        this.contextualCommObs = new Subject_1.Subject();
        this._contextualCommList = this._contextualCommUpdates
            .map(function (context) {
            context.users = context.users.map(function (user) {
                return _this.contactService.getUser(user.userURL);
            }).filter(function (user) {
                return user.userURL !== _this.rethinkService.getCurrentUser.userURL;
            });
            context.messages = context.messages.map(function (message) {
                var currentMessage = new models_1.Message(message);
                currentMessage.user = _this.contactService.getUser(currentMessage.user.userURL);
                return currentMessage;
            });
            console.log('[Context Service - contextualCommUpdates] - map', context.url, context);
            return context;
        }).scan(function (contextualCommList, context) {
            console.log('[Context Service - contextualCommUpdates] - scan', context, _this.currentActiveContext);
            if (_this.currentActiveContext && _this.currentActiveContext.url === context.url) {
                context.messages = context.messages.map(function (message) {
                    message.isRead = true;
                    message.user.unread = 0;
                    return message;
                });
                _this.contextualCommObs.next(context);
            }
            else {
                var count_1 = 0;
                context.messages.forEach(function (message) {
                    var currentUser;
                    if (message.user.userURL !== _this.rethinkService.getCurrentUser.userURL) {
                        currentUser = _this.contactService.getUser(message.user.userURL);
                        if (message.isRead === false) {
                            count_1++;
                        }
                        currentUser.unread = count_1;
                    }
                });
            }
            _this.updateContexts(context.url, context);
            if (contextualCommList.indexOf(context) === -1) {
                return contextualCommList.concat(context);
            }
            else {
                return contextualCommList;
            }
        }, [])
            .startWith([])
            .publishReplay(1)
            .refCount();
        this._contextualComm.subscribe(this._contextualCommUpdates);
        // TODO: check why we need this, HOT something
        this._contextualCommList.subscribe(function (list) {
            console.log('LIST:', list);
        });
        if (this.localStorage.hasObject('contexts')) {
            var mapObj = this.localStorage.getObject('contexts');
            for (var _i = 0, _a = Object.keys(mapObj); _i < _a.length; _i++) {
                var k = _a[_i];
                var currentContext = new models_1.ContextualComm(mapObj[k]);
                this.cxtList.set(k, currentContext);
                this._contextualComm.next(currentContext);
            }
        }
    }
    Object.defineProperty(ContextualCommService.prototype, "getActiveContext", {
        // public getActiveContext(v: string): ContextualComm {
        //   return this.localStorage.hasObject(v) ? this.localStorage.getObject(v) as ContextualComm : null;
        // }
        get: function () {
            return this.currentActiveContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "setActiveContext", {
        set: function (value) {
            console.log('[Context Service] - setActiveContext: ', value, this.cxtList.get(value));
            this.currentActiveContext = this.cxtList.get(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "setContextPath", {
        set: function (v) {
            this.contextPath = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "getContextPath", {
        get: function () {
            return this.contextPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "setTaskPath", {
        set: function (v) {
            this.taskPath = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "getTaskPath", {
        get: function () {
            return this.taskPath;
        },
        enumerable: true,
        configurable: true
    });
    ContextualCommService.prototype._filterByName = function (id) {
        var found;
        this.cxtList.forEach(function (context) {
            console.log('[Contextual Comm Service] - ', context.id, id);
            if (!found) {
                found = context.id === id ? context : null;
            }
        });
        return found;
    };
    ContextualCommService.prototype.create = function (name, dataObject, parentNameId, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parentContextualComm = _this._filterByName(parentNameId);
            var newContextURL = dataObject.url;
            var context;
            console.log('[Contextual Comm Service] -  create: ', name, parentContextualComm, parentNameId, newContextURL);
            if (parentContextualComm) {
                var hasChild = parentContextualComm.contexts.find(function (context) {
                    return context && context.url === newContextURL;
                });
                if (!hasChild) {
                    // Create new ContextualComm
                    var current = _this.createContextualComm(name, dataObject, parentContextualComm, contextInfo);
                    // Add the current ContextualComm to his parent;
                    parentContextualComm.contexts.push(current);
                    context = current;
                    _this.updateContexts(parentContextualComm.url, parentContextualComm);
                }
            }
            else {
                if (!_this.cxtList.has(newContextURL)) {
                    // Create new ContextualComm
                    var current = _this.createContextualComm(name, dataObject, undefined, contextInfo);
                    context = current;
                    _this.updateContexts(context.url, context);
                }
            }
            _this._contextualComm.next(context);
            resolve(context);
        });
    };
    ContextualCommService.prototype.createContextualComm = function (name, dataObject, parent, contextInfo) {
        var _this = this;
        var data = JSON.parse(JSON.stringify(dataObject.data));
        var metadata = JSON.parse(JSON.stringify(dataObject.metadata));
        console.log('[Contextual Comm Service] -  createContextualComm: ', name, data, metadata, parent, dataObject);
        var contextualComm = new models_1.ContextualComm({
            icon: contextInfo ? contextInfo.icon : '',
            name: name,
            url: metadata.url,
            id: metadata.name,
            parent: parent ? parent.url : '',
            description: metadata.description || ''
        });
        var participants = data.participants || {};
        Object.keys(participants).forEach(function (item) {
            console.log('MAP:', item, participants[item]);
            var currentUser = _this.contactService.getUser(item);
            if (!currentUser) {
                currentUser = new models_1.User(participants[item].identity);
                _this.contactService.addUser(currentUser);
                console.log('[Context Service - update users] - create new user: ', currentUser);
            }
            contextualComm.addUser(currentUser);
        });
        var communication = (data);
        communication.resources = [HypertyResource_1.HypertyResourceType.chat];
        contextualComm.communication = communication;
        console.log('[Context Service - createContextualComm] - New ContextualComm:', contextualComm);
        return contextualComm;
    };
    ContextualCommService.prototype.updateContexts = function (url, context) {
        this.cxtList.set(url, context);
        this.localStorage.setObject('contexts', utils_1.strMapToObj(this.cxtList));
    };
    ContextualCommService.prototype.updateContextMessages = function (message, url) {
        console.log('[Context Service - Update Context Message:', message, url);
        console.log('[Context Service - Active Context:', this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addMessage(message);
        this._contextualComm.next(context);
        console.log('[Context Service - update messages]', context.name, context.url, context);
    };
    ContextualCommService.prototype.updateContextUsers = function (user, url) {
        console.log('[Context Service - Update Context User:', user, url);
        console.log('[Context Service - Active Context:', this.cxtList, this.cxtList.get(url));
        if (this.cxtList.has(url)) {
            var context = this.cxtList.get(url);
            context.addUser(user);
            // Update the contact list
            this.contactService.addUser(user);
            this._contextualComm.next(context);
            console.log('[Context Service - Update contacts]', context.name, context.url, context);
        }
    };
    ContextualCommService.prototype.getContextByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext;
            _this.cxtList.forEach(function (context) {
                // TODO: this should be removed, because at this moment
                // we do not have any way to destinguish from me-<other-user> or <other-user>-me
                // and the dataObjectURL should be the same
                if (name.indexOf('-') !== -1) {
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
                console.log('[Context Service] - getting Context By Name: ', context, context.name, name);
                if (context.name === name) {
                    // TODO: Solve the problem of active context
                    currentContext = context;
                    console.log('[context service] - found', name, currentContext);
                    _this._contextualComm.next(context);
                    return resolve(currentContext);
                }
            });
            reject('No context found');
        });
    };
    ContextualCommService.prototype.getContextByResource = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext = _this.cxtList.get(resource);
            if (currentContext) {
                resolve(currentContext);
            }
            else {
                reject('No context found');
            }
        });
    };
    ContextualCommService.prototype.getContextUsers = function (context) {
        console.log('this.contactService.getUsers(): ');
        this.contactService.getUsers().subscribe({
            next: function (list) { return console.log('List of contacts:', list); }
        });
        return this.contactService.getUsers();
    };
    ContextualCommService.prototype.contextualComm = function () {
        return this.contextualCommObs;
    };
    ContextualCommService.prototype.getContextualComms = function () {
        return this._contextualCommList;
    };
    return ContextualCommService;
}());
ContextualCommService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [storage_service_1.LocalStorage,
        rethink_service_1.RethinkService,
        contact_service_1.ContactService,
        contextualCommTrigger_service_1.ContextualCommTriggerService])
], ContextualCommService);
exports.ContextualCommService = ContextualCommService;
//# sourceMappingURL=contextualComm.service.js.map