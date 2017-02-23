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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/combineLatest');
// Services
var rethink_service_1 = require('./rethink/rethink.service');
var storage_service_1 = require('./storage.service');
var contact_service_1 = require('./contact.service');
// Interfaces
var models_1 = require('../models/models');
var MessageService = (function () {
    function MessageService(appService, localStorage, contactService) {
        this.appService = appService;
        this.localStorage = localStorage;
        this.contactService = contactService;
        this.newMessage = new Subject_1.Subject();
        this.create = new Subject_1.Subject();
        this.updates = new Subject_1.Subject();
        this.init = Array();
        this.messages = this.updates.scan(function (messages, message) {
            console.log('Scan message', messages, message);
            messages.push(message);
            return messages;
        }, this.init)
            .publishReplay(1)
            .refCount();
        this.create.map(function (message, index) {
            // console.log('create message:', message);
            return new models_1.Message(message);
        }).subscribe(this.updates);
        this.newMessage.subscribe(this.create);
        this.bSubject = new BehaviorSubject_1.BehaviorSubject([]);
        this.messageList = this.bSubject.asObservable();
        this.messageList.combineLatest(this.messages, function (messages, values) {
            console.log('COmbine Latest: ', messages, values);
            return messages.concat(values);
        });
    }
    MessageService.prototype.setMessages = function (messages) {
        if (messages === void 0) { messages = []; }
        this.init = [];
        this.bSubject.next(messages);
    };
    MessageService.prototype.reciveMessag = function (message) {
        // let user:User = this.contactService.getContact(message.identity.userProfile.userURL);
        // console.log('Recive Message from user:', user);
        var user;
        if (!user) {
            user = new models_1.User(message.identity.userProfile);
        }
        this.message(user, message);
    };
    MessageService.prototype.addMessage = function (message) {
        var user = this.appService.getCurrentUser;
        this.message(user, message);
    };
    MessageService.prototype.message = function (user, message) {
        var newMessage = new models_1.Message({
            type: 'message',
            message: message.value.message,
            user: user
        });
        this.newMessage.next(newMessage);
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [rethink_service_1.RethinkService, storage_service_1.LocalStorage, contact_service_1.ContactService])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map