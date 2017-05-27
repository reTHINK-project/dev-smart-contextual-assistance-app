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
var app_models_1 = require("./models/app.models");
// Utils
var utils_1 = require("./utils/utils");
// Services
var contextualCommData_service_1 = require("./services/contextualCommData.service");
var services_1 = require("./services/services");
var AppComponent = (function () {
    function AppComponent(router, route, contactService, rethinkService, triggerActionService, contextualCommDataService, connectorService, chatService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.connectorService = connectorService;
        this.chatService = chatService;
        this.ready = false;
        this.contextOpened = false;
        this.rethinkService.progress.subscribe({
            next: function (v) { return _this.status = v; }
        });
        this.triggerActionService.action().subscribe(function (action) {
            console.log('[App Component - TriggerActionService] - action: ', action);
            if (action === app_models_1.TriggerActions.OpenContextMenu) {
                _this.onOpenContext();
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rethinkService.progress.next('Loading runtime');
        this.rethinkService.loadRuntime()
            .then(function (runtime) {
            _this.rethinkService.progress.next('Loading chat service');
            return _this.chatService.getHyperty();
        }, function (error) {
            console.log('Error: ', error);
            _this.rethinkService.progress.error(error);
            return null;
        })
            .then(function (hyperty) {
            _this.rethinkService.progress.next('Loading connector service');
            return _this.connectorService.getHyperty();
        }, function (error) {
            console.log('Error: ', error);
            _this.rethinkService.progress.error(error);
            return null;
        })
            .then(function (hyperty) {
            _this.rethinkService.progress.next('Getting your identity');
            return _this.rethinkService.getIdentity(hyperty);
        }, function (error) {
            _this.rethinkService.progress.error(error);
        })
            .then(function (user) {
            _this.myIdentity = _this.contactService.getUser(user.userURL);
            _this.rethinkService.progress.next('The app is ready to be used');
            _this.rethinkService.progress.complete();
            _this.rethinkService.status.next(true);
            _this.ready = true;
        });
        // Prepare the chat service to recive invitations
        this.chatService.onInvitation(function (event) {
            console.log('[Chat Communication View - onInvitation] - event:', event);
            var error = function (reason) {
                console.log('Error:', reason);
            };
            _this.chatService.join(event.url)
                .then(function (dataObject) {
                var metadata = event.value;
                var name = metadata.name;
                console.log('[App Component - Join the parent context: ', name, dataObject);
                var normalizedName = utils_1.normalizeName(name);
                console.log('AQUI:', name, normalizedName);
                return _this.contextualCommDataService.joinContext(normalizedName.name, dataObject, normalizedName.parent);
            }).then(function (currentContext) {
                console.log('[App Component] - current context created: ', currentContext);
            }).catch(error);
        });
    };
    AppComponent.prototype.onOpenContext = function (event) {
        this.contextOpened = !this.contextOpened;
    };
    AppComponent.prototype.onClickOutside = function (event) {
        if (event.srcElement.id === 'mp-pusher') {
            this.contextOpened = false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'rethink-app',
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        services_1.ContactService,
        services_1.RethinkService,
        services_1.TriggerActionService,
        contextualCommData_service_1.ContextualCommDataService,
        services_1.ConnectorService,
        services_1.ChatService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map