"use strict";
/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */
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
var moment = require("moment");
require("moment-duration-format");
var TimeElapsedPipe = (function () {
    function TimeElapsedPipe(cdRef, ngZone) {
        this.cdRef = cdRef;
        this.ngZone = ngZone;
    }
    TimeElapsedPipe.prototype.transform = function (value, formatStyle) {
        this.format = formatStyle || 'h:mm:ss';
        this.lastValue = value;
        this.createTimer();
        return this.lastText;
    };
    TimeElapsedPipe.prototype.ngOnDestroy = function () {
        this.removeTimer();
    };
    TimeElapsedPipe.prototype.createTimer = function () {
        var _this = this;
        if (this.currentTimer) {
            return;
        }
        var begin = moment(this.lastValue);
        var timeToUpdate = 1000;
        this.currentTimer = this.ngZone.runOutsideAngular(function () {
            if (typeof window !== 'undefined') {
                return window.setTimeout(function () {
                    var now = moment();
                    var diff = now.diff(begin);
                    _this.lastText = moment.duration(diff).format(_this.format, { trim: false });
                    _this.currentTimer = null;
                    _this.ngZone.run(function () { return _this.cdRef.markForCheck(); });
                }, timeToUpdate);
            }
        });
    };
    TimeElapsedPipe.prototype.removeTimer = function () {
        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
            this.currentTimer = null;
        }
    };
    TimeElapsedPipe = __decorate([
        core_1.Pipe({ name: 'amTimeElapsed', pure: false }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.NgZone])
    ], TimeElapsedPipe);
    return TimeElapsedPipe;
}());
exports.TimeElapsedPipe = TimeElapsedPipe;
//# sourceMappingURL=timeElapsedPipe.js.map