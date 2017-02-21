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
var Observable_1 = require('rxjs/Observable');
var ContextualCommActivityComponent = (function () {
    function ContextualCommActivityComponent(el) {
        this.el = el;
        this.hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list';
    }
    // Load data ones componet is ready
    ContextualCommActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('[ContextualCommActivityComponent - ngOnInit]');
        this.messages.subscribe(function (messages) {
            console.log('[Contextual Comm Activity - new messsage] - message:', messages);
            _this.updateView();
        });
    };
    ContextualCommActivityComponent.prototype.ngAfterViewInit = function () {
        this.updateView();
    };
    ContextualCommActivityComponent.prototype.updateView = function () {
        // TODO: Solve the problem of try to scroll and adjust height before the ngAfterViewInit
        try {
            var scrollPane = this.el.nativeElement;
            var parentEl = scrollPane.offsetParent;
            var top_1 = scrollPane.offsetTop;
            var parentElHeight = parentEl.offsetHeight;
            // TODO: replace the number for the sender box height;
            var height = parentElHeight - (top_1 + 62);
            scrollPane.style.height = height + 'px';
            this.scrollToBottom();
        }
        catch (error) {
        }
    };
    ContextualCommActivityComponent.prototype.scrollToBottom = function () {
        var scrollPane = this.el.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContextualCommActivityComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], ContextualCommActivityComponent.prototype, "messages", void 0);
    ContextualCommActivityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ul[context-activity-list]',
            templateUrl: './contextualCommActivity.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ContextualCommActivityComponent);
    return ContextualCommActivityComponent;
}());
exports.ContextualCommActivityComponent = ContextualCommActivityComponent;
//# sourceMappingURL=contextualCommActivity.component.js.map