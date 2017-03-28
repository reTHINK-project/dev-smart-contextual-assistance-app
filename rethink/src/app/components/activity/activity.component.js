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
var models_1 = require("../../models/models");
var ActivityComponent = (function () {
    function ActivityComponent(cd) {
        this.cd = cd;
        this.hostClass = 'half-padding';
    }
    ActivityComponent.prototype.ngOnInit = function () {
    };
    ActivityComponent.prototype.ngAfterViewInit = function () {
        /*    if (this.message.user.status === 'offline') {
              this.hostClass = 'half-padding offline'
            }*/
    };
    return ActivityComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ActivityComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", models_1.Message)
], ActivityComponent.prototype, "message", void 0);
ActivityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'li[activity]',
        templateUrl: './activity.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], ActivityComponent);
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map