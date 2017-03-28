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
var Observable_1 = require("rxjs/Observable");
var ActivityListComponent = (function () {
    function ActivityListComponent(el) {
        this.el = el;
        this.hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list';
    }
    ActivityListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.msgObs = this.messages.subscribe(function (messages) {
            console.log('[Activity List - Restore old messages]', messages);
            _this.scrollToBottom();
        });
        this.updateView();
        this.scrollToBottom();
    };
    ActivityListComponent.prototype.ngOnInit = function () {
    };
    ActivityListComponent.prototype.ngOnDestroy = function () {
        this.msgObs.unsubscribe();
    };
    ActivityListComponent.prototype.updateView = function () {
        var scrollPane = this.el.nativeElement;
        var parentEl = scrollPane.offsetParent;
        var top = scrollPane.offsetTop;
        var parentElHeight = parentEl.offsetHeight;
        // TODO: replace the number for the sender box height;
        var height = parentElHeight - (top + 62);
        scrollPane.style.height = height + 'px';
    };
    ActivityListComponent.prototype.scrollToBottom = function () {
        var scrollPane = this.el.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    };
    return ActivityListComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ActivityListComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Observable_1.Observable)
], ActivityListComponent.prototype, "messages", void 0);
ActivityListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ul[activity-list]',
        templateUrl: './activitylist.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ActivityListComponent);
exports.ActivityListComponent = ActivityListComponent;
//# sourceMappingURL=activitylist.component.js.map