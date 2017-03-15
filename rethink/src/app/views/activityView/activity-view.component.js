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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
// Components
var contextualCommActivity_component_1 = require('../contextualCommActivity/contextualCommActivity.component');
// Services
var services_1 = require('../../services/services');
var ActivityViewComponent = (function () {
    function ActivityViewComponent(chatService, contextService) {
        this.chatService = chatService;
        this.contextService = contextService;
        this.hostClass = '';
        this.messages = new BehaviorSubject_1.BehaviorSubject([]);
        this.chatActive = false;
    }
    // Load data ones componet is ready
    ActivityViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contextService.contextualComm().subscribe(function (contextualComm) {
            console.log('[ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
            _this.contextualCommActivityComponent.updateView();
        });
    };
    ActivityViewComponent.prototype.onMessage = function (message) {
        this.chatService.send(message).then(function (message) {
            console.log('[Activity View - onMessage] - message sent', message);
        });
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ActivityViewComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.ViewChild(contextualCommActivity_component_1.ContextualCommActivityComponent), 
        __metadata('design:type', contextualCommActivity_component_1.ContextualCommActivityComponent)
    ], ActivityViewComponent.prototype, "contextualCommActivityComponent", void 0);
    ActivityViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'activity-view',
            templateUrl: './activity-view.component.html'
        }), 
        __metadata('design:paramtypes', [services_1.ChatService, services_1.ContextService])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;
//# sourceMappingURL=activity-view.component.js.map