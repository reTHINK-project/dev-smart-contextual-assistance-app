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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// Components
var contextualCommActivity_component_1 = require("../contextualCommActivity/contextualCommActivity.component");
// Services
var services_1 = require("../../services/services");
var ActivityViewComponent = (function () {
    function ActivityViewComponent(route, chatService, ContextualCommService) {
        this.route = route;
        this.chatService = chatService;
        this.ContextualCommService = ContextualCommService;
        this.hostClass = 'view-content d-flex flex-column';
        this.messages = new BehaviorSubject_1.BehaviorSubject([]);
    }
    // Load data ones componet is ready
    ActivityViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.forEach(function (data) {
            console.log('Resolve data Context: ', data.context);
            _this.messages.next(data.context.messages);
        });
        this.ContextualCommService.currentContext().subscribe(function (contextualComm) {
            console.log('[ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
            _this.contextualCommActivityComponent.updateView();
        });
    };
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], ActivityViewComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.ViewChild(contextualCommActivity_component_1.ContextualCommActivityComponent),
        __metadata("design:type", contextualCommActivity_component_1.ContextualCommActivityComponent)
    ], ActivityViewComponent.prototype, "contextualCommActivityComponent", void 0);
    ActivityViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'activity-view',
            templateUrl: './activity-view.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            services_1.ChatService,
            services_1.ContextualCommService])
    ], ActivityViewComponent);
    return ActivityViewComponent;
}());
exports.ActivityViewComponent = ActivityViewComponent;
//# sourceMappingURL=activity-view.component.js.map