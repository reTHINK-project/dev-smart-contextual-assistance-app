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
var notification_action_event_1 = require("./components/notification/notifications/interfaces/notification.action-event");
var native_notifications_module_1 = require("./components/notification/native-notifications.module");
var config_1 = require("./config");
var app_models_1 = require("./models/app.models");
// Utils
var utils_1 = require("./utils/utils");
// Services
var contextualCommData_service_1 = require("./services/contextualCommData.service");
var services_1 = require("./services/services");
var AppComponent = (function () {
    function AppComponent(router, titleService, route, natNotificationsService, notificationsService, contactService, rethinkService, triggerActionService, contextualCommDataService, connectorService, chatService) {
        var _this = this;
        this.router = router;
        this.titleService = titleService;
        this.route = route;
        this.natNotificationsService = natNotificationsService;
        this.notificationsService = notificationsService;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.connectorService = connectorService;
        this.chatService = chatService;
        this.actionResult = new core_1.EventEmitter();
        this.contextOpened = false;
        this.haveFocus = true;
        this.ready = false;
        this.natNotificationsService.requestPermission();
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
    AppComponent.prototype.onBlurEvent = function (event) {
        console.log('[App Lost Focus] - blur:', event);
        this.natNotificationsService.haveFocus = false;
    };
    AppComponent.prototype.onFocusEvent = function (event) {
        console.log('[App Have Focus] - focus:', event);
        this.natNotificationsService.haveFocus = true;
    };
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
        this.connectorService.onInvitation.subscribe(function (event) {
            console.log('[Media Communication Component] - event', event);
            var title = 'Incoming call';
            var content = 'A ' + event.mode + ' call is Incoming from ' + event.user.username;
            var avatar = event.user.avatar;
            _this.notificationsService.create(title, content, 'info', {
                showProgressBar: false,
                pauseOnHover: false,
                haveActions: true,
                metadata: event
            }, avatar, _this.actionResult);
            _this.natNotificationsService.create(title, {
                icon: avatar,
                body: content,
                data: event,
                silent: false,
                sound: 'sound',
            }).subscribe(function (n) {
                console.log('Native:', n, n.notification, n.event);
                n.notification.onclick = function (x) {
                    console.log('Native:', x);
                    window.focus();
                    this.close();
                };
            });
        });
        this.actionResult.subscribe(function (a) {
            console.log('[Media Communication Component] - Params Action:', a);
            _this.actionEvent(a);
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
    AppComponent.prototype.actionEvent = function (actionEvent) {
        console.log('[Media Communication Component] -  Action Event: ', actionEvent);
        console.log('[Media Communication Component] -  Action Event: ', actionEvent.metadata);
        var metadata = actionEvent.metadata;
        var mode = metadata.mode;
        var currentUser = this.contactService.sessionUser.username;
        var paths = utils_1.splitFromURL(metadata.metadata.name, currentUser);
        if (actionEvent.action === notification_action_event_1.ActionType.ACCEPT) {
            var navigationExtras = {
                queryParams: { 'action': mode }
            };
            console.log('[Media Communication Component] -  navigate to: ', paths);
            console.log('[Media Communication Component] -  navigate to: ', paths.context, paths.task, paths.user);
            var navigationArgs = [paths.context];
            var userTo = void 0;
            if (utils_1.isAnUser(paths.task)) {
                userTo = utils_1.clearMyUsername(paths.task, currentUser);
            }
            else {
                navigationArgs.push(paths.task);
                userTo = utils_1.clearMyUsername(paths.user, currentUser);
            }
            navigationArgs.push('user');
            navigationArgs.push(userTo);
            console.log('[Connector Service] -  navigate to path: ', navigationArgs);
            this.router.navigate(navigationArgs, navigationExtras);
        }
        else {
            console.log('[Media Communication Component] -  navigate to path: ', this.connectorService.getControllers);
            this.connectorService.getControllers['answer'].decline();
        }
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
    __decorate([
        core_1.HostListener('window:blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onBlurEvent", null);
    __decorate([
        core_1.HostListener('window:focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onFocusEvent", null);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rethink-app',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            router_1.ActivatedRoute,
            native_notifications_module_1.NativeNotificationsService,
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