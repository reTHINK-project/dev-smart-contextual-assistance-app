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
var animations_1 = require("@angular/animations");
var platform_browser_1 = require("@angular/platform-browser");
var notifications_service_1 = require("../services/notifications.service");
var NotificationComponent = (function () {
    function NotificationComponent(notificationService, domSanitizer, zone) {
        var _this = this;
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.zone = zone;
        // Progress bar variables
        this.progressWidth = 0;
        this.stopTime = false;
        this.count = 0;
        this.instance = function () {
            _this.zone.runOutsideAngular(function () {
                _this.zone.run(function () { return _this.diff = (new Date().getTime() - _this.start) - (_this.count * _this.speed); });
                if (_this.count++ === _this.steps) {
                    _this.zone.run(function () { return _this.remove(); });
                }
                else if (!_this.stopTime) {
                    if (_this.showProgressBar) {
                        _this.zone.run(function () { return _this.progressWidth += 100 / _this.steps; });
                    }
                    _this.timer = setTimeout(_this.instance, (_this.speed - _this.diff));
                }
            });
        };
    }
    NotificationComponent.prototype.ngOnInit = function () {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
    };
    NotificationComponent.prototype.startTimeOut = function () {
        var _this = this;
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(function () { return _this.timer = setTimeout(_this.instance, _this.speed); });
    };
    NotificationComponent.prototype.onEnter = function () {
        if (this.pauseOnHover) {
            this.stopTime = true;
        }
    };
    NotificationComponent.prototype.onLeave = function () {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    };
    NotificationComponent.prototype.setPosition = function () {
        return this.position !== 0 ? this.position * 90 : 0;
    };
    NotificationComponent.prototype.onClick = function ($e) {
        this.item.click.emit($e);
        if (this.clickToClose) {
            this.remove();
        }
    };
    NotificationComponent.prototype.onAcceptClick = function ($e) {
        this.item.onEventAction.emit(this.buildActionEvent($e));
        if (this.clickToClose) {
            this.remove();
        }
    };
    NotificationComponent.prototype.onRejectClick = function ($e) {
        this.item.onEventAction.emit(this.buildActionEvent($e));
        if (this.clickToClose) {
            this.remove();
        }
    };
    NotificationComponent.prototype.buildActionEvent = function ($e) {
        console.log('Action Click: ', $e, this.item);
        /*    let toEmit: Notification = {
              createdOn: notification.createdOn,
              type: notification.type,
              icon: notification.icon,
              id: notification.id
            };*/
    };
    // Attach all the overrides
    NotificationComponent.prototype.attachOverrides = function () {
        var _this = this;
        Object.keys(this.item.override).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = _this.item.override[a];
            }
        });
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
    };
    NotificationComponent.prototype.remove = function () {
        var _this = this;
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.zone.run(function () { return _this.notificationService.set(_this.item, false); });
                }, 310);
            });
        }
        else {
            this.notificationService.set(this.item, false);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "timeOut", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "showProgressBar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "pauseOnHover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "clickToClose", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "theClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "animate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "position", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "actions", void 0);
    NotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'notification',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                animations_1.trigger('enterLeave', [
                    // Enter from right
                    animations_1.state('fromRight', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    animations_1.transition('* => fromRight', [
                        animations_1.style({ opacity: 0, transform: 'translateX(5%)' }),
                        animations_1.animate('400ms ease-in-out')
                    ]),
                    animations_1.state('fromRightOut', animations_1.style({ opacity: 0, transform: 'translateX(-5%)' })),
                    animations_1.transition('fromRight => fromRightOut', [
                        animations_1.style({ opacity: 1, transform: 'translateX(0)' }),
                        animations_1.animate('300ms ease-in-out')
                    ]),
                    // Enter from left
                    animations_1.state('fromLeft', animations_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    animations_1.transition('* => fromLeft', [
                        animations_1.style({ opacity: 0, transform: 'translateX(-5%)' }),
                        animations_1.animate('400ms ease-in-out')
                    ]),
                    animations_1.state('fromLeftOut', animations_1.style({ opacity: 0, transform: 'translateX(5%)' })),
                    animations_1.transition('fromLeft => fromLeftOut', [
                        animations_1.style({ opacity: 1, transform: 'translateX(0)' }),
                        animations_1.animate('300ms ease-in-out')
                    ]),
                    // Rotate
                    animations_1.state('scale', animations_1.style({ opacity: 1, transform: 'scale(1)' })),
                    animations_1.transition('* => scale', [
                        animations_1.style({ opacity: 0, transform: 'scale(0)' }),
                        animations_1.animate('400ms ease-in-out')
                    ]),
                    animations_1.state('scaleOut', animations_1.style({ opacity: 0, transform: 'scale(0)' })),
                    animations_1.transition('scale => scaleOut', [
                        animations_1.style({ opacity: 1, transform: 'scale(1)' }),
                        animations_1.animate('400ms ease-in-out')
                    ]),
                    // Scale
                    animations_1.state('rotate', animations_1.style({ opacity: 1, transform: 'rotate(0deg)' })),
                    animations_1.transition('* => rotate', [
                        animations_1.style({ opacity: 0, transform: 'rotate(5deg)' }),
                        animations_1.animate('400ms ease-in-out')
                    ]),
                    animations_1.state('rotateOut', animations_1.style({ opacity: 0, transform: 'rotate(-5deg)' })),
                    animations_1.transition('rotate => rotateOut', [
                        animations_1.style({ opacity: 1, transform: 'rotate(0deg)' }),
                        animations_1.animate('400ms ease-in-out')
                    ])
                ])
            ],
            templateUrl: './notification.component.html',
            styleUrls: ['./notification.component.css']
        }),
        __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
            platform_browser_1.DomSanitizer,
            core_1.NgZone])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map