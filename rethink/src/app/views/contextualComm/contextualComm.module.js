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
var contextualComm_routing_1 = require("./contextualComm.routing");
// Generic Components
var contact_box_component_1 = require("../../components/user/contact-box.component");
var chatCommunication_component_1 = require("../../components/rethink/communication/chatCommunication.component");
var audioCommunication_component_1 = require("../../components/rethink/communication/audioCommunication.component");
var videoCommunication_component_1 = require("../../components/rethink/communication/videoCommunication.component");
var chatEvent_component_1 = require("../../components/rethink/hypertyResource/chat/chatEvent.component");
var fileEvent_component_1 = require("../../components/rethink/hypertyResource/file/fileEvent.component");
// Components views
var user_view_component_1 = require("../userView/user-view.component");
var activity_view_component_1 = require("../activityView/activity-view.component");
var activity_component_1 = require("../../components/activity/activity.component");
var activitylist_component_1 = require("../../components/activity/activitylist.component");
var contextualCommActivity_component_1 = require("../contextualCommActivity/contextualCommActivity.component");
// Services
var authGuard_service_1 = require("../../services/authGuard.service");
var user_resolver_1 = require("../../services/user.resolver");
var contextualComm_resolver_1 = require("../../services/contextualComm.resolver");
var ContextualCommModule = (function () {
    function ContextualCommModule() {
    }
    return ContextualCommModule;
}());
ContextualCommModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            contextualComm_routing_1.ContextualCommRoutingModule
        ],
        declarations: [
            contextualCommActivity_component_1.ContextualCommActivityComponent,
            chatCommunication_component_1.ChatCommunicationComponent,
            activity_view_component_1.ActivityViewComponent,
            activitylist_component_1.ActivityListComponent,
            activity_component_1.ActivityComponent,
            user_view_component_1.UserViewComponent,
            audioCommunication_component_1.AudioCommunicationComponent,
            videoCommunication_component_1.VideoCommunicationComponent,
            contact_box_component_1.ContactBoxComponent,
            chatEvent_component_1.ChatEventComponent,
            fileEvent_component_1.FileEventComponent
        ],
        providers: [
            authGuard_service_1.AuthGuard,
            user_resolver_1.UserResolver,
            contextualComm_resolver_1.ContextualCommResolver
        ]
    })
], ContextualCommModule);
exports.ContextualCommModule = ContextualCommModule;
//# sourceMappingURL=contextualComm.module.js.map