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
var MediaCommunicationComponent = (function () {
    function MediaCommunicationComponent(contactService, connectorService) {
        var _this = this;
        this.contactService = contactService;
        this.connectorService = connectorService;
        this.hostClass = 'all-100';
        this.incomingCall = false;
        this.connectorService.onInvitation(function (videoController, identity) {
            _this.incomingCall = true;
            _this.invitationUser = _this.contactService.getUser(identity.userURL);
        });
        if (this.mode === 'video') {
            this.connectorService.getLocalStream().subscribe(function (stream) {
                _this.myStream = stream;
            });
        }
        this.connectorService.getRemoteStream().subscribe(function (stream) {
            _this.stream = stream;
        });
    }
    MediaCommunicationComponent.prototype.ngOnInit = function () {
        this.connectorService.mode = this.mode;
        this.videoCallTo(this.user);
    };
    MediaCommunicationComponent.prototype.videoCallTo = function (user) {
        var _this = this;
        var options = { video: true, audio: true };
        this.connectorService.connect(user.username, options, user.userURL, 'localhost')
            .then(function (controller) {
            controller.dataObjectReporter.data.mode = _this.mode;
            console.log('[Media Communication Component] - ' + _this.mode + ' Call To', controller);
        }).catch(function (reason) {
            console.error(reason);
        });
    };
    MediaCommunicationComponent.prototype.onCall = function () {
        console.log('[MediaCommunicationComponent ] - OnCall Click: ', this.user);
    };
    MediaCommunicationComponent.prototype.onHangup = function () {
    };
    MediaCommunicationComponent.prototype.onMute = function () {
    };
    MediaCommunicationComponent.prototype.onVolume = function () {
    };
    return MediaCommunicationComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], MediaCommunicationComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.User)
], MediaCommunicationComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MediaCommunicationComponent.prototype, "mode", void 0);
MediaCommunicationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'div[media-view]',
        templateUrl: './mediaCommunication.component.html',
        styleUrls: ['./mediaCommunication.component.css']
    }),
    __metadata("design:paramtypes", [services_1.ContactService,
        services_1.ConnectorService])
], MediaCommunicationComponent);
exports.MediaCommunicationComponent = MediaCommunicationComponent;
//# sourceMappingURL=mediaCommunication.component.js.map