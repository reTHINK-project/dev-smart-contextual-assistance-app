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
var ContactBox = (function () {
    function ContactBox() {
        this.hostClass = 'contactbox padding all-100 small';
        this.videoClick = new core_1.EventEmitter();
        this.audioClick = new core_1.EventEmitter();
    }
    ContactBox.prototype.ngOnInit = function () {
        console.log('HERE:', this.user);
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContactBox.prototype, "hostClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], ContactBox.prototype, "user", void 0);
    __decorate([
        core_1.Output('video-call'), 
        __metadata('design:type', Object)
    ], ContactBox.prototype, "videoClick", void 0);
    __decorate([
        core_1.Output('audio-call'), 
        __metadata('design:type', Object)
    ], ContactBox.prototype, "audioClick", void 0);
    ContactBox = __decorate([
        core_1.Component({
            selector: 'div[contact-box]',
            templateUrl: 'comp/user/contact-box.comp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ContactBox);
    return ContactBox;
}());
exports.ContactBox = ContactBox;
//# sourceMappingURL=contact-box.comp.js.map