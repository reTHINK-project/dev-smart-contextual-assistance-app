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
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
// Utils
var utils_1 = require("../../utils/utils");
// Services
var rethink_service_1 = require("./rethink.service");
var contact_service_1 = require("../contact.service");
var app_models_1 = require("../../models/app.models");
var notification_service_1 = require("../notification.service");
var Subject_1 = require("rxjs/Subject");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var STATUS = { INPROGRESS: 'in-progress', END: 'end' };
var ConnectorService = (function () {
    function ConnectorService(router, route, sanitizer, contactService, notificationService, appService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.contactService = contactService;
        this.notificationService = notificationService;
        this.appService = appService;
        this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector';
        this.controllers = {};
        this.callInProgress = false;
        this._webrtcMode = 'offer';
        this._localStream = new Subject_1.Subject();
        this._remoteStream = new ReplaySubject_1.ReplaySubject();
        this._connectorStatus = new Subject_1.Subject();
        console.log('[Connector Service] - constructor', this.router);
        this.paramsSubscription = this.router.events.subscribe(function (params) {
            console.log('[Connector Service] - query params changes:', params['action'], _this.mode, _this.callInProgress);
            if (!_this.callInProgress) {
                _this.acceptCall();
            }
        });
    }
    Object.defineProperty(ConnectorService.prototype, "connectorMode", {
        get: function () {
            return this._webrtcMode;
        },
        set: function (value) {
            this._webrtcMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorService.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            console.log('[Connector Service] - set mode: ', value);
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    ConnectorService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.hypertyVideo) {
                _this.appService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.hypertyVideo = hyperty.instance;
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
    ConnectorService.prototype.acceptCall = function () {
        var _this = this;
        console.log('[Connector Service] - AcceptCall: ', this.controllers, this.controllers.hasOwnProperty('ansewer'));
        console.log('[Connector Service] - AcceptCall: ', this._webrtcMode);
        if (this.controllers && this.controllers.hasOwnProperty('answer') && this._webrtcMode === 'answer') {
            var options = { video: true, audio: true };
            utils_1.getUserMedia(options).then(function (mediaStream) {
                _this._localStream.next(mediaStream);
                return _this.controllers[_this._webrtcMode].accept(mediaStream);
            }).then(function (accepted) {
                _this.callInProgress = true;
                _this._connectorStatus.next(STATUS.INPROGRESS);
                console.log('[Connector Service] - accept response:', _this.mode);
                if (_this.mode === 'audio') {
                    _this.controllers[_this._webrtcMode].disableVideo();
                }
            }).catch(function (reason) {
                console.error(reason);
            });
        }
        else {
            console.error('error accepting call', this.controllers, this.controllers.hasOwnProperty('ansewer'), this._webrtcMode);
        }
    };
    ConnectorService.prototype.prepareHyperty = function () {
        var _this = this;
        this.hypertyVideo.onInvitation(function (controller, identity) {
            console.log('[Connector Service] - on Invitation:', controller, identity);
            var metadata = controller.dataObjectObserver.metadata;
            _this.mode = controller.dataObjectObserver.data.mode;
            _this._webrtcMode = 'answer';
            _this.prepareController(controller);
            var currUser = _this.contactService.getUser(identity.userURL);
            _this.notificationService.addNotification(app_models_1.AlertType.QUESTION, {
                user: currUser,
                message: 'New call is incomming from ' + currUser.username,
                action: _this._mode
            }, metadata, function (alert) {
                _this._notificationResponse(controller, alert, currUser);
            });
        });
    };
    ConnectorService.prototype._notificationResponse = function (controller, response, user) {
        console.log('[Connector Service] - notification response: ', response, this);
        if (response) {
            var navigationExtras = {
                queryParams: { 'action': this.mode }
            };
            var metadata = response.metadata;
            var currentUser = this.contactService.sessionUser.username;
            var paths = utils_1.splitFromURL(metadata.name, currentUser);
            console.log('[Connector Service] -  navigate to: ', paths);
            console.log('[Connector Service] -  navigate to: ', paths.context, paths.task, paths.user);
            var navigationArgs = [paths.context];
            var userTo = void 0;
            if (utils_1.isAnUser(paths.task)) {
                userTo = utils_1.clearMyUsername(paths.task, currentUser);
            }
            else {
                navigationArgs.push(paths.task);
                userTo = utils_1.clearMyUsername(paths.user, currentUser);
            }
            navigationArgs.push('user');
            navigationArgs.push(userTo);
            console.log('[Connector Service] -  navigate to path: ', navigationArgs);
            this.router.navigate(navigationArgs, navigationExtras);
        }
        else {
            controller.decline();
        }
    };
    ConnectorService.prototype.connect = function (userURL, options, name, domain) {
        var _this = this;
        this._webrtcMode = 'offer';
        return utils_1.getUserMedia(options).then(function (mediaStream) {
            _this._localStream.next(mediaStream);
            return _this.hypertyVideo.connect(userURL, mediaStream, name, domain);
        }).then(function (controller) {
            console.log('[Connector Service] - connect:', controller);
            _this.callInProgress = true;
            _this.prepareController(controller);
            return controller;
        }).catch(function (reason) {
            console.error('reason:', reason);
        });
    };
    ConnectorService.prototype.prepareController = function (controller) {
        var _this = this;
        console.log('[Connector Service - Prepare Controller] - mode: ' + this._webrtcMode + ' Controllers: ', this.controllers);
        this.controllers[this._webrtcMode] = controller;
        controller.onAddStream(function (event) {
            console.log('[Connector Service - Add Stream] - Remote Stream:', event);
            _this._remoteStream.next(event.stream);
            if (_this.mode === 'audio') {
                controller.disableVideo();
            }
        });
        controller.onDisconnect(function (identity) {
            console.log('[Connector Service - onDisconnect] - onDisconnect:', identity);
            var navigationExtras = {
                queryParams: {},
                relativeTo: _this.route
            };
            _this.router.navigate([], navigationExtras);
            _this._connectorStatus.next(STATUS.END);
        });
    };
    ConnectorService.prototype.getRemoteStream = function () {
        var _this = this;
        return this._remoteStream.map(function (stream) {
            return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
        }).publishReplay(1).refCount();
    };
    ConnectorService.prototype.getLocalStream = function () {
        var _this = this;
        return this._localStream.map(function (stream) {
            return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
        }).publishReplay(1).refCount();
    };
    ConnectorService.prototype.connectorStatus = function () {
        return this._connectorStatus;
    };
    ConnectorService.prototype.enableVideo = function () {
        this.controllers[this._webrtcMode].disableVideo(true);
    };
    ConnectorService.prototype.disableVideo = function () {
        this.controllers[this._webrtcMode].disableVideo(false);
    };
    ConnectorService.prototype.disableAudio = function () {
        this.controllers[this._webrtcMode].disableAudio();
    };
    ConnectorService.prototype.mute = function () {
        this.controllers[this._webrtcMode].mute();
    };
    ConnectorService.prototype.hangup = function () {
        this.callInProgress = false;
        this.controllers[this._webrtcMode].disconnect();
        this._connectorStatus.next(STATUS.END);
        this._remoteStream = new ReplaySubject_1.ReplaySubject();
        this.connectorMode = 'offer';
        console.log('[Connector Service - hangup]: ', this);
    };
    ConnectorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            platform_browser_1.DomSanitizer,
            contact_service_1.ContactService,
            notification_service_1.NotificationService,
            rethink_service_1.RethinkService])
    ], ConnectorService);
    return ConnectorService;
}());
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=connector.service.js.map