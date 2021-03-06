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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/startWith");
// utils
var utils_1 = require("../utils/utils");
// Services
var storage_service_1 = require("./storage.service");
var contact_service_1 = require("./contact.service");
// Interfaces
var models_1 = require("../models/models");
var HypertyResource_1 = require("../models/rethink/HypertyResource");
var ContextualCommService = (function () {
    function ContextualCommService(localStorage, contactService) {
        var _this = this;
        this.localStorage = localStorage;
        this.contactService = contactService;
        this.cxtList = new Map();
        this._contextualCommUpdates = new Subject_1.Subject();
        this._newContextualComm = new Subject_1.Subject();
        this._currentContext = new Subject_1.Subject();
        this.contextualCommEvent = new core_1.EventEmitter();
        this._contextualCommList = this._contextualCommUpdates
            .map(function (context) {
            context.users = context.users.map(function (user) {
                return _this.contactService.getUser(user.userURL);
            }).filter(function (user) {
                return user.userURL !== _this.contactService.sessionUser.userURL;
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
                _this._currentContext.next(context);
            }
            else {
                var count_1 = 0;
                context.messages.forEach(function (message) {
                    var currentUser;
                    if (message.user.userURL !== _this.contactService.sessionUser.userURL) {
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
        this._newContextualComm.subscribe(this._contextualCommUpdates);
        // TODO: check why we need this, HOT something
        this._contextualCommList.subscribe(function (list) {
            console.log('LIST:', list);
        });
        if (this.localStorage.hasObject('contexts')) {
            var mapObj = this.localStorage.getObject('contexts');
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentContext = new models_1.ContextualComm(mapObj[k]);
                    this.cxtList.set(k, currentContext);
                    this._newContextualComm.next(currentContext);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _c;
    }
    Object.defineProperty(ContextualCommService.prototype, "getActiveContext", {
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
            this._currentContext.next(this.currentActiveContext);
        },
        enumerable: true,
        configurable: true
    });
    ContextualCommService.prototype._filterByName = function (idName) {
        var found;
        this.cxtList.forEach(function (context) {
            console.log('[Contextual Comm Service] - ', context, idName);
            if (!found) {
                found = context.id === idName ? context : null;
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
            _this._newContextualComm.next(context);
            resolve(context);
        });
    };
    ContextualCommService.prototype.createContextualComm = function (name, dataObject, parent, contextInfo) {
        var _this = this;
        var data = JSON.parse(JSON.stringify(dataObject.data));
        var metadata = JSON.parse(JSON.stringify(dataObject.metadata));
        var isReporter = contextInfo && contextInfo.reporter ? contextInfo.reporter : false;
        var icon = contextInfo && contextInfo.icon ? contextInfo.icon : '';
        console.log('[Contextual Comm Service] -  createContextualComm: ', name, data, metadata, parent, dataObject);
        var contextualComm = new models_1.ContextualComm({
            icon: icon,
            name: name,
            url: metadata.url,
            id: metadata.name,
            parent: parent ? parent.url : '',
            description: metadata.description || '',
            reporter: isReporter
        });
        var participants = data.participants || {};
        Object.keys(participants).forEach(function (item) {
            console.log('MAP:', item, participants[item]);
            var currentUser = _this.contactService.getUser(item);
            if (!currentUser) {
                currentUser = new models_1.User(participants[item].identity.userProfile);
                _this.contactService.addUser(currentUser);
                console.log('[Context Service - update users] - create new user: ', currentUser);
            }
            contextualComm.addUser(currentUser);
        });
        var communication = (metadata);
        communication.resources = [HypertyResource_1.HypertyResourceType.Chat];
        contextualComm.communication = communication;
        console.log('[Context Service - createContextualComm] - New ContextualComm:', contextualComm);
        this.contextualCommEvent.emit({
            type: 'add',
            contextualComm: contextualComm
        });
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
        this._newContextualComm.next(context);
        console.log('[Context Service - update messages]', context.name, context.url, context);
    };
    ContextualCommService.prototype.updateContextUsers = function (user, url) {
        console.log('[Context Service - Update Context User:', user, url);
        console.log('[Context Service - Active Context:', this.cxtList, this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addUser(user);
        // Update the contact list
        this.contactService.addUser(user);
        this._newContextualComm.next(context);
        console.log('[Context Service - Update contacts]', context.name, context.url, context);
    };
    ContextualCommService.prototype.getContextByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext;
            _this.cxtList.forEach(function (context) {
                if (name.includes('@')) {
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
                    _this._newContextualComm.next(context);
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
    ContextualCommService.prototype.currentContext = function () {
        return this._currentContext;
    };
    ContextualCommService.prototype.getContextualComms = function () {
        return this._contextualCommList;
    };
    ContextualCommService.prototype.getContextualCommList = function () {
        var all = [];
        try {
            for (var _a = __values(this.cxtList.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var cxt = _b.value;
                all.push(cxt);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return Observable_1.Observable.of(all);
        var e_2, _c;
    };
    ContextualCommService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [storage_service_1.LocalStorage,
            contact_service_1.ContactService])
    ], ContextualCommService);
    return ContextualCommService;
}());
exports.ContextualCommService = ContextualCommService;
//# sourceMappingURL=contextualComm.service.js.map