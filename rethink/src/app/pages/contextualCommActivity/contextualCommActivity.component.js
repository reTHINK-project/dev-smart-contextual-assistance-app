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
var activity_view_component_1 = require('../activityView/activity-view.component');
// Services
var chat_service_1 = require('../../services/rethink/chat.service');
var context_service_1 = require('../../services/rethink/context.service');
var ContextualCommActivityComponent = (function () {
    function ContextualCommActivityComponent(chatService, contextService) {
        this.chatService = chatService;
        this.contextService = contextService;
        this.hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list';
        this.messages = new BehaviorSubject_1.BehaviorSubject([]);
    }
    // Load data ones componet is ready
    ContextualCommActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('[ContextualCommActivityComponent - ngOnInit]');
        this.contextService.contextualComm().subscribe(function (contextualComm) {
            console.log('[ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
            // this.activitView.updateView();
        });
    };
    ContextualCommActivityComponent.prototype.onMessage = function (message) {
        this.chatService.send(message).then(function (message) {
            console.log('[Activity View - onMessage] - message sent', message);
        });
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContextualCommActivityComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.ViewChild(activity_view_component_1.ActivityViewComponent), 
        __metadata('design:type', activity_view_component_1.ActivityViewComponent)
    ], ContextualCommActivityComponent.prototype, "activitView", void 0);
    ContextualCommActivityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'context-activity-list',
            templateUrl: './contextualCommActivity.component.html'
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, context_service_1.ContextService])
    ], ContextualCommActivityComponent);
    return ContextualCommActivityComponent;
}());
exports.ContextualCommActivityComponent = ContextualCommActivityComponent;
//# sourceMappingURL=contextualCommActivity.component.js.map