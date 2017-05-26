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
var services_1 = require("../../../services/services");
var contextualCommData_service_1 = require("../../../services/contextualCommData.service");
var ChatCommunicationComponent = (function () {
    function ChatCommunicationComponent(chatService, contextualCommDataService) {
        this.chatService = chatService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'message-sender all-75 medium-70 xlarge-80 hide-small hide-tiny push-right';
        this.active = false;
        this.onMessage = new core_1.EventEmitter();
        this.model = { message: '' };
    }
    ChatCommunicationComponent.prototype.ngOnInit = function () {
    };
    ChatCommunicationComponent.prototype.onSubmit = function () {
        var message = this.model.message;
        if (message) {
            console.log('[Chat Communication View - onMessage] - Message:', message, this.chatService.chatControllerActive);
            this.chatService.send(message).then(function (message) {
                console.log('[Activity View - onMessage] - message sent', message);
            });
            this.clean();
        }
    };
    ChatCommunicationComponent.prototype.onInvitation = function (event) {
        console.log('[Chat Communication View - onInvitation] - ', event);
        this.chatService.join(event).then(function (discoveredDataObject) {
        }).catch(function (reason) {
            console.log(reason);
        });
    };
    ChatCommunicationComponent.prototype.clean = function () {
        this.model.message = '';
    };
    return ChatCommunicationComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ChatCommunicationComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChatCommunicationComponent.prototype, "active", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ChatCommunicationComponent.prototype, "onMessage", void 0);
ChatCommunicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'chat-view',
        templateUrl: './chatCommunication.component.html'
    }),
    __metadata("design:paramtypes", [services_1.ChatService,
        contextualCommData_service_1.ContextualCommDataService])
], ChatCommunicationComponent);
exports.ChatCommunicationComponent = ChatCommunicationComponent;
//# sourceMappingURL=chatCommunication.component.js.map