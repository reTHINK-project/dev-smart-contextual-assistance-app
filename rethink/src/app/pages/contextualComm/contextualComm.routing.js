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
// Components
var authGuard_service_1 = require('../../services/authGuard.service');
var contextualComm_resolver_1 = require('../../services/contextualComm.resolver');
var contextualComm_component_1 = require('./contextualComm.component');
var contextualCommActivity_component_1 = require('../contextualCommActivity/contextualCommActivity.component');
// TODO: Optimize the Resolve Context
var contextualCommRoutes = [
    {
        path: 'context/:trigger',
        component: contextualComm_component_1.ContextualCommComponent,
        canActivate: [
            authGuard_service_1.AuthGuard
        ],
        resolve: {
            context: contextualComm_resolver_1.ContextualCommResolver
        },
        children: [
            {
                path: '',
                component: contextualCommActivity_component_1.ContextualCommActivityComponent,
            } // ,
        ]
    } /*,
    {
      path: ':context/:id',
      component: ContextualCommComponent,
      children:[
        {
          path: '',
          component: ActivityViewComponent
        },
        ...userRoutes
      ]
    }*/
];
var ContextualCommRoutingModule = (function () {
    function ContextualCommRoutingModule() {
    }
    ContextualCommRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(contextualCommRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ContextualCommRoutingModule);
    return ContextualCommRoutingModule;
}());
exports.ContextualCommRoutingModule = ContextualCommRoutingModule;
//# sourceMappingURL=contextualComm.routing.js.map