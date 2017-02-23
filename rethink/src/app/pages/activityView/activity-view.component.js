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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var ActivityViewComponent = (function () {
    function ActivityViewComponent(router, route) {
        this.router = router;
        this.route = route;
        this.hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list';
        this.chatActive = false;
    }
    // Load data ones componet is ready
    ActivityViewComponent.prototype.ngOnInit = function () {
    };
    ActivityViewComponent.prototype.ngAfterViewInit = function () {
        console.log('[Activity View  - AfterViewInit]');
    };
    ActivityViewComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ActivityViewComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], ActivityViewComponent.prototype, "messages", void 0);
    ActivityViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ul[activity-view]',
            templateUrl: './activity-view.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;
//# sourceMappingURL=activity-view.component.js.map