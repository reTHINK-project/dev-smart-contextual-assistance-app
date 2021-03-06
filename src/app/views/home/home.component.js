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
var app_models_1 = require("../../models/app.models");
// Services
var services_1 = require("../../services/services");
var contextualCommData_service_1 = require("../../services/contextualCommData.service");
var HomeComponent = (function () {
    function HomeComponent(route, triggerActionService, contextualCommDataService, rethinkService) {
        this.route = route;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.rethinkService = rethinkService;
    }
    // Load data ones componet is ready
    HomeComponent.prototype.ngOnInit = function () {
        this.contextualComms = this.contextualCommDataService.getContexts();
    };
    HomeComponent.prototype.onCreateEvent = function () {
        this.triggerActionService.trigger(app_models_1.TriggerActions.OpenContextMenuCreator);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-view',
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            services_1.TriggerActionService,
            contextualCommData_service_1.ContextualCommDataService,
            services_1.RethinkService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map