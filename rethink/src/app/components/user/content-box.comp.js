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
var Rx_1 = require('rxjs/Rx');
var ContentBox = (function () {
    function ContentBox(cd, renderer, el) {
        this.cd = cd;
        this.renderer = renderer;
        this.el = el;
        this.hostClass = 'content-box user';
    }
    ContentBox.prototype.ngOnInit = function () {
        this.cd.detach();
    };
    ContentBox.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.msgObs = this.messages.subscribe(function (messages) {
            setTimeout(function () {
                _this.scrollToBottom();
            });
            _this.cd.detectChanges();
            _this.cd.markForCheck();
            _this.cd.reattach();
        });
        this.updateView();
        this.scrollToBottom();
    };
    ContentBox.prototype.ngOnDestroy = function () {
        this.msgObs.unsubscribe();
    };
    ContentBox.prototype.updateView = function () {
        var scrollPane = this.el.nativeElement;
        var parentEl = scrollPane.offsetParent;
        var top = scrollPane.offsetTop;
        var parentElHeight = parentEl.offsetHeight;
        // TODO: replace the number for the sender box height;
        var height = parentElHeight - (top + 62);
        scrollPane.style.height = height + 'px';
    };
    ContentBox.prototype.scrollToBottom = function () {
        var scrollPane = this.el.nativeElement;
        scrollPane.scrollTop = scrollPane.scrollHeight;
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContentBox.prototype, "hostClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rx_1.Observable)
    ], ContentBox.prototype, "messages", void 0);
    ContentBox = __decorate([
        core_1.Component({
            selector: 'div[content-box]',
            templateUrl: 'comp/user/content-box.comp.html'
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.Renderer, core_1.ElementRef])
    ], ContentBox);
    return ContentBox;
}());
exports.ContentBox = ContentBox;
//# sourceMappingURL=content-box.comp.js.map