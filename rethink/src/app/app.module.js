"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// routing
var app_routing_module_1 = require("./app-routing.module");
var notification_component_1 = require("./components/notification/notification.component");
var contextualComm_module_1 = require("./views/contextualComm/contextualComm.module");
// components
var app_component_1 = require("./app.component");
var home_component_1 = require("./views/home/home.component");
var contextualComm_component_1 = require("./views/contextualComm/contextualComm.component");
var contextualCommUsers_component_1 = require("./views/contextualCommUsers/contextualCommUsers.component");
var userIdentity_component_1 = require("./components/rethink/userIdentity/userIdentity.component");
var breadcrumb_component_1 = require("./views/breadcrumb/breadcrumb.component");
var my_self_component_1 = require("./components/mySelf/my-self.component");
var add_user_component_1 = require("./views/contextualCommUsers/add-user.component");
// Services
var services_1 = require("./services/services");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            platform_browser_1.BrowserModule,
            contextualComm_module_1.ContextualCommModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            my_self_component_1.MySelfComponent,
            add_user_component_1.AddUserComponent,
            notification_component_1.NotificationComponent,
            userIdentity_component_1.UserIdentityComponent,
            contextualComm_component_1.ContextualCommComponent,
            breadcrumb_component_1.ContextBreadcrumbComponent,
            contextualCommUsers_component_1.ContextualCommUsersComponent
        ],
        providers: [
            services_1.servicesInjectables
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map