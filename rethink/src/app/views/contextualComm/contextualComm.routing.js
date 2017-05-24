"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Components
var services_1 = require("../../services/services");
var contextualCommData_resolver_1 = require("../../services/contextualCommData.resolver");
var user_resolver_1 = require("../../services/user.resolver");
var contextualComm_component_1 = require("./contextualComm.component");
var activity_view_component_1 = require("../activityView/activity-view.component");
var user_view_component_1 = require("../userView/user-view.component");
// TODO: Optimize the Resolve Context
var contextualCommRoutes = [
    {
        path: ':context',
        component: contextualComm_component_1.ContextualCommComponent,
        canActivate: [services_1.AuthGuard],
        canActivateChild: [services_1.ContextualCommActivateService],
        resolve: {
            context: contextualCommData_resolver_1.ContextualCommDataResolver
        },
        children: [
            {
                path: '',
                component: activity_view_component_1.ActivityViewComponent,
                resolve: {
                    context: contextualCommData_resolver_1.ContextualCommDataResolver
                }
            },
            {
                path: ':task',
                component: activity_view_component_1.ActivityViewComponent,
                resolve: {
                    context: contextualCommData_resolver_1.ContextualCommDataResolver
                },
            },
            {
                path: ':task/:user',
                component: user_view_component_1.UserViewComponent,
                resolve: {
                    user: user_resolver_1.UserResolver,
                    context: contextualCommData_resolver_1.ContextualCommDataResolver
                }
            }
        ]
    }
];
var ContextualCommRoutingModule = (function () {
    function ContextualCommRoutingModule() {
    }
    return ContextualCommRoutingModule;
}());
ContextualCommRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(contextualCommRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], ContextualCommRoutingModule);
exports.ContextualCommRoutingModule = ContextualCommRoutingModule;
//# sourceMappingURL=contextualComm.routing.js.map