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
var router_1 = require("@angular/router");
var config_1 = require("../../../config");
// Models
var models_1 = require("../../../models/models");
// Services
var contextualCommData_service_1 = require("../../../services/contextualCommData.service");
var services_1 = require("../../../services/services");
var MediaCommunicationComponent = (function () {
    function MediaCommunicationComponent(route, contactService, connectorService, contextualCommDataService) {
        var _this = this;
        this.route = route;
        this.contactService = contactService;
        this.connectorService = connectorService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'all-100';
        this.streamingActive = false;
        console.log('[Media Communication Component] - Constructor:', this.route.queryParams);
        this.streamingActive = false;
        if (this.mode === 'video') {
            this.connectorService.getLocalStream().subscribe(function (stream) {
                console.log('[Media Communication Component] - get local stream: ', stream);
                _this.myStream = stream;
            });
        }
        this.connectorService.getRemoteStream().subscribe(function (stream) {
            console.log('[Media Communication Component] - get remote stream: ', stream);
            _this.stream = stream;
            _this.duration = new Date();
        });
        this.connectorService.connectorStatus().subscribe(function (status) {
            console.log('[Media Communication Component] -  connector status: ', status);
            if (status === 'end') {
                _this.reset();
            }
        });
        console.log('[Media Communication Component] - Params Action:', this.mode);
    }
    MediaCommunicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.queryParams.subscribe(function (queryParam) {
            console.log('[Media Communication Component] - Params Action:', queryParam['action']);
            _this.mode = queryParam['action'];
            _this.connectorService.mode = queryParam['action'];
            return queryParam['action'];
        });
        console.log('[Media Communication Component] - ngOnInit:', this.mode);
        if (this.mode) {
            console.log('[Media Communication Component] - connection mode: ', this.connectorService.connectorMode, this.streamingActive);
            if (this.connectorService.connectorMode !== 'answer' && !this.streamingActive) {
                this.callTo(this.user);
            }
            else if (this.streamingActive && this.mode === 'video') {
                this.connectorService.enableVideo();
            }
        }
    };
    MediaCommunicationComponent.prototype.ngOnDestroy = function () {
        console.log('[Media Communication] - ngOnDestroy');
        this.onHangup();
        this.reset();
    };
    MediaCommunicationComponent.prototype.reset = function () {
        this.subscription.unsubscribe();
        this.streamingActive = false;
        this.stream = null;
    };
    MediaCommunicationComponent.prototype.callTo = function (user) {
        var _this = this;
        var options = { video: true, audio: true };
        var contextID = this.contextualCommDataService.getActiveContext().id;
        console.log('[Media Communication Component] - ' + this.mode + ' call To', user, contextID);
        this.connectorService.connect(user.username, options, contextID, config_1.config.domain)
            .then(function (controller) {
            controller.dataObjectReporter.data.mode = _this.mode;
            _this.streamingActive = true;
            console.log('[Media Communication Component] - called');
        }).catch(function (reason) {
            console.error(reason);
        });
    };
    MediaCommunicationComponent.prototype.enableVideo = function () {
        this.connectorService.disableVideo();
    };
    MediaCommunicationComponent.prototype.disableVideo = function () {
        this.connectorService.disableVideo();
    };
    MediaCommunicationComponent.prototype.onHangup = function () {
        this.reset();
        this.connectorService.hangup();
    };
    MediaCommunicationComponent.prototype.onMute = function () {
        this.connectorService.mute();
    };
    MediaCommunicationComponent.prototype.onVolume = function () {
        this.connectorService.disableAudio();
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
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        services_1.ContactService,
        services_1.ConnectorService,
        contextualCommData_service_1.ContextualCommDataService])
], MediaCommunicationComponent);
exports.MediaCommunicationComponent = MediaCommunicationComponent;
//# sourceMappingURL=mediaCommunication.component.js.map