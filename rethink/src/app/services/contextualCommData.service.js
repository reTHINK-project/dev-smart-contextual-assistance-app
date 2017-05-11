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
var contextualComm_service_1 = require("./contextualComm.service");
var chat_service_1 = require("./rethink/chat.service");
var ContextualCommDataService = (function () {
    function ContextualCommDataService(chatService, contextualCommService) {
        this.chatService = chatService;
        this.contextualCommService = contextualCommService;
    }
    ContextualCommDataService.prototype.createContext = function (name, parent) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.contextualCommService.getContextByName(name)
                .then(function (context) {
                console.info('[Application Component] - context found: ', context);
                resolve(context);
            }).catch(function (reason) {
                console.info('[Application Component] - no contexts was found: ', reason);
                console.info('[Application Component] - creating new context: ', name);
                _this.chatService.create(name, [], []).then(function (controller) {
                    console.info('[Application Component] - communication objects was created successfully: ', controller);
                    console.info('[Application Component] - creating new contexts: ', controller, parent);
                    return _this.contextualCommService.create(controller.dataObject.metadata.name, controller.dataObject, parent);
                }).then(function (context) {
                    console.info('[Application Component] -  ContextualComm created: ', context);
                    resolve(context);
                }).catch(function (reason) {
                    console.error('Reason:', reason);
                });
            });
        });
    };
    ContextualCommDataService.prototype.getContexts = function () {
        return this.contextualCommService.getContextualComms();
    };
    ContextualCommDataService.prototype.getContacts = function () {
    };
    return ContextualCommDataService;
}());
ContextualCommDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        contextualComm_service_1.ContextualCommService])
], ContextualCommDataService);
exports.ContextualCommDataService = ContextualCommDataService;
//# sourceMappingURL=contextualCommData.service.js.map