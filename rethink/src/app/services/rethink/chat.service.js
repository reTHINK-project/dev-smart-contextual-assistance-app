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
var rethink_service_1 = require('./rethink.service');
var message_service_1 = require('../message.service');
var contact_service_1 = require('../contact.service');
var context_service_1 = require('../rethink/context.service');
var models_1 = require('../../models/models');
var ChatService = (function () {
    function ChatService(appService, contextService, contactService, messageService) {
        this.appService = appService;
        this.contextService = contextService;
        this.contactService = contactService;
        this.messageService = messageService;
    }
    ChatService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.hypertyURL = 'hyperty-catalogue://catalogue.' + _this.appService.domain + '/.well-known/hyperty/GroupChatManager';
            if (!_this.chatGroupManager) {
                _this.appService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.chatGroupManager = hyperty.instance;
                    _this.hyperty = hyperty;
                    _this.prepareHyperty();
                    resolve(_this.hyperty);
                })
                    .catch(function (reason) {
                    console.error(reason);
                    reject(reason);
                });
            }
            else {
                resolve(_this.hyperty);
            }
        });
    };
    ChatService.prototype.prepareHyperty = function () {
        var _this = this;
        console.log('[Chat Service - prepareHyperty]', this.chatGroupManager.onResume);
        this.chatGroupManager.onResume(function (chatController) {
            console.log('[Chat Service - prepareHyperty] - onResume: ', chatController);
            _this.chatController = chatController;
        });
        this.chatGroupManager.onInvitation(function (event) {
            console.log('[Chat Service - prepareHyperty] - onInvitation', event);
            _this.contactService.addUser(new models_1.User(event.identity.userProfile));
            _this.join(event.url).then(function (a) {
                console.log(a);
            }).catch(function (reason) {
                console.log(reason);
            });
            if (_this._onInvitation)
                _this._onInvitation(event);
        });
    };
    ChatService.prototype.prepareController = function () {
        var _this = this;
        this.chatController.onUserAdded(function (user) {
            console.log('[Chat Service - prepareHyperty] - onUserAdded', user);
            var current;
            if (user.hasOwnProperty('data')) {
                current = _this.contactService.getUser(user.data.userURL) || new models_1.User(user.data);
            }
            else {
                current = _this.contactService.getUser(user.userURL) || new models_1.User(user);
            }
            _this.contextService.updateContextUsers(current);
            if (_this._onUserAdded)
                _this._onUserAdded(current);
        });
        this.chatController.onMessage(function (message) {
            console.log('[Chat Service - onMessage]', message);
            var msg = {
                type: 'message',
                message: message.value.message,
                user: _this.contactService.getUser(message.identity.userProfile.userURL)
            };
            var currentMessage = new models_1.Message(msg);
            _this.contextService.updateContextMessages(currentMessage);
        });
    };
    ChatService.prototype.create = function (name, users, domains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chatGroupManager.create(name, users, domains).then(function (chatController) {
                _this.chatController = chatController;
                console.log('[Chat Created]', chatController);
                _this.prepareController();
                resolve(chatController);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    ChatService.prototype.join = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chatGroupManager.join(resource).then(function (chatController) {
                _this.chatController = chatController;
                console.log('[Joined Chat]', chatController);
                var chatName = chatController.dataObject.data.name;
                _this.contextService.create(chatName, chatController.dataObject).then(function (result) {
                    _this.prepareController();
                    resolve(_this.chatController);
                });
            });
        });
    };
    ChatService.prototype.invite = function (listOfEmails, listOfDomains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
            _this.chatController.addUser(listOfEmails, listOfDomains).then(function (result) {
                console.log('[Invite Chat]', result);
                resolve(_this.chatController);
            }).catch(function (reason) {
                console.error('Error on invite:', reason);
            });
        });
    };
    ChatService.prototype.send = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('Send message: ', _this.chatController, message);
            _this.chatController.send(message).then(function (result) {
                var msg = {
                    type: 'message',
                    message: result.value.message,
                    user: _this.contactService.getUser(result.identity.userProfile.userURL)
                };
                var currentMessage = new models_1.Message(msg);
                console.log('[Chat Service - onMessage]', message, result, currentMessage);
                _this.contextService.updateContextMessages(currentMessage);
                resolve(currentMessage);
            }).catch(reject);
        });
    };
    ChatService.prototype.onInvitation = function (callback) {
        // this.hypertyChat.onInvitation(callback);
        this._onInvitation = callback;
    };
    ChatService.prototype.onUserAdded = function (callback) {
        this._onUserAdded = callback;
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [rethink_service_1.RethinkService, context_service_1.ContextService, contact_service_1.ContactService, message_service_1.MessageService])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map