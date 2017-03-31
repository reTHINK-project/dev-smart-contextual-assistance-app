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
var ConnectorService = (function () {
    function ConnectorService(router, route, sanitizer, contactService, notificationService, appService) {
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.contactService = contactService;
        this.notificationService = notificationService;
        this.appService = appService;
        this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector';
        this._localStream = new Subject_1.Subject();
        this._remoteStream = new Subject_1.Subject();
    }
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
    ConnectorService.prototype.prepareHyperty = function () {
        var _this = this;
        this.hypertyVideo.onInvitation(function (controller, identity) {
            console.log('ON onInvitation: ', controller, identity);
            _this.mode = controller.dataObjectObserver.data.mode;
            console.log('[Connector Service] - user: ', _this, identity, _this.contactService.getUser(identity.userURL));
            _this.controller = controller;
            var currUser = _this.contactService.getUser(identity.userURL);
            _this.notificationService.addNotification(app_models_1.AlertType.QUESTION, {
                user: currUser,
                message: 'New call is incomming from ' + currUser.username,
                action: _this._mode
            }, function (alert) {
                _this._notificationResponse.apply(_this, [controller, alert, currUser]);
            });
            _this.prepareController(controller);
            if (_this._onInvitation)
                _this._onInvitation(controller, identity);
        });
    };
    ConnectorService.prototype.prepareController = function (controller) {
        var _this = this;
        controller.onAddStream(function (event) {
            console.log('[Connector Service - Add Stream] - Local Stream:', event);
            _this._localStream.next(event.stream);
        });
        controller.onAddRemoteStream(function (stream) {
            console.log('[Connector Service - Add Stream] - Remote Stream:', stream);
            _this._remoteStream.next(stream);
        });
        /*    controller.onDisconnect(function(identity) {
              disconnecting();
            });*/
    };
    ConnectorService.prototype._notificationResponse = function (controller, response, user) {
        var _this = this;
        console.log('[Connector Service] - notification response: ', response, this);
        if (response) {
            var options = { video: true, audio: true };
            return utils_1.getUserMedia(options).then(function (mediaStream) {
                _this._remoteStream.next(mediaStream);
                return _this.controller.accept(mediaStream);
            })
                .then(function (accepted) {
                console.log('[Connector Service] - accept response:', accepted, _this.mode);
                var navigationExtras = {
                    queryParams: { 'action': _this.mode }
                };
                console.log('[Connector Service] - ', _this.router, _this.router.url, encodeURIComponent(user.username));
                if (_this.router.url.includes(encodeURIComponent(user.username))) {
                    _this.router.navigate([_this.router.url], navigationExtras);
                }
                else {
                    _this.router.navigate([_this.router.url, decodeURIComponent(user.username)], navigationExtras);
                }
            }).catch(function (reason) {
                console.error(reason);
            });
        }
    };
    ConnectorService.prototype.connect = function (userURL, options, name, domain) {
        var _this = this;
        return utils_1.getUserMedia(options).then(function (mediaStream) {
            _this._localStream.next(mediaStream);
            return _this.hypertyVideo.connect(userURL, mediaStream, name, domain);
        }).then(function (controller) {
            console.log('[Connector Service] - connect:', controller);
            _this.prepareController(controller);
            return controller;
        }).catch(function (reason) {
            console.error('reason:', reason);
        });
    };
    ConnectorService.prototype.onInvitation = function (callback) {
        this._onInvitation = callback;
    };
    ConnectorService.prototype.getRemoteStream = function () {
        var _this = this;
        return this._remoteStream.map(function (stream) {
            return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
        });
    };
    ConnectorService.prototype.getLocalStream = function () {
        var _this = this;
        return this._localStream.map(function (stream) {
            return _this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
        });
    };
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        platform_browser_1.DomSanitizer,
        contact_service_1.ContactService,
        notification_service_1.NotificationService,
        rethink_service_1.RethinkService])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=connector.service.js.map