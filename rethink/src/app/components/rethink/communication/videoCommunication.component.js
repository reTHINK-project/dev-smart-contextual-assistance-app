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
var VideoCommunicationComponent = (function () {
    function VideoCommunicationComponent(contactService, connectorService) {
        var _this = this;
        this.contactService = contactService;
        this.connectorService = connectorService;
        this.hostClass = 'video-call all-100';
        this.incomingCall = false;
        this.connectorService.mode = 'video';
        this.connectorService.onInvitation(function (videoController, identity) {
            _this.incomingCall = true;
            _this.invitationUser = _this.contactService.getUser(identity.userURL);
        });
        this.connectorService.onAddStream(function (streamURL) {
            console.log('[Audio Communication Component] - onAddStream: ', streamURL);
            if (!_this.myStream) {
                _this.myStream = streamURL;
            }
            ;
            _this.stream = streamURL;
        });
    }
    VideoCommunicationComponent.prototype.ngOnInit = function () {
        this.videoCallTo(this.user);
    };
    VideoCommunicationComponent.prototype.videoCallTo = function (user) {
        var options = { video: true, audio: true };
        this.connectorService.connect(user.username, options, user.userURL, 'localhost')
            .then(function (controller) {
            console.log('[Audio Communication Component] - audio Call To', controller);
        }).catch(function (reason) {
            console.error(reason);
        });
    };
    VideoCommunicationComponent.prototype.onCall = function () {
        console.log('[AudioCommunicationComponent ] - OnCall Click: ', this.user);
    };
    VideoCommunicationComponent.prototype.onHangup = function () {
    };
    VideoCommunicationComponent.prototype.onMute = function () {
    };
    VideoCommunicationComponent.prototype.onVolume = function () {
    };
    return VideoCommunicationComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], VideoCommunicationComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], VideoCommunicationComponent.prototype, "user", void 0);
VideoCommunicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'div[video-view]',
        templateUrl: './videoCommunication.component.html',
        styleUrls: ['./videoCommunication.component.css']
    }),
    __metadata("design:paramtypes", [services_1.ContactService,
        services_1.ConnectorService])
], VideoCommunicationComponent);
exports.VideoCommunicationComponent = VideoCommunicationComponent;
//# sourceMappingURL=videoCommunication.component.js.map