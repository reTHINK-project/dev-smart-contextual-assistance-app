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
// Services
var services_1 = require('../../services/services');
var ActivityViewComponent = (function () {
    function ActivityViewComponent(router, route, chatService, messageService) {
        this.router = router;
        this.route = route;
        this.chatService = chatService;
        this.messageService = messageService;
        this.chatActive = false;
    }
    // Load data ones componet is ready
    ActivityViewComponent.prototype.ngOnInit = function () {
        // Subscribe to route params
        /*    this.route.params.subscribe(params => {
              console.log('[Activity View - onInit]', params);
            });*/
        this.messages = this.messageService.messageList;
    };
    ActivityViewComponent.prototype.ngAfterViewInit = function () {
        console.log('[Activity View  - AfterViewInit]');
    };
    ActivityViewComponent.prototype.ngOnDestroy = function () {
    };
    ActivityViewComponent.prototype.onMessage = function (message) {
        console.log("Message:", message);
        this.chatService.send(message).then(function (message) {
            console.log('[Activity View - onMessage] - message sent', message);
        });
    };
    ActivityViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'activity-view',
            templateUrl: './activity-view.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, services_1.ChatService, services_1.MessageService])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;
//# sourceMappingURL=activity-view.component.js.map