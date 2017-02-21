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
// Services
var storage_service_1 = require('../storage.service');
var contact_service_1 = require('../contact.service');
var message_service_1 = require('../message.service');
var HypertyResource_1 = require('../../models/rethink/HypertyResource');
var models_1 = require('../../models/models');
var ContextService = (function () {
    function ContextService(localStorage, contactService, messageService) {
        // this.contactService.newUser.subscribe((user:User) => this.updateContextUsers(user));
        // this.messageService.newMessage.subscribe((message:Message) => this.updateContextMessages(message));
        this.localStorage = localStorage;
        this.contactService = contactService;
        this.messageService = messageService;
        // activities: [Activity] = [
        //   { contact: this.contacts[1], type: 'message', status: 'ok', date: '20/07/2014, 15:36', message: 'Lorem ipsum dolor sit amet, vix eu exerci efficiantur, antiopam indoctum usu et. Vis te quot' },
        //   { contact: this.contacts[3], type: 'video-call', status: 'failed', date: 'at 12:32' },
        //   { contact: this.contacts[2], type: 'audio-call', status: 'ok', date: 'yesterday, at 14:30', duration: 6 },
        //   { contact: this.contacts[2], type: 'audio-call', status: 'failed', date: 'Yesterday, at 14:30' },
        //   { contact: this.contacts[0], type: 'file-share', status: 'ok', date: 'at 14:30' }
        // ]
        this.cxtTrigger = new Set();
        this.cxtList = new Map();
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
            _this.createContextTrigger(_this.contextPath).then(function (contextTrigger) {
                // TODO Create the verification to reuse a context, because at this moment we can't reuse a communication or connection dataObject;
                var context;
                if (!_this.localStorage.hasObject(dataObject.data.name)) {
                    console.info('[Create a new context: ]', dataObject.data.name);
                    context = new models_1.ContextualComm({
                        url: dataObject.url,
                        name: dataObject.data.name,
                        description: 'Description of the context',
                    });
                    var communication = (dataObject.data);
                    communication.resources = [HypertyResource_1.HypertyResourceType.chat];
                    // set the communication to the Context
                    context.communication = communication;
                    // Set the active context
                    _this.activeContext = context;
                    context.users = dataObject.data.participants.map(function (item) {
                        _this.contactService.addUser(item);
                        return new models_1.User(item);
                    });
                    // Set this context to the context triggers;
                    contextTrigger.trigger.push(context);
                }
                else {
                    console.info('[Get the context to localStorage: ]', dataObject.data.name);
                    context = _this.localStorage.getObject(dataObject.data.name);
                }
                console.info('[Active Context: ]', context);
                _this.activeContext = context;
                context.url = dataObject.url,
                    context.communication = (dataObject.data);
                if (parent)
                    context.parent = parent;
                // Update the localStorage context
                _this.localStorage.setObject(context.name, context);
                resolve(context);
            });
        });
    };
    ContextService.prototype.createContextTrigger = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Contextual Comm Trigger Service - Get Localstorage] ', name);
            if (!_this.localStorage.hasObject('trigger-' + name)) {
                console.info('[Create a new ContextualTrigger]', name, parent);
                var contextName = name;
                var contextScheme = 'context';
                var contextResource = [HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.chat];
                var contextTrigger = new models_1.ContextualCommTrigger(null, contextName, contextScheme, contextResource);
                /*let contextValue:ContextValues = {
                  name: 'location',
                  unit: 'rad',
                  value: 0,
                  sum: 0
                }*/
                // Update the localStorage contextTrigger
                _this.localStorage.setObject('trigger-' + contextTrigger.contextName, contextTrigger);
                // Set the active context trigger;
                _this.activeContextTrigger = contextTrigger;
                _this.cxtTrigger.add(contextTrigger);
                // Resolve the context trigger
                resolve(contextTrigger);
            }
            else {
                console.info('[Get the exist ContextualTrigger]', name);
                var contextualCommTrigger = _this.localStorage.getObject('trigger-' + name);
                resolve(contextualCommTrigger);
            }
        });
    };
    ContextService.prototype.updateContextMessages = function (message) {
        console.log('Active Context:', this.activeContext);
        var contextName = this.activeContext.name;
        var context = this.activeContext;
        context.messages.push(message);
        this.localStorage.setObject(contextName, context);
        console.log('[Context Update messages]', contextName, context);
    };
    ContextService.prototype.updateContextUsers = function (user) {
        console.log('Active Context:', this.activeContext);
        var contextName = this.activeContext.name;
        var context = this.activeContext;
        context.users.push(user);
        this.localStorage.setObject(contextName, context);
        console.log('[Context Update contacts]', contextName, context);
    };
    ContextService.prototype.getContextByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var context;
            if (_this.localStorage.hasObject(name)) {
                context = _this.localStorage.getObject(name);
                // TODO: Solve the problem of active context
                _this.activeContext = context;
                resolve(context);
            }
            else {
                reject('No context found');
            }
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
    ContextService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.LocalStorage, contact_service_1.ContactService, message_service_1.MessageService])
    ], ContextService);
    return ContextService;
}());
exports.ContextService = ContextService;
//# sourceMappingURL=context.service.js.map