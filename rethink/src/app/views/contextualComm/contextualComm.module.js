"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var angular2_moment_1 = require("angular2-moment");
var contextualComm_routing_1 = require("./contextualComm.routing");
// Generic Components
var contact_box_component_1 = require("../../components/user/contact-box.component");
var chatCommunication_component_1 = require("../../components/rethink/communication/chatCommunication.component");
var mediaCommunication_component_1 = require("../../components/rethink/communication/mediaCommunication.component");
var chatEvent_component_1 = require("../../components/rethink/hypertyResource/chat/chatEvent.component");
var fileEvent_component_1 = require("../../components/rethink/hypertyResource/file/fileEvent.component");
// Components views
var user_view_component_1 = require("../userView/user-view.component");
var activity_view_component_1 = require("../activityView/activity-view.component");
// Components
var contextualCommActivity_component_1 = require("../contextualCommActivity/contextualCommActivity.component");
// Custom Pipes
var pipes_1 = require("../../pipes/pipes");
// Services
var services_1 = require("../../services/services");
var ContextualCommModule = (function () {
    function ContextualCommModule() {
    }
    return ContextualCommModule;
}());
ContextualCommModule = __decorate([
    core_1.NgModule({
        imports: [
            pipes_1.PipesModule,
            angular2_moment_1.MomentModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            contextualComm_routing_1.ContextualCommRoutingModule
        ],
        declarations: [
            contextualCommActivity_component_1.ContextualCommActivityComponent,
            activity_view_component_1.ActivityViewComponent,
            user_view_component_1.UserViewComponent,
            chatCommunication_component_1.ChatCommunicationComponent,
            mediaCommunication_component_1.MediaCommunicationComponent,
            contact_box_component_1.ContactBoxComponent,
            chatEvent_component_1.ChatEventComponent,
            fileEvent_component_1.FileEventComponent
        ],
        providers: [
            services_1.AuthGuard,
            services_1.UserResolver,
            services_1.ContextualCommService,
            services_1.ContextualCommResolver
        ]
    })
], ContextualCommModule);
exports.ContextualCommModule = ContextualCommModule;
//# sourceMappingURL=contextualComm.module.js.map