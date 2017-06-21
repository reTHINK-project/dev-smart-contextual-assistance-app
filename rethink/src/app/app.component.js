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
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var notifications_module_1 = require("./components/notification/notifications.module");
var config_1 = require("./config");
var app_models_1 = require("./models/app.models");
// Utils
var utils_1 = require("./utils/utils");
// Services
var contextualCommData_service_1 = require("./services/contextualCommData.service");
var services_1 = require("./services/services");
var AppComponent = (function () {
    function AppComponent(router, titleService, route, notificationsService, contactService, rethinkService, triggerActionService, contextualCommDataService, connectorService, chatService) {
        var _this = this;
        this.router = router;
        this.titleService = titleService;
        this.route = route;
        this.notificationsService = notificationsService;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.connectorService = connectorService;
        this.chatService = chatService;
        this.ready = false;
        this.options = {
            position: ['top', 'left'],
            timeOut: 0,
            lastOnBottom: true,
            clickToClose: true
        };
        this.contextOpened = false;
        this.rethinkService.progress.subscribe({
            next: function (v) { _this.status = v; _this.titleService.setTitle(config_1.config.pageTitlePrefix + v); }
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
            _this.hypertiesReady();
        });
    };
    AppComponent.prototype.onClickClouse = function (event) {
        console.log('AQUI:', event);
    };
    AppComponent.prototype.hypertiesReady = function () {
        var _this = this;
        // Prepare the chat service to recive invitations
        this.chatService.onInvitation(function (event) {
            console.log('[Chat Communication View - onInvitation] - event:', event);
            _this.processEvent(event).then(function (result) {
                console.log('[Chat Communication View - onInvitation] - event processed:', result);
            }).catch(function (reason) {
                console.error('[Chat Communication View - onInvitation] - event not processed:', reason);
            });
        });
        this.notificationsService.success('Some Title', 'Some Content', {
            showProgressBar: true,
            pauseOnHover: false,
            maxLength: 10
        });
    };
    AppComponent.prototype.processEvent = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = event.url;
            var metadata = event.value;
            var name = metadata.name;
            _this.chatService.join(url).then(function (dataObject) {
                var normalizedName = utils_1.normalizeName(name);
                console.log('[App Component - Join the to the context: ', name, dataObject, normalizedName);
                return _this.contextualCommDataService.joinContext(normalizedName.name, normalizedName.id, dataObject, normalizedName.parent);
            }).then(function (currentContext) {
                console.log('[App Component] - current context created: ', currentContext);
                resolve(currentContext);
            }).catch(function (reason) {
                console.log('Error:', reason);
                reject(reason);
            });
        });
    };
    AppComponent.prototype.onOpenContext = function (event) {
        this.contextOpened = !this.contextOpened;
    };
    AppComponent.prototype.onClickOutside = function (event) {
        console.log(event);
        if (event && ((event.srcElement && event.srcElement.id === 'mp-pusher') || (event.target && event.target.id === 'mp-pusher'))) {
            this.contextOpened = false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rethink-app',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            router_1.ActivatedRoute,
            notifications_module_1.NotificationsService,
            services_1.ContactService,
            services_1.RethinkService,
            services_1.TriggerActionService,
            contextualCommData_service_1.ContextualCommDataService,
            services_1.ConnectorService,
            services_1.ChatService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map