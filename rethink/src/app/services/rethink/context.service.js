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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/filter');
// utils
var utils_1 = require('../../utils/utils');
// Services
var storage_service_1 = require('../storage.service');
var contact_service_1 = require('../contact.service');
var message_service_1 = require('../message.service');
var HypertyResource_1 = require('../../models/rethink/HypertyResource');
var models_1 = require('../../models/models');
var ContextService = (function () {
    function ContextService(localStorage, contactService, messageService) {
        var _this = this;
        this.localStorage = localStorage;
        this.contactService = contactService;
        this.messageService = messageService;
        this.cxtTrigger = new Map();
        this.cxtList = new Map();
        // `updates` receives _operations_ to be applied to our `messages`
        // it's a way we can perform changes on *all* messages (that are currently 
        // stored in `messages`)
        this._contextualCommUpdates = new Subject_1.Subject();
        this._contextualComm = new Subject_1.Subject();
        if (this.localStorage.hasObject('context-triggers')) {
            var mapObj = this.localStorage.getObject('context-triggers');
            for (var _i = 0, _a = Object.keys(mapObj); _i < _a.length; _i++) {
                var k = _a[_i];
                this.cxtTrigger.set(k, mapObj[k]);
            }
        }
        var contextList = [];
        if (this.localStorage.hasObject('contexts')) {
            var mapObj = this.localStorage.getObject('contexts');
            for (var _b = 0, _c = Object.keys(mapObj); _b < _c.length; _b++) {
                var k = _c[_b];
                var currentContext = new models_1.ContextualComm(mapObj[k]);
                contextList.push(currentContext);
                this.cxtList.set(k, currentContext);
            }
        }
        this._contextualCommList = this._contextualCommUpdates.scan(function (contextualCommList, context) {
            contextualCommList.set(context.url, context);
            return contextualCommList;
        }, this.cxtList)
            .publishReplay(1)
            .refCount();
        this._contextualComm.map(function (context) {
            context.users = context.users.map(function (user) {
                console.log('[Context Service - contextualComm] - typeof: ', user instanceof models_1.User);
                return _this.contactService.getUser(user.userURL);
            });
            context.messages = context.messages.map(function (message) {
                var currentMessage = new models_1.Message(message);
                console.log('[Context Service - contextualComm] - typeof: ', currentMessage.user instanceof models_1.User);
                currentMessage.user = _this.contactService.getUser(currentMessage.user.userURL);
                return currentMessage;
            });
            console.log('[Context Service - contextualComm] - scan', context.url, context);
            _this.updateContexts(context.url, context);
            return context;
        }).subscribe(this._contextualCommUpdates);
    }
    ContextService.prototype.getActiveContext = function (v) {
        return this.localStorage.hasObject(v) ? this.localStorage.getObject(v) : null;
    };
    Object.defineProperty(ContextService.prototype, "setContextPath", {
        set: function (v) {
            this.contextPath = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextService.prototype, "getContextPath", {
        get: function () {
            return this.contextPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextService.prototype, "setTaskPath", {
        set: function (v) {
            this.taskPath = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextService.prototype, "getTaskPath", {
        get: function () {
            return this.taskPath;
        },
        enumerable: true,
        configurable: true
    });
    ContextService.prototype.create = function (name, dataObject, parent) {
        var _this = this;
        // TODO Add the dataObject on Rx.Observable (stream);
        // TODO add a Stream to look on changes for dataObject changes;
        return new Promise(function (resolve, reject) {
            _this.createContextTrigger(name).then(function (contextTrigger) {
                // TODO Create the verification to reuse a context, because at this moment we can't reuse a communication or connection dataObject;
                var context;
                console.info('[Context Trigger] - existing: ', _this.cxtList.has(dataObject.url), contextTrigger);
                if (!_this.cxtList.has(dataObject.url)) {
                    console.info('[Create a new context: ]', dataObject);
                    context = new models_1.ContextualComm({
                        url: dataObject.url,
                        name: dataObject.data.name,
                        description: 'Description of the context',
                    });
                    var communication = (dataObject.data);
                    communication.resources = [HypertyResource_1.HypertyResourceType.chat];
                    // set the communication to the Context
                    context.communication = communication;
                }
                else {
                    console.info('[Get the context to localStorage: ]', dataObject.data);
                    context = _this.cxtList.get(dataObject.data.url);
                }
                dataObject.data.participants.forEach(function (item) {
                    console.log('MAP:', item);
                    var currentUser = _this.contactService.getUser(item.userURL);
                    if (!currentUser) {
                        currentUser = new models_1.User(item);
                        _this.contactService.addUser(currentUser);
                        console.log('[Context Service - update users] - create new user: ', currentUser);
                    }
                    context.addUser(currentUser);
                });
                context.url = dataObject.url,
                    context.communication = (dataObject.data);
                if (parent)
                    context.parent = parent;
                contextTrigger.trigger.push(context);
                _this.updateContextTrigger(contextTrigger.contextName, contextTrigger);
                _this.updateContexts(context.url, context);
                console.info('[Active Context - ContextualComm]', context);
                _this.activeContext = context;
                _this._contextualComm.next(context);
                resolve(context);
            });
        });
    };
    ContextService.prototype.createContextTrigger = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Contextual Comm Trigger Service - Get Localstorage] ', name);
            var contextualCommTriggerName = 'trigger-' + name;
            var contextTrigger;
            if (!_this.cxtTrigger.has(contextualCommTriggerName)) {
                console.info('[Create a new ContextualTrigger]', name, parent);
                var contextName = name;
                var contextScheme = 'context';
                var contextResource = [HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.chat];
                contextTrigger = new models_1.ContextualCommTrigger(null, contextName, contextScheme, contextResource);
                /*let contextValue:ContextValues = {
                  name: 'location',
                  unit: 'rad',
                  value: 0,
                  sum: 0
                }*/
                // Set the active context trigger;
                _this.activeContextTrigger = contextTrigger;
                // Resolve the context trigger
                resolve(contextTrigger);
            }
            else {
                console.info('[Get the exist ContextualTrigger]', name);
                contextTrigger = _this.cxtTrigger.get(contextualCommTriggerName);
                resolve(contextTrigger);
            }
            _this.updateContextTrigger(contextualCommTriggerName, contextTrigger);
        });
    };
    ContextService.prototype.updateContextTrigger = function (name, contextTrigger) {
        var contextTriggerName;
        if (name.includes('trigger')) {
            contextTriggerName = name;
        }
        else {
            contextTriggerName = 'trigger-' + name;
        }
        this.cxtTrigger.set(contextTriggerName, contextTrigger);
        this.localStorage.setObject('context-triggers', utils_1.strMapToObj(this.cxtTrigger));
    };
    ContextService.prototype.updateContexts = function (url, context) {
        this.cxtList.set(url, context);
        this.localStorage.setObject('contexts', utils_1.strMapToObj(this.cxtList));
    };
    ContextService.prototype.updateContextMessages = function (message, url) {
        console.log('[Context Service - Update Context Message:', message, url);
        console.log('[Context Service - Active Context:', this.activeContext, this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addMessage(message);
        this._contextualComm.next(context);
        console.log('[Context Service - update messages]', context.name, context.url, context);
    };
    ContextService.prototype.updateContextUsers = function (user, url) {
        console.log('[Context Service - Update Context User:', user, url);
        console.log('[Context Service - Active Context:', this.activeContext, this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addUser(user);
        // Update the contact list
        this.contactService.addUser(user);
        // this._contextualComm.next(context);
        console.log('[Context Service - Update contacts]', context.name, context.url, context);
    };
    ContextService.prototype.getContextByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext;
            _this.cxtList.forEach(function (context) {
                if (context.name === name) {
                    // TODO: Solve the problem of active context
                    currentContext = context;
                    _this.activeContext = currentContext;
                    console.log('[context service - getContextByName] - ', name, currentContext);
                    _this._contextualComm.next(context);
                    return resolve(currentContext);
                }
            });
            reject('No context found');
        });
    };
    ContextService.prototype.getContextByResource = function (resource) {
        // TODO: Optimize this promise to handle with multiple contacts
        return new Promise(function (resolve, reject) {
            /*      let context = this.sourceContextsList.filter((context) => {
                    if(context.url.indexOf(resource) !== -1) return true
                  })
            
                  if (context.length === 1) {
                    resolve(context[0])
                  } else {
                    reject('Context not found');
                  }*/
        });
    };
    ContextService.prototype.getContextUsers = function (context) {
        console.log('this.contactService.getUsers(): ');
        this.contactService.getUsers().subscribe({
            next: function (list) { return console.log('List of contacts:', list); }
        });
        return this.contactService.getUsers();
    };
    ContextService.prototype.getContextMessages = function (context) {
        return this.messageService.messageList;
    };
    ContextService.prototype.contextualComm = function () {
        return this._contextualComm;
    };
    ContextService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.LocalStorage, contact_service_1.ContactService, message_service_1.MessageService])
    ], ContextService);
    return ContextService;
}());
exports.ContextService = ContextService;
//# sourceMappingURL=context.service.js.map