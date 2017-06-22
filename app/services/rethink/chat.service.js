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
var core_1 = require("@angular/core");
// Services
var rethink_service_1 = require("./rethink.service");
var contact_service_1 = require("../contact.service");
var contextualComm_service_1 = require("../contextualComm.service");
var models_1 = require("../../models/models");
var ChatService = (function () {
    function ChatService(router, route, rethinkService, contextualCommService, contactService) {
        this.router = router;
        this.route = route;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contactService = contactService;
        this.controllerList = new Map();
    }
    Object.defineProperty(ChatService.prototype, "activeDataObjectURL", {
        get: function () {
            return this._activeDataObjectURL;
        },
        set: function (value) {
            console.log('[Chat Service] - setActiveController:', value, this.controllerList);
            this._activeDataObjectURL = value;
            this.chatControllerActive = this.controllerList.get(value);
            console.info('[Chat Service] - active controller: ', this.chatControllerActive);
        },
        enumerable: true,
        configurable: true
    });
    ChatService.prototype._updateControllersList = function (dataObjectURL, chatController) {
        this.prepareController(chatController);
        this.controllerList.set(dataObjectURL, chatController);
        console.log('[Chat Service - Update Controller List] - ', chatController, this.controllerList);
    };
    ChatService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.hypertyURL = 'hyperty-catalogue://catalogue.' + _this.rethinkService.domain + '/.well-known/hyperty/GroupChatManager';
            console.log('[Chat Service - getHyperty] - ', _this.chatGroupManager);
            if (!_this.chatGroupManager) {
                _this.rethinkService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.chatGroupManager = hyperty.instance;
                    _this._discovery = _this.chatGroupManager.discovery;
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
        this.chatGroupManager.onResumeReporter(function (controllers) {
            console.log('[Chat Service - prepareHyperty] - onResume reporters: ', controllers);
            Object.keys(controllers).forEach(function (url) {
                _this.controllerList.set(url, controllers[url]);
                _this._updateControllersList(url, controllers[url]);
            });
        });
        this.chatGroupManager.onResumeObserver(function (controllers) {
            console.log('[Chat Service - prepareHyperty] - onResume observers: ', controllers);
            Object.keys(controllers).forEach(function (url) {
                _this.controllerList.set(url, controllers[url]);
                _this._updateControllersList(url, controllers[url]);
            });
        });
        this.chatGroupManager.onInvitation(function (event) {
            if (_this._onInvitation) {
                _this._onInvitation(event);
            }
        });
    };
    ChatService.prototype.prepareController = function (chatController) {
        var _this = this;
        console.log('[Chat Service - prepareController]', chatController);
        chatController.onUserAdded(function (user) {
            var dataObjectURL = chatController.dataObject.url;
            console.log('[Chat Service - prepareController] - onUserAdded', chatController, user, dataObjectURL);
            var current;
            var userInfo = {};
            if (user.hasOwnProperty('data')) {
                current = _this.contactService.getUser(user.data.identity.userProfile.userURL);
                userInfo.domain = user.data.domain;
                userInfo.idp = user.data.identity.idp;
                Object.assign(userInfo, user.data.identity.userProfile);
            }
            else {
                current = _this.contactService.getUser(user.identity.userProfile.userURL);
                userInfo.domain = user.domain;
                userInfo.idp = user.identity.idp;
                Object.assign(userInfo, user.identity.userProfile);
            }
            if (!current) {
                current = new models_1.User(userInfo);
            }
            console.log('[Chat Service - prepareController] - current user:', userInfo, current);
            _this.contextualCommService.updateContextUsers(current, dataObjectURL);
        });
        chatController.onMessage(function (message) {
            console.log('[Chat Service - prepareController] - onMessage', message, _this.chatControllerActive);
            var dataObjectURL = chatController.dataObject.url;
            var user = _this.contactService.getUser(message.identity.userProfile.userURL);
            if (user) {
                var msg = {
                    type: 'message',
                    message: message.value.content,
                    user: user
                };
                var currentMessage = new models_1.Message(msg);
                _this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);
            }
            else {
                console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
            }
        });
        // this._updateControllersList(chatController.dataObject.url, chatController);
    };
    ChatService.prototype.create = function (name, users, domains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chatGroupManager.create(name, users, domains).then(function (chatController) {
                _this._updateControllersList(chatController.dataObject.url, chatController);
                console.log('[Chat Created]', chatController);
                _this.prepareHyperty();
                resolve(chatController);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    /**
     *
     *
     * @param {object} event
     * @returns {*}
     *
     * @memberof ChatService
     */
    ChatService.prototype.join = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Chat Service - Join] - event: ', event);
            _this.chatGroupManager.join(url).then(function (chatController) {
                var dataObject = chatController.dataObject;
                _this._updateControllersList(dataObject.url, chatController);
                resolve(dataObject);
            });
        });
    };
    ChatService.prototype.invite = function (dataObjectURL, listOfEmails, listOfDomains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
            console.log('[Chat Service - invite]: ', _this.controllerList, dataObjectURL, _this.controllerList.get(dataObjectURL));
            var currentController = _this.controllerList.get(dataObjectURL);
            currentController.addUser(listOfEmails, listOfDomains).then(function (result) {
                console.log('[Invite Chat]', result);
                console.log('[Chat Service] - Result: ', currentController);
                resolve(currentController);
            }).catch(function (reason) {
                console.error('Error on invite:', reason);
            });
        });
    };
    ChatService.prototype.send = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Chat Service - Send Message]', _this.chatControllerActive, message);
            _this.chatControllerActive.send(message).then(function (result) {
                console.log('[Chat Service - Sended Message]', message, result, _this.chatControllerActive);
                var user = _this.contactService.getUser(result.identity.userProfile.userURL);
                console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);
                var msg = {
                    type: 'message',
                    message: result.value.content,
                    user: user
                };
                var currentMessage = new models_1.Message(msg);
                _this.contextualCommService.updateContextMessages(currentMessage, _this.chatControllerActive.dataObject.url);
                resolve(currentMessage);
            }).catch(reject);
        });
    };
    ChatService.prototype.discovery = function () {
        return this._discovery;
    };
    ChatService.prototype.onInvitation = function (callback) {
        this._onInvitation = callback;
    };
    ChatService.prototype.onUserAdded = function (callback) {
        this._onUserAdded = callback;
    };
    ChatService.prototype.onMessage = function (callback) {
        this._onMessage = callback;
    };
    ChatService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            rethink_service_1.RethinkService,
            contextualComm_service_1.ContextualCommService,
            contact_service_1.ContactService])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map