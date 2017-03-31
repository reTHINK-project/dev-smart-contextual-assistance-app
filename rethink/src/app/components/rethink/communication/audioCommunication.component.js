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
// Models
var models_1 = require("../../../models/models");
// Services
var services_1 = require("../../../services/services");
var AudioCommunicationComponent = (function () {
    function AudioCommunicationComponent(contactService, connectorService) {
        var _this = this;
        this.contactService = contactService;
        this.connectorService = connectorService;
        this.hostClass = 'audio-call all-100';
        this.incomingCall = false;
        this.connectorService.mode = 'audio';
        this.connectorService.onInvitation(function (videoController, identity) {
            _this.incomingCall = true;
            _this.invitationUser = _this.contactService.getUser(identity.userURL);
        });
        this.connectorService.onAddStream(function (streamURL) {
            console.log('[Audio Communication Component] - onAddStream: ', streamURL);
            _this.stream = streamURL;
        });
    }
    AudioCommunicationComponent.prototype.ngOnInit = function () {
        this.audioCallTo(this.user);
    };
    AudioCommunicationComponent.prototype.audioCallTo = function (user) {
        var options = { video: false, audio: true };
        this.connectorService.connect(user.username, options, user.userURL, 'localhost')
            .then(function (controller) {
            console.log('[Audio Communication Component] - audio Call To', controller);
        }).catch(function (reason) {
            console.error(reason);
        });
    };
    AudioCommunicationComponent.prototype.onCall = function () {
        console.log('[AudioCommunicationComponent ] - OnCall Click: ', this.user);
        this.audioCallTo(this.user);
    };
    AudioCommunicationComponent.prototype.onHangup = function () {
    };
    AudioCommunicationComponent.prototype.onMute = function () {
    };
    AudioCommunicationComponent.prototype.onVolume = function () {
    };
    return AudioCommunicationComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], AudioCommunicationComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], AudioCommunicationComponent.prototype, "user", void 0);
AudioCommunicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'div[audio-view]',
        templateUrl: './audioCommunication.component.html',
        styleUrls: ['./audioCommunication.component.css']
    }),
    __metadata("design:paramtypes", [services_1.ContactService,
        services_1.ConnectorService])
], AudioCommunicationComponent);
exports.AudioCommunicationComponent = AudioCommunicationComponent;
//# sourceMappingURL=audioCommunication.component.js.map