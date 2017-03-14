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
            console.log('[Chat Service - getHyperty] - ', _this.chatGroupManager);
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
        console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);
        this.chatGroupManager.onResume(function (chatController) {
            console.log('[Chat Service - prepareHyperty] - onResume: ', chatController);
            _this.chatController = chatController;
            _this.prepareController();
        });
        this.chatGroupManager.onInvitation(function (event) {
            console.log('[Chat Service - prepareHyperty] - onInvitation', event);
            var currentUser = _this.contactService.getUser(event.identity.userProfile.userURL);
            if (!currentUser) {
                currentUser = new models_1.User(event.identity.userProfile);
                _this.contactService.addUser(currentUser);
            }
            _this.join(event.url).then(function (a) {
                _this.prepareController();
            }).catch(function (reason) {
                console.log(reason);
            });
            if (_this._onInvitation)
                _this._onInvitation(event);
        });
    };
    ChatService.prototype.prepareController = function () {
        var _this = this;
        console.log('[Chat Service - prepareController]', this.chatController);
        this.chatController.onUserAdded(function (user) {
            console.log('[Chat Service - prepareController] - onUserAdded', user);
            var current;
            if (user.hasOwnProperty('data')) {
                current = _this.contactService.getUser(user.data.userURL);
            }
            else {
                current = _this.contactService.getUser(user.userURL);
            }
            console.log('[Chat Service - prepareController] - current user:', current);
            if (!current) {
                current = new models_1.User(user);
            }
            _this.contextService.updateContextUsers(current);
            // if(this._onUserAdded) this._onUserAdded(current);
        });
        this.chatController.onMessage(function (message) {
            console.log('[Chat Service - onMessage]', message);
            var user = _this.contactService.getUser(message.identity.userProfile.userURL);
            console.log('[Chat Service] - user:', user, message.identity.userProfile.userURL);
            if (user) {
                var msg = {
                    type: 'message',
                    message: message.value.message,
                    user: user
                };
                var currentMessage = new models_1.Message(msg);
                _this.contextService.updateContextMessages(currentMessage);
            }
            else {
                console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
            }
        });
    };
    ChatService.prototype.create = function (name, users, domains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chatGroupManager.create(name, users, domains).then(function (chatController) {
                _this.chatController = chatController;
                console.log('[Chat Created]', chatController);
                _this.prepareHyperty();
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
                    _this.prepareHyperty();
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
                console.log('[Chat Service - Sended Message]', message);
                var user = _this.contactService.getUser(result.identity.userProfile.userURL);
                console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);
                var msg = {
                    type: 'message',
                    message: result.value.message,
                    user: user
                };
                var currentMessage = new models_1.Message(msg);
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