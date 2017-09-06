webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_home_home_component__ = __webpack_require__("../../../../../src/app/views/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// Services

var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__views_home_home_component__["a" /* HomeComponent */],
        canActivate: [
            __WEBPACK_IMPORTED_MODULE_3__services_services__["c" /* AuthGuard */]
        ],
        data: {
            pageTitle: 'Home',
            pageSection: 'home'
        }
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<notifications></notifications>\n\n<!-- container -->\n<div screen class=\"container-fluid\">\n\n  <div class=\"row\">\n\n    <!-- pusher -->\n    <div class=\"mp-pusher wrapper {{contextOpened ? 'mp-pushed' : ''}}\" (click)='onClickOutside($event)' id=\"mp-pusher\">\n      <context-menu></context-menu>\n\n      <!-- scroller -->\n      <div class=\"scroller\">\n\n        <!-- scroller-inner -->\n        <div #section class=\"scroller-inner d-flex flex-column align-items-stretch\">\n\n          <div *ngIf=\"showAlert\" [innerHTML]=\"notificationStatus\" class=\"alert alert-warning m-0 rounded-0\" role=\"alert\"></div>\n\n          <header class=\"header\">\n            <div class=\"primary-menu row no-gutters\">\n\n              <!-- Logotipo -->\n              <div class=\"col align-center\">\n                <a class=\"open-context\" (click)=\"onOpenContext($event)\"><i class=\"fa fa-lightbulb-o\"></i></a>\n                <a routerLink=\"/\" title=\"go to the reTHINK home\" alt=\"go to the reTHINK home\"><img title=\"reTHINK\" alt=\"reTHINK\" src=\"{{assetsConfig.images}}/rethinklogo2.png\"></a>\n              </div>\n\n              <!-- My Identity -->\n              <div class=\"col-6\">\n                <my-self *ngIf=\"myIdentity && ready\" [model]=\"myIdentity\"></my-self>\n              </div>\n\n            </div>\n\n            <div *ngIf=\"showBreadcrumb\"  class=\"secondary-menu row no-gutters\">\n\n              <!-- breadcrumb -->\n              <div class=\"col-12\">\n                <ul *ngIf=\"ready\" (openContext)=\"openSecondaryContext($event)\" context-breadcrumb></ul>\n              </div>\n\n            </div>\n\n          </header>\n\n          <router-outlet (activate)='onActivate($event)'></router-outlet>\n\n          <loading *ngIf=\"!ready\"  [status]=\"status\"></loading>\n\n        </div>\n        <!-- /scroller-inner -->\n      </div>\n      <!-- /scroller -->\n    </div>\n\n  </div>\n  <!-- /pusher -->\n</div>\n<!-- /container -->\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_notification_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_notification_notifications_interfaces_notification_action_event__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/notification.action-event.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_app_models__ = __webpack_require__("../../../../../src/app/models/app.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_contextualComm_contextualComm_component__ = __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_routing_service__ = __webpack_require__("../../../../../src/app/services/routing.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_breadcrumb_service__ = __webpack_require__("../../../../../src/app/services/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_rethink_userAvailability_service__ = __webpack_require__("../../../../../src/app/services/rethink/userAvailability.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// Utils


// Services






var AppComponent = /** @class */ (function () {
    function AppComponent(router, titleService, route, chatService, rethinkService, contactService, routingService, connectorService, breadcrumbService, notificationsService, triggerActionService, contextualCommService, userAvailabilityService, natNotificationsService, contextualCommDataService) {
        var _this = this;
        this.router = router;
        this.titleService = titleService;
        this.route = route;
        this.chatService = chatService;
        this.rethinkService = rethinkService;
        this.contactService = contactService;
        this.routingService = routingService;
        this.connectorService = connectorService;
        this.breadcrumbService = breadcrumbService;
        this.notificationsService = notificationsService;
        this.triggerActionService = triggerActionService;
        this.contextualCommService = contextualCommService;
        this.userAvailabilityService = userAvailabilityService;
        this.natNotificationsService = natNotificationsService;
        this.contextualCommDataService = contextualCommDataService;
        this.actionResult = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.showBreadcrumb = false;
        this.showAlert = false;
        this.contextOpened = false;
        this.ready = false;
        this.assetsConfig = __WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */];
        this.natNotFeedback = this.natNotificationsService.requestPermission()
            .subscribe(function (success) {
            _this.notificationStatus = success;
        }, function (reason) {
            _this.showAlert = true;
            _this.notificationStatus = '<span class="font-weight-bold">Warning!</span> ' + reason;
        });
        this.rethinkService.progress.subscribe({
            next: function (v) { _this.status = v; _this.titleService.setTitle(__WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */].pageTitlePrefix + v); }
        });
        this.actionService = this.triggerActionService.action().subscribe(function (action) {
            console.log('[App Component - TriggerActionService] - action: ', action);
            if (action === __WEBPACK_IMPORTED_MODULE_7__models_app_models__["b" /* TriggerActions */].OpenContextMenu) {
                _this.onOpenContext();
            }
        });
        this.contextualCommEvent = this.contextualCommService.contextualCommEvent.subscribe(function (event) {
            var title = 'New communication channel';
            var content = 'You have a new communication channel ' + event.contextualComm.name;
            _this.notificationsService.success(title, content, {
                showProgressBar: false,
                timeOut: 5000,
                pauseOnHover: false,
                haveActions: false,
            });
            _this.natNotificationsService.create(title, {
                body: content,
                tag: __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["c" /* NotificationTag */].INCOMING_CALL,
                vibrate: __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["d" /* NotificationVibrate */].INCOMING_CALL,
                persistent: true,
                sound: __WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */].sounds + '/successful.mp3',
            });
        });
    }
    AppComponent.prototype.onBlurEvent = function (event) {
        // console.log('[App Lost Focus] - blur:', event);
        this.natNotificationsService.haveFocus = false;
    };
    AppComponent.prototype.onFocusEvent = function (event) {
        // console.log('[App Have Focus] - focus:', event);
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
            _this.rethinkService.progress.next('Loading user status availability service');
            return _this.userAvailabilityService.getHyperty();
        })
            .then(function (hyperty) {
            _this.rethinkService.progress.next('The app is ready to be used');
            _this.rethinkService.progress.complete();
            _this.rethinkService.status.next(true);
            _this.ready = true;
            _this.hypertiesReady();
        }, function (error) {
            console.log('Error: ', error);
            _this.rethinkService.progress.error(error);
            return null;
        });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.routerEvent = this.router.events.subscribe(function (navigation) {
            console.log('[App Component] - navigation: ', navigation);
            if (navigation instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* NavigationEnd */]) {
                _this.toggleSideBar();
                var url = navigation.url;
                if (url.includes('@')) {
                    url = url.substr(0, url.lastIndexOf('/'));
                }
            }
        });
        this.routeData = this.routingService.routingChanges.subscribe(function (pageSection) {
            console.log('[Routing Service Output] - ', pageSection);
            if (pageSection.section !== 'home') {
                _this.showBreadcrumb = true;
            }
            else {
                _this.showBreadcrumb = false;
            }
            _this.section.nativeElement.setAttribute('data-section', pageSection.section);
        });
    };
    AppComponent.prototype.hypertiesReady = function () {
        var _this = this;
        // Prepare the chat service to recive invitations
        this.chatInvitation = this.chatService.onInvitation.subscribe(function (event) {
            console.log('[App View View - chatService onInvitation] - event:', event);
            _this.processEvent(event).then(function (result) {
                console.log('[App View View - chatService onInvitation] - event processed:', result);
            }).catch(function (reason) {
                console.error('[App View View - chatService onInvitation] - event not processed:', reason);
            });
        });
        this.closeEvent = this.chatService.onCloseEvent.subscribe(function (event) {
            console.log('Context to be removed: ', event, event.url);
            _this.contextualCommDataService.getContextByResource(event.url).subscribe(function (context) {
                _this.contextualCommDataService.removeContext(context)
                    .subscribe(function (result) {
                    _this.notificationsService.info('Context Removed', 'The context ' + context.name + ' was been removed', {
                        showProgressBar: false,
                        timeOut: 5000,
                        pauseOnHover: false,
                        haveActions: false
                    });
                }, function (error) {
                    _this.notificationsService.error('Error removing context', error, {
                        showProgressBar: false,
                        timeOut: 5000,
                        pauseOnHover: false,
                        haveActions: false
                    });
                });
            });
        });
        this.connectorInvitation = this.connectorService.onInvitation.subscribe(function (event) {
            console.log('[Media Communication Component] - event', event);
            var title = 'Incoming call';
            var content = 'A ' + event.mode + ' call is Incoming from ' + event.user.username;
            var avatar = event.user.avatar;
            _this.natNotificationsService.create(title, {
                body: content,
                icon: avatar,
                sound: __WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */].sounds + '/classic-ringer.mp3',
                tag: __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["c" /* NotificationTag */].INCOMING_CALL,
                vibrate: __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["d" /* NotificationVibrate */].INCOMING_CALL,
                persistent: true,
                data: {
                    metadata: event
                }
            }).subscribe(function (notEvent) {
                console.log('notification:', notEvent);
            }, function (error) {
                console.warn('warning:', error);
            });
            _this.notificationsService.create(title, content, 'info', {
                showProgressBar: false,
                pauseOnHover: false,
                haveActions: true,
                metadata: event,
                sound: __WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */].sounds + '/classic-ringer.mp3',
            }, avatar, _this.actionResult);
        }, function (error) {
            console.log('[Media Communication Component] - error', error);
        });
        this.actionResult.subscribe(function (a) {
            console.log('[Media Communication Component] - Params Action:', a);
            _this.actionEvent(a);
        });
        var currentNotifications = [];
        this.notificationsService.getChangeEmitter().subscribe(function (notification) {
            console.log('NotificationService - notification', notification);
            if (notification.command === 'set') {
                currentNotifications.push(notification);
            }
        });
        this.connectorCancel = this.connectorService.onDisconnect.subscribe(function (event) {
            console.log('Notification Service - onDisconnect', event);
            var currURL = event.url;
            var selected;
            if (currURL) {
                selected = currentNotifications.filter(function (not) {
                    console.log('Notification Service - onDisconnect: ', not.notification);
                    if (not.notification.override.metadata.metadata.url === currURL) {
                        return true;
                    }
                    return false;
                });
            }
            if (selected.length === 1) {
                _this.notificationsService.remove(selected[0].notification.id);
            }
            else {
                _this.notificationsService.remove();
            }
        });
    };
    AppComponent.prototype.processEvent = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = event.url;
            var metadata = event.value;
            var name = metadata.name;
            _this.chatService.join(url).then(function (dataObject) {
                var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["g" /* normalizeName */])(name);
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
        var paths = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["i" /* splitFromURL */])(metadata.metadata.name, currentUser);
        if (actionEvent.action === __WEBPACK_IMPORTED_MODULE_4__components_notification_notifications_interfaces_notification_action_event__["a" /* ActionType */].ACCEPT) {
            var navigationExtras = {
                queryParams: { 'action': mode }
            };
            console.log('[Media Communication Component] -  navigate to: ', paths);
            console.log('[Media Communication Component] -  navigate to: ', paths.context, paths.task, paths.user);
            var navigationArgs = [paths.context];
            var userTo = void 0;
            if (Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["e" /* isAnUser */])(paths.task)) {
                userTo = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["a" /* clearMyUsername */])(paths.task, currentUser);
            }
            else {
                navigationArgs.push(paths.task);
                userTo = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["a" /* clearMyUsername */])(paths.user, currentUser);
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
    AppComponent.prototype.nativeNotificationSubscription = function (n) {
        console.log('Native:', n, n.notification, n.event);
        n.notification.onclick = function (x) {
            console.log('Native:', x);
            window.focus();
            this.close();
        };
    };
    AppComponent.prototype.onOpenContext = function (event) {
        this.contextOpened = !this.contextOpened;
    };
    AppComponent.prototype.onClickOutside = function (event) {
        // console.log(event);
        if (event && ((event.srcElement && event.srcElement.id === 'mp-pusher') || (event.target && event.target.id === 'mp-pusher'))) {
            this.contextOpened = false;
        }
    };
    AppComponent.prototype.openSecondaryContext = function (event) {
        var el = event.currentTarget;
        if (el) {
            if (el.classList.contains('opened')) {
                el.classList.remove('opened');
            }
            else {
                el.classList.add('opened');
            }
        }
        // TODO: try to put this code in Sidebar Directive
        // TODO: i tried but i can't do it;
        var element = document.getElementById('sidebar');
        if (element) {
            if (element.classList.contains('opened')) {
                element.classList.remove('opened');
            }
            else {
                element.classList.add('opened');
            }
        }
    };
    AppComponent.prototype.toggleSideBar = function () {
        var element = document.getElementsByClassName('menu-trigger')[0];
        var e = new MouseEvent('click');
        console.log('[App Component] - navigation:', element, e);
        if (element && element.classList.contains('opened')) {
            element.dispatchEvent(e);
        }
    };
    AppComponent.prototype.onActivate = function (event) {
        if (event instanceof __WEBPACK_IMPORTED_MODULE_9__views_contextualComm_contextualComm_component__["a" /* ContextualCommComponent */]) {
            this.context = event;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('section'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]) === "function" && _a || Object)
    ], AppComponent.prototype, "section", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onBlurEvent", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onFocusEvent", null);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'rethink-app',
            template: __webpack_require__("../../../../../src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["d" /* Title */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_15__services_services__["d" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_services__["d" /* ChatService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_15__services_services__["j" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_services__["j" /* RethinkService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_15__services_services__["f" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_services__["f" /* ContactService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__services_routing_service__["a" /* RoutingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_routing_service__["a" /* RoutingService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_15__services_services__["e" /* ConnectorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_services__["e" /* ConnectorService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_11__services_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__services_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_3__components_notification_notifications_module__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__components_notification_notifications_module__["NotificationsService"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_15__services_services__["k" /* TriggerActionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_services__["k" /* TriggerActionService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_12__services_contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__services_contextualComm_service__["a" /* ContextualCommService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_14__services_rethink_userAvailability_service__["a" /* UserAvailabilityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__services_rethink_userAvailability_service__["a" /* UserAvailabilityService */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["b" /* NativeNotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_notification_native_notifications_module__["b" /* NativeNotificationsService */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_13__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _r || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_CustomUtils__ = __webpack_require__("../../../../../src/app/utils/CustomUtils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_directive_module__ = __webpack_require__("../../../../../src/app/shared/directive.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_mySelf_my_self_component__ = __webpack_require__("../../../../../src/app/components/mySelf/my-self.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_notification_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_rethink_userIdentity_userIdentity_component__ = __webpack_require__("../../../../../src/app/components/rethink/userIdentity/userIdentity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_notification_native_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__views_home_home_component__ = __webpack_require__("../../../../../src/app/views/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__views_loading_loading_component__ = __webpack_require__("../../../../../src/app/views/loading/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__views_contextualCommUsers_add_user_component__ = __webpack_require__("../../../../../src/app/views/contextualCommUsers/add-user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__views_contextualComm_contextualComm_module__ = __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__views_breadcrumb_breadcrumb_component__ = __webpack_require__("../../../../../src/app/views/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__views_contextualCommMenu_contextMenu_component__ = __webpack_require__("../../../../../src/app/views/contextualCommMenu/contextMenu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__views_contextualComm_contextualComm_component__ = __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__views_contextualCommMenu_add_contextualComm_component__ = __webpack_require__("../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__views_contextualCommUsers_contextualCommUsers_component__ = __webpack_require__("../../../../../src/app/views/contextualCommUsers/contextualCommUsers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__views_contextualCommMenu_remove_contextualComm_component__ = __webpack_require__("../../../../../src/app/views/contextualCommMenu/remove-contextualComm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// routing

// Utils

// Directives

// components





// View Components










// Services

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__shared_directive_module__["a" /* DirectiveModules */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_16__views_contextualComm_contextualComm_module__["a" /* ContextualCommModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["d" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__components_notification_notifications_module__["NotificationsModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__components_notification_native_notifications_module__["a" /* NativeNotificationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13__views_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_mySelf_my_self_component__["a" /* MySelfComponent */],
                __WEBPACK_IMPORTED_MODULE_15__views_contextualCommUsers_add_user_component__["a" /* AddUserComponent */],
                __WEBPACK_IMPORTED_MODULE_14__views_loading_loading_component__["a" /* LoadingComponent */],
                __WEBPACK_IMPORTED_MODULE_18__views_contextualCommMenu_contextMenu_component__["a" /* ContextMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_rethink_userIdentity_userIdentity_component__["a" /* UserIdentityComponent */],
                __WEBPACK_IMPORTED_MODULE_19__views_contextualComm_contextualComm_component__["a" /* ContextualCommComponent */],
                __WEBPACK_IMPORTED_MODULE_20__views_contextualCommMenu_add_contextualComm_component__["a" /* AddContextualCommComponent */],
                __WEBPACK_IMPORTED_MODULE_17__views_breadcrumb_breadcrumb_component__["a" /* ContextBreadcrumbComponent */],
                __WEBPACK_IMPORTED_MODULE_21__views_contextualCommUsers_contextualCommUsers_component__["a" /* ContextualCommUsersComponent */],
                __WEBPACK_IMPORTED_MODULE_22__views_contextualCommMenu_remove_contextualComm_component__["a" /* RemoveContextualCommComponent */],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__components_rethink_userIdentity_userIdentity_component__["a" /* UserIdentityComponent */],
                __WEBPACK_IMPORTED_MODULE_19__views_contextualComm_contextualComm_component__["a" /* ContextualCommComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__utils_CustomUtils__["a" /* CustomUtils */],
                __WEBPACK_IMPORTED_MODULE_23__services_services__["m" /* servicesInjectables */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/mySelf/my-self.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"current-user\" ngbDropdown #myDrop=\"ngbDropdown\">\n\n  <div ngbDropdownToggle id=\"dropdownConfig\" class=\"d-flex justify-content-around align-items-center user-area\">\n    <user-identity [model]=\"model\"></user-identity>\n  </div>\n\n  <div ngbDropdownMenu class=\"dropdown-menu-right\" aria-labelledby=\"dropdownConfig\">\n    <h6 class=\"dropdown-header\">User Availability</h6>\n    <div class=\"dropdown-item dropdown-item-action\" href=\"#\">\n      <span class=\"d-block pb-1\">Availability:</span>\n      <div ngbRadioGroup [(ngModel)]=\"model.status\" class=\"btn-group-vertical w-100\" name=\"status\">\n        <label ngbButtonLabel class=\"btn btn-sm mb-0 text-left {{ model.status === 'available' ? 'btn-success' : 'btn-outline-secondary' }}\">\n          <input ngbButton type=\"radio\" autocomplete=\"off\" value=\"available\" (click)=\"onChangeEvent('available')\">On\n        </label>\n        <label ngbButtonLabel class=\"btn btn-sm mb-0 text-left {{ model.status === 'busy' ? 'btn-danger' : 'btn-outline-secondary' }}\">\n          <input ngbButton type=\"radio\" autocomplete=\"off\" value=\"busy\" (click)=\"onChangeEvent('busy')\">Busy\n        </label>\n        <label ngbButtonLabel class=\"btn btn-sm mb-0 text-left {{ model.status === 'unavailable' ? 'btn-secondary' : 'btn-outline-secondary' }}\">\n          <input ngbButton type=\"radio\" autocomplete=\"off\" value=\"unavailable\" (click)=\"onChangeEvent('unavailable')\">Off\n        </label>\n      </div>\n    </div>\n    <div class=\"dropdown-divider\"></div>\n    <button class=\"dropdown-item\">soon</button>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/mySelf/my-self.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySelfComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__("../../../../rxjs/add/observable/from.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_rethink_userAvailability_service__ = __webpack_require__("../../../../../src/app/services/rethink/userAvailability.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MySelfComponent = /** @class */ (function () {
    function MySelfComponent(config, userAvailabilityService) {
        this.userAvailabilityService = userAvailabilityService;
        this.hostClass = 'float-right';
        config.autoClose = false;
    }
    MySelfComponent.prototype.ngOnInit = function () {
    };
    MySelfComponent.prototype.onChangeEvent = function (status) {
        console.log('[MySelfComponent] status changed:', status);
        this.userAvailabilityService.setStatus(status);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__models_models__["d" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__models_models__["d" /* User */]) === "function" && _a || Object)
    ], MySelfComponent.prototype, "model", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], MySelfComponent.prototype, "hostClass", void 0);
    MySelfComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-self',
            template: __webpack_require__("../../../../../src/app/components/mySelf/my-self.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbDropdownConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_rethink_userAvailability_service__["a" /* UserAvailabilityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_rethink_userAvailability_service__["a" /* UserAvailabilityService */]) === "function" && _c || Object])
    ], MySelfComponent);
    return MySelfComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=my-self.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/native-notifications.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NativeNotificationsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__native_notifications_services_native_notifications_service__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications/services/native-notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__native_notifications_interfaces_native_notification_type__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications/interfaces/native-notification.type.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__native_notifications_interfaces_native_notification_type__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__native_notifications_interfaces_native_notification_type__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__native_notifications_services_native_notifications_service__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NativeNotificationsModule = /** @class */ (function () {
    function NativeNotificationsModule() {
    }
    NativeNotificationsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__native_notifications_services_native_notifications_service__["a" /* NativeNotificationsService */]]
        })
    ], NativeNotificationsModule);
    return NativeNotificationsModule;
}());

//# sourceMappingURL=native-notifications.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/native-notifications/interfaces/native-notification.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NotificationVibrate; });
var NotificationTag;
(function (NotificationTag) {
    NotificationTag["NEW_MESSAGE"] = "new-message";
    NotificationTag["INCOMING_CALL"] = "incoming-call";
    NotificationTag["NEW_CONTEXT"] = "new-context";
})(NotificationTag || (NotificationTag = {}));
var NotificationVibrate;
(function (NotificationVibrate) {
    NotificationVibrate[NotificationVibrate["NEW_MESSAGE"] = [200, 100, 200, 100, 200, 100, 200]] = "NEW_MESSAGE";
    NotificationVibrate[NotificationVibrate["INCOMING_CALL"] = [200, 10, 200, 10, 200, 10, 200]] = "INCOMING_CALL";
    NotificationVibrate[NotificationVibrate["NEW_CONTEXT"] = [200, 100, 200, 100, 200, 100, 200]] = "NEW_CONTEXT";
})(NotificationVibrate || (NotificationVibrate = {}));
//# sourceMappingURL=native-notification.type.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/native-notifications/services/native-notifications.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NativeNotificationsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NativeNotificationsService = /** @class */ (function () {
    function NativeNotificationsService() {
        this.permission = this.isSupported() ? Notification.permission : 'denied';
        // TODO: add a list of sounds to each type of event
        this.audio = new Audio();
    }
    NativeNotificationsService.prototype.requestPermission = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (obs) {
            if (!('Notification' in window)) {
                obs.error('Notifications are not available in this environment');
                obs.complete();
            }
            if ('Notification' in window) {
                Notification.requestPermission(function (status) {
                    _this.permission = status;
                    if (_this.permission !== 'granted') {
                        obs.error("You hasn't granted permission to send Native notifications");
                        obs.complete();
                    }
                });
            }
        });
    };
    NativeNotificationsService.prototype.isSupported = function () {
        return 'Notification' in window;
    };
    NativeNotificationsService.prototype.create = function (title, options) {
        var _this = this;
        if (this.haveFocus) {
            return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (obs) { obs.complete(); });
        }
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (obs) {
            if (!('Notification' in window)) {
                obs.error('Notifications are not available in this environment');
                obs.complete();
                return;
            }
            if (_this.permission !== 'granted') {
                obs.error("The user hasn't granted you permission to send Native notifications");
                obs.complete();
                return;
            }
            console.log('ServiceWorker Registration:', _this.permission, options);
            if (options.persistent) {
                console.log('ServiceWorker Registration:', navigator.serviceWorker.onmessage);
                navigator.serviceWorker.ready.then(function (swRegistration) {
                    console.log('ServiceWorker Registration:', swRegistration);
                    var persistentOps = options;
                    if (options.data && options.data.hasOwnProperty('actions')) {
                        persistentOps.actions = options.data.actions;
                    }
                    ;
                    swRegistration.showNotification(title, persistentOps).then(function () {
                        console.log('ServiceWorker Registration - show Notification:', title, options);
                        if (options.sound) {
                            _this.audio.src = options.sound;
                            _this.audio.load();
                            _this.audio.play();
                        }
                    }).catch(function (reason) {
                        obs.error({ event: reason });
                        obs.complete();
                    });
                });
                navigator.serviceWorker.onmessage = function (e) {
                    obs.next({ event: e });
                    obs.complete();
                };
            }
            else {
                var n_1 = new Notification(title, options);
                if (options.sound) {
                    _this.audio.src = options.sound;
                    _this.audio.load();
                    _this.audio.play();
                }
                n_1.onshow = function (e) { return obs.next({ notification: n_1, event: e }); };
                n_1.onclick = function (e) { return obs.next({ notification: n_1, event: e }); };
                n_1.onerror = function (e) { return obs.error({ notification: n_1, event: e }); };
                n_1.onclose = function () { return obs.complete(); };
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NativeNotificationsService.prototype, "haveFocus", void 0);
    NativeNotificationsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], NativeNotificationsService);
    return NativeNotificationsService;
}());

//# sourceMappingURL=native-notifications.service.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsModule", function() { return NotificationsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_components_notifications_component__ = __webpack_require__("../../../../../src/app/components/notification/notifications/components/notifications.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notifications_components_notification_component__ = __webpack_require__("../../../../../src/app/components/notification/notifications/components/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_pipes_max_pipe__ = __webpack_require__("../../../../../src/app/components/notification/notifications/pipes/max.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_services_notifications_service__ = __webpack_require__("../../../../../src/app/components/notification/notifications/services/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_interfaces_notification_type__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/notification.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_interfaces_notification_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__notifications_interfaces_notification_type__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6__notifications_interfaces_notification_type__, "NotificationsService")) __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return __WEBPACK_IMPORTED_MODULE_6__notifications_interfaces_notification_type__["NotificationsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_interfaces_options_type__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/options.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_interfaces_options_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__notifications_interfaces_options_type__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__notifications_interfaces_options_type__, "NotificationsService")) __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return __WEBPACK_IMPORTED_MODULE_7__notifications_interfaces_options_type__["NotificationsService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notifications_interfaces_icons__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/icons.ts");
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return __WEBPACK_IMPORTED_MODULE_5__notifications_services_notifications_service__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// Type







var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule_1 = NotificationsModule;
    NotificationsModule.forRoot = function () {
        return {
            ngModule: NotificationsModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_5__notifications_services_notifications_service__["a" /* NotificationsService */]]
        };
    };
    NotificationsModule = NotificationsModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notifications_components_notifications_component__["a" /* NotificationsComponent */],
                __WEBPACK_IMPORTED_MODULE_3__notifications_components_notification_component__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_4__notifications_pipes_max_pipe__["a" /* MaxPipe */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__notifications_components_notifications_component__["a" /* NotificationsComponent */]]
        })
    ], NotificationsModule);
    return NotificationsModule;
    var NotificationsModule_1;
}());

//# sourceMappingURL=notifications.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/components/notification.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".notification {\n  width: 100%;\n  padding: 10px 20px;\n  box-sizing: border-box;\n  position: relative;\n  float: left;\n  margin-bottom: 10px;\n  color: #fff;\n  cursor: pointer;\n  transition: all 0.5s;\n\n  border: 1px solid;\n}\n\n.notification .sn-title {\n  margin: 0;\n  padding: 0 0 0 50px;\n  line-height: 30px;\n  font-size: 20px;\n}\n\n.notification .sn-content {\n  margin: 0;\n  font-size: 16px;\n  padding: 0 0 0 50px;\n  line-height: 20px;\n}\n\n.notification .sn-actions {\n  margin-top: 10px;\n}\n\n.notification .icon {\n  position: absolute;\n  box-sizing: border-box;\n  top: 18px;\n  left: 20px;\n  width: 40px;\n  height: 40px;\n  padding: 5px;\n}\n\n.notification .icon svg {\n  fill: #fff;\n  width: 100%;\n  height: 100%;\n}\n\n.notification .icon svg g {\n  fill: #fff;\n}\n\n.notification.rtl-mode {\n  direction: rtl;\n}\n\n.notification.rtl-mode .sn-content {\n  padding: 0 0 0 50px;\n}\n\n.notification.rtl-mode svg {\n  left: 0;\n  right: auto;\n}\n\n.notification.error { background-color: #f2dede; border-color: #ebcccc; color: #a94442; }\n.notification.success { background-color: #dff0d8; border-color: #d0e9c6; color: #3c763d; }\n.notification.alert { background-color: #fcf8e3; border-color: #faf2cc; color: #8a6d3b; }\n.notification.info { background-color: #d9edf7; border-color: #bcdff1; color: #31708f; }\n.notification.alert { background-color: #fcf8e3; border-color: #faf2cc; color: #8a6d3b; }\n\n.notification .sn-progress-loader {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 5px;\n}\n\n.notification .sn-progress-loader span {\n  float: left;\n  height: 100%;\n}\n\n.notification.success .sn-progress-loader span { background: #689F38; }\n.notification.error .sn-progress-loader span { background: #D32F2F; }\n.notification.alert .sn-progress-loader span { background: #edc242; }\n.notification.info .sn-progress-loader span { background: #0288D1; }\n.notification.warn .sn-progress-loader span { background: #edc242; }\n.notification.bare .sn-progress-loader span { background: #ccc; }\n\n.notification.warn div .sn-title { color: #444; }\n.notification.warn div .sn-content { color: #444; }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/components/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"notification\"\n    [@enterLeave]=\"item.state\"\n    (click)=\"onClick($event)\"\n    [class]=\"theClass\"\n\n    [ngClass]=\"{\n      'alert': item.type === 'alert',\n      'error': item.type === 'error',\n      'warn': item.type === 'warn',\n      'success': item.type === 'success',\n      'info': item.type === 'info',\n      'bare': item.type === 'bare',\n      'rtl-mode': rtl\n    }\"\n\n    (mouseenter)=\"onEnter()\"\n    (mouseleave)=\"onLeave()\">\n\n    <div *ngIf=\"!item.html\">\n      <div class=\"sn-title\">{{item.title}}</div>\n      <div class=\"sn-content\">{{item.content | max:maxLength}}</div>\n\n      <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\n    </div>\n    <div *ngIf=\"item.html\" [innerHTML]=\"item.html\"></div>\n\n    <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\n      <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\n    </div>\n\n    <div *ngIf=\"haveActions\"  class=\"sn-actions\">\n      <button type=\"button\" (click)=\"onAcceptClick($event)\" class=\"btn btn-sm btn-success\">Accept</button>\n      <button type=\"button\" (click)=\"onRejectClick($event)\" class=\"btn btn-sm btn-warning\">Reject</button>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/components/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_notification_type__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/notification.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interfaces_notification_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__interfaces_notification_type__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_notifications_service__ = __webpack_require__("../../../../../src/app/components/notification/notifications/services/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interfaces_notification_action_event__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/notification.action-event.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(notificationService, domSanitizer, zone) {
        var _this = this;
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.zone = zone;
        // Progress bar variables
        this.progressWidth = 0;
        this.stopTime = false;
        this.count = 0;
        this.instance = function () {
            _this.zone.runOutsideAngular(function () {
                _this.zone.run(function () { return _this.diff = (new Date().getTime() - _this.start) - (_this.count * _this.speed); });
                if (_this.count++ === _this.steps) {
                    _this.zone.run(function () { return _this.remove(); });
                }
                else if (!_this.stopTime) {
                    if (_this.showProgressBar) {
                        _this.zone.run(function () { return _this.progressWidth += 100 / _this.steps; });
                    }
                    _this.timer = setTimeout(_this.instance, (_this.speed - _this.diff));
                }
            });
        };
    }
    NotificationComponent.prototype.ngOnInit = function () {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
    };
    NotificationComponent.prototype.startTimeOut = function () {
        var _this = this;
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(function () { return _this.timer = setTimeout(_this.instance, _this.speed); });
    };
    NotificationComponent.prototype.onEnter = function () {
        if (this.pauseOnHover) {
            this.stopTime = true;
        }
    };
    NotificationComponent.prototype.onLeave = function () {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    };
    NotificationComponent.prototype.setPosition = function () {
        return this.position !== 0 ? this.position * 90 : 0;
    };
    NotificationComponent.prototype.onClick = function ($e) {
        this.item.click.emit($e);
        if (this.clickToClose) {
            this.remove();
        }
    };
    NotificationComponent.prototype.onAcceptClick = function ($e) {
        this.item.onEventAction.emit(this.buildActionEvent($e, __WEBPACK_IMPORTED_MODULE_5__interfaces_notification_action_event__["a" /* ActionType */].ACCEPT));
        this.remove();
    };
    NotificationComponent.prototype.onRejectClick = function ($e) {
        this.item.onEventAction.emit(this.buildActionEvent($e, __WEBPACK_IMPORTED_MODULE_5__interfaces_notification_action_event__["a" /* ActionType */].REJECT));
        this.remove();
    };
    NotificationComponent.prototype.buildActionEvent = function ($e, action) {
        console.log('Action Click: ', $e, this.item, action);
        var toEmit = {
            createdOn: this.item.createdOn,
            notification: this.item,
            type: this.item.type,
            id: this.item.id,
            action: action,
            metadata: this.item.override.metadata
        };
        return toEmit;
    };
    // Attach all the overrides
    NotificationComponent.prototype.attachOverrides = function () {
        var _this = this;
        Object.keys(this.item.override).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = _this.item.override[a];
            }
        });
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
    };
    NotificationComponent.prototype.remove = function () {
        var _this = this;
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.zone.run(function () { return _this.notificationService.set(_this.item, false); });
                }, 310);
            });
        }
        else {
            this.notificationService.set(this.item, false);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "timeOut", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "showProgressBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "pauseOnHover", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "clickToClose", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "maxLength", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "theClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "rtl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], NotificationComponent.prototype, "animate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], NotificationComponent.prototype, "position", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__interfaces_notification_type__["Notification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__interfaces_notification_type__["Notification"]) === "function" && _a || Object)
    ], NotificationComponent.prototype, "item", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], NotificationComponent.prototype, "haveActions", void 0);
    NotificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'notification',
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('enterLeave', [
                    // Enter from right
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('fromRight', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('* => fromRight', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(5%)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('fromRightOut', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(-5%)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('fromRight => fromRightOut', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('300ms ease-in-out')
                    ]),
                    // Enter from left
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('fromLeft', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('* => fromLeft', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(-5%)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('fromLeftOut', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'translateX(5%)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('fromLeft => fromLeftOut', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'translateX(0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('300ms ease-in-out')
                    ]),
                    // Rotate
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('scale', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'scale(1)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('* => scale', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'scale(0)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('scaleOut', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'scale(0)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('scale => scaleOut', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'scale(1)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ]),
                    // Scale
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('rotate', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'rotate(0deg)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('* => rotate', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'rotate(5deg)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ]),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('rotateOut', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 0, transform: 'rotate(-5deg)' })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('rotate => rotateOut', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ opacity: 1, transform: 'rotate(0deg)' }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out')
                    ])
                ])
            ],
            template: __webpack_require__("../../../../../src/app/components/notification/notifications/components/notification.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/notification/notifications/components/notification.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_notifications_service__["a" /* NotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_notifications_service__["a" /* NotificationsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _d || Object])
    ], NotificationComponent);
    return NotificationComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=notification.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/components/notifications.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/options.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_notifications_service__ = __webpack_require__("../../../../../src/app/components/notification/notifications/services/notifications.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(_service) {
        this._service = _service;
        this.onCreate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDestroy = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onActionEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.notifications = [];
        this.position = ['bottom', 'right'];
        // Received values
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        // Sent values
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.theClass = '';
        this.rtl = false;
        this.animate = 'fromRight';
    }
    Object.defineProperty(NotificationsComponent.prototype, "options", {
        set: function (opt) {
            this.attachChanges(opt);
        },
        enumerable: true,
        configurable: true
    });
    NotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Notification Service:', this._service);
        // Listen for changes in the service
        this.listener = this._service.getChangeEmitter()
            .subscribe(function (item) {
            switch (item.command) {
                case 'cleanAll':
                    _this.notifications = [];
                    break;
                case 'clean':
                    _this.cleanSingle(item.id);
                    break;
                case 'set':
                    if (item.add) {
                        _this.add(item.notification);
                    }
                    else {
                        _this.defaultBehavior(item);
                    }
                    break;
                default:
                    _this.defaultBehavior(item);
                    break;
            }
        });
    };
    // Default behavior on event
    NotificationsComponent.prototype.defaultBehavior = function (value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    };
    // Add the new notification to the notification array
    NotificationsComponent.prototype.add = function (item) {
        item.createdOn = new Date();
        var toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(0, 1);
                }
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(this.notifications.length - 1, 1);
                }
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    };
    // Check if notifications should be prevented
    NotificationsComponent.prototype.block = function (item) {
        var toCheck = item.html ? this.checkHtml : this.checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0) {
            for (var i = 0; i < this.notifications.length; i++) {
                if (toCheck(this.notifications[i], item)) {
                    return true;
                }
            }
        }
        if (this.preventLastDuplicates) {
            var comp = void 0;
            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) {
                    comp = this.notifications[this.notifications.length - 1];
                }
                else {
                    comp = this.notifications[0];
                }
            }
            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) {
                comp = this.lastNotificationCreated;
            }
            else {
                return false;
            }
            return toCheck(comp, item);
        }
        return false;
    };
    NotificationsComponent.prototype.checkStandard = function (checker, item) {
        return checker.type === item.type && checker.title === item.title && checker.content === item.content;
    };
    NotificationsComponent.prototype.checkHtml = function (checker, item) {
        return checker.html ? checker.type === item.type &&
            checker.title === item.title &&
            checker.content === item.content &&
            checker.html === item.html : false;
    };
    // Attach all the changes received in the options object
    NotificationsComponent.prototype.attachChanges = function (options) {
        var _this = this;
        Object.keys(options).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = options[a];
            }
        });
    };
    NotificationsComponent.prototype.buildEmit = function (notification, to) {
        var toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            icon: notification.icon,
            id: notification.id
        };
        if (notification.html) {
            toEmit.html = notification.html;
        }
        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }
        if (!to) {
            toEmit.destroyedOn = new Date();
        }
        return toEmit;
    };
    NotificationsComponent.prototype.cleanSingle = function (id) {
        var indexOfDelete = 0;
        var doDelete = false;
        this.notifications.forEach(function (notification, idx) {
            if (notification.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });
        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
        }
    };
    NotificationsComponent.prototype.ngOnDestroy = function () {
        if (this.listener) {
            this.listener.unsubscribe();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__["Options"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__["Options"]) === "function" && _a || Object),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__["Options"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__interfaces_options_type__["Options"]) === "function" && _b || Object])
    ], NotificationsComponent.prototype, "options", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], NotificationsComponent.prototype, "onCreate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], NotificationsComponent.prototype, "onDestroy", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], NotificationsComponent.prototype, "onActionEvent", void 0);
    NotificationsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'notifications',
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            template: "\n        <div class=\"notification-wrapper\" [ngClass]=\"position\">\n            <notification *ngFor=\"let a of notifications; let i = index\"\n                [haveActions]=\"actions\"\n                [item]=\"a\"\n                [timeOut]=\"timeOut\"\n                [clickToClose]=\"clickToClose\"\n                [maxLength]=\"maxLength\"\n                [showProgressBar]=\"showProgressBar\"\n                [pauseOnHover]=\"pauseOnHover\"\n                [theClass]=\"theClass\"\n                [rtl]=\"rtl\"\n                [animate]=\"animate\"\n                [position]=\"i\"\n                >\n            </notification>\n        </div>\n    ",
            styles: ["\n        .notification-wrapper {\n            position: fixed;\n            width: 300px;\n            z-index: 2500;\n        }\n\n        .notification-wrapper.left { left: 20px; }\n        .notification-wrapper.top { top: 20px; }\n        .notification-wrapper.right { right: 20px; }\n        .notification-wrapper.bottom { bottom: 20px; }\n\n        @media (max-width: 340px) {\n            .notification-wrapper {\n                width: auto;\n                left: 20px;\n                right: 20px;\n            }\n        }\n    "]
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_notifications_service__["a" /* NotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_notifications_service__["a" /* NotificationsService */]) === "function" && _c || Object])
    ], NotificationsComponent);
    return NotificationsComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=notifications.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/interfaces/icons.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultIcons; });
var defaultIcons = {
    alert: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\"/>\n        </svg>\n    ",
    error: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n            <path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>\n        </svg>\n    ",
    info: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/>\n        </svg>\n    ",
    success: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n        </svg>\n    ",
    warn: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\" width=\"64\" viewBox=\"0 0 64 64\" height=\"64\">\n          <circle cx=\"32.086\" cy=\"50.142\" r=\"2.256\"/>\n          <path d=\"M30.08 25.012V42.32c0 1.107.897 2.005 2.006 2.005s2.006-.897 2.006-2.005V25.012c0-1.107-.897-2.006-2.006-2.006s-2.006.898-2.006 2.006z\"/>\n          <path d=\"M63.766 59.234L33.856 3.082c-.697-1.308-2.844-1.308-3.54 0L.407 59.234c-.331.622-.312 1.372.051 1.975.362.605 1.015.975 1.72.975h59.816c.705 0 1.357-.369 1.721-.975.361-.603.381-1.353.051-1.975zM5.519 58.172L32.086 8.291l26.568 49.881H5.519z\"/>\n        </svg>\n    ",
    custom: function (icon) {
        return "<img alt=\"" + icon + "\" class=\"rounded-circle w-100\" src=" + icon + ">";
    }
};
//# sourceMappingURL=icons.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/interfaces/notification.action-event.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionType; });
var ActionType;
(function (ActionType) {
    ActionType[ActionType["ACCEPT"] = 'accept'] = "ACCEPT";
    ActionType[ActionType["REJECT"] = 'reject'] = "REJECT";
    ActionType[ActionType["MAYBE"] = 'maybe'] = "MAYBE";
})(ActionType || (ActionType = {}));
;
//# sourceMappingURL=notification.action-event.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/interfaces/notification.type.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=notification.type.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/interfaces/options.type.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=options.type.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/pipes/max.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaxPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MaxPipe = /** @class */ (function () {
    function MaxPipe() {
    }
    MaxPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value)
            return value;
        var allowed = args[0];
        var received = value.length;
        if (received > allowed && allowed !== 0) {
            var toCut = allowed - received;
            return value.slice(0, toCut);
        }
        return value;
    };
    MaxPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'max' })
    ], MaxPipe);
    return MaxPipe;
}());

//# sourceMappingURL=max.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/components/notification/notifications/services/notifications.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interfaces_icons__ = __webpack_require__("../../../../../src/app/components/notification/notifications/interfaces/icons.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationsService = /** @class */ (function () {
    function NotificationsService() {
        this.emitter = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.icons = __WEBPACK_IMPORTED_MODULE_2__interfaces_icons__["a" /* defaultIcons */];
    }
    NotificationsService.prototype.set = function (notification, to) {
        notification.id = notification.override && notification.override.id ?
            notification.override.id : Math.random().toString(36).substring(3);
        notification.click = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.emitter.next({ command: 'set', notification: notification, add: to });
        return notification;
    };
    ;
    NotificationsService.prototype.getChangeEmitter = function () {
        return this.emitter;
    };
    //// Access methods
    NotificationsService.prototype.success = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'success',
            icon: this.icons.success,
            override: override,
            onEventAction: event
        }, true);
    };
    NotificationsService.prototype.error = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'error',
            icon: this.icons.error,
            override: override,
            onEventAction: event
        }, true);
    };
    NotificationsService.prototype.alert = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'alert',
            icon: this.icons.alert,
            override: override,
            onEventAction: event
        }, true);
    };
    NotificationsService.prototype.info = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'info',
            icon: this.icons.info,
            override: override,
            onEventAction: event
        }, true);
    };
    NotificationsService.prototype.warn = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'warn',
            icon: this.icons.warn,
            override: override,
            onEventAction: event
        }, true);
    };
    NotificationsService.prototype.bare = function (title, content, override, event) {
        return this.set({
            title: title,
            content: content || '',
            type: 'bare',
            icon: 'bare',
            override: override,
            onEventAction: event
        }, true);
    };
    // With type method
    NotificationsService.prototype.create = function (title, content, type, override, icon, event) {
        if (content === void 0) { content = ''; }
        if (type === void 0) { type = 'success'; }
        return this.set({
            title: title,
            content: content,
            type: type,
            icon: this.icons.custom(icon) || this.icons[type],
            override: override,
            onEventAction: event
        }, true);
    };
    // HTML Notification method
    NotificationsService.prototype.html = function (html, type, override, event) {
        if (type === void 0) { type = 'success'; }
        return this.set({
            html: html,
            type: type,
            icon: 'bare',
            override: override,
            onEventAction: event
        }, true);
    };
    // Remove all notifications method
    NotificationsService.prototype.remove = function (id) {
        if (id) {
            this.emitter.next({ command: 'clean', id: id });
        }
        else {
            this.emitter.next({ command: 'cleanAll' });
        }
    };
    NotificationsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], NotificationsService);
    return NotificationsService;
}());

//# sourceMappingURL=notifications.service.js.map

/***/ }),

/***/ "../../../../../src/app/components/rethink/communication/chatCommunication.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"w-100 row no-gutters float-left\" #sendForm=\"ngForm\" (submit)=\"onSubmit(sendForm.value)\">\n\n    <div class=\"message col-12 col-lg-7 float-left\">\n        <input type=\"text\" placeholder=\"your message goes here\"\n        class=\"form-control w-100 chat-sender\"\n        [(ngModel)]=\"model.message\" ngControl=\"message\" name=\"message\">\n    </div>\n\n    <!-- TODO: Add when this funcionality it's ready -->\n    <!--\n    <span class=\"line mt-3 hidden-lg-up\"></span>\n\n    <ul class=\"uploader col-12 col-lg-5 mb-0 pt-3 pt-md-0 float-left\">\n        <li class=\"send-file w-50  float-left align-center\">\n          <a class=\"send-file\" href=\"#\"><i class=\"fa fa-file-o\"></i> add file</a>\n        </li>\n        <li class=\"take-pic w-50 float-left align-center\">\n          <a class=\"snap\" hre=\"#\"><i class=\"fa fa-camera-retro\"></i> take a photo</a>\n        </li>\n    </ul>\n    -->\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/components/rethink/communication/chatCommunication.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatCommunicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_native_notifications_services_native_notifications_service__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications/services/native-notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification_native_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/native-notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatCommunicationComponent = /** @class */ (function () {
    function ChatCommunicationComponent(chatService, natNotificationsService, contextualCommDataService) {
        var _this = this;
        this.chatService = chatService;
        this.natNotificationsService = natNotificationsService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'message-sender';
        this.active = false;
        this.onMessage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.model = { message: '' };
        this.messages = this.chatService.onMessageEvent.subscribe(function (message) {
            _this.natNotificationsService.create('New Message', {
                icon: message.user.avatar,
                body: message.message,
                tag: __WEBPACK_IMPORTED_MODULE_2__notification_native_notifications_module__["c" /* NotificationTag */].NEW_MESSAGE,
                vibrate: __WEBPACK_IMPORTED_MODULE_2__notification_native_notifications_module__["d" /* NotificationVibrate */].NEW_MESSAGE,
                sound: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].sounds + '/solemn.mp3',
                persistent: true
            }).subscribe(function (n) {
                console.log('Native:', n, n.notification, n.event);
                n.notification.onclick = function (x) {
                    console.log('Native:', x);
                    window.focus();
                    this.close();
                };
            });
        });
    }
    ChatCommunicationComponent.prototype.ngOnInit = function () {
    };
    ChatCommunicationComponent.prototype.ngOnDestroy = function () {
        this.messages.unsubscribe();
    };
    ChatCommunicationComponent.prototype.onSubmit = function (event) {
        var message = this.model.message;
        if (message) {
            console.log('[Chat Communication View - onMessage] - Message:', message, this.chatService.chatControllerActive);
            this.chatService.send(message).then(function (sentMessage) {
                console.log('[Activity View - onMessage] - message sent', sentMessage);
            });
            this.clean();
        }
    };
    ChatCommunicationComponent.prototype.onInvitation = function (event) {
        console.log('[Chat Communication View - onInvitation] - ', event);
        this.chatService.join(event).then(function (discoveredDataObject) {
        }).catch(function (reason) {
            console.log(reason);
        });
    };
    ChatCommunicationComponent.prototype.clean = function () {
        this.model.message = '';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ChatCommunicationComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ChatCommunicationComponent.prototype, "active", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ChatCommunicationComponent.prototype, "onMessage", void 0);
    ChatCommunicationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-view',
            template: __webpack_require__("../../../../../src/app/components/rethink/communication/chatCommunication.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_services__["d" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_services__["d" /* ChatService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__notification_native_notifications_services_native_notifications_service__["a" /* NativeNotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__notification_native_notifications_services_native_notifications_service__["a" /* NativeNotificationsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _c || Object])
    ], ChatCommunicationComponent);
    return ChatCommunicationComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=chatCommunication.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/rethink/communication/mediaCommunication.component.html":
/***/ (function(module, exports) {

module.exports = "<div fullscreen class=\"{{mode}}-call col-12 col-lg-7 h-100\">\n\n  <video #test class=\"player\" autoplay></video>\n\n\t<div class=\"video-wall\">\n\t\t<video #remote *ngIf=\"stream\" class=\"player\" [srcObject]=\"stream\" autoplay></video>\n\t</div>\n\n\t<div *ngIf=\"mode === 'video'\" class=\"video-wall my-video-wall\">\n\t\t<video #local *ngIf=\"myStream\" class=\"player\" [srcObject]=\"myStream\" autoplay muted></video>\n\t</div>\n\n\t<div class=\"contact-me align-center\">\n\n    <span class=\"counter hidden-sm-up w-100\">{{duration | amTimeElapsed}}</span>\n\n    <span class=\"action audio mute float-left\">\n\t\t\t<a (click)=\"onMute()\"><i class=\"fa fa-microphone-slash\"></i></a>\n    </span>\n\n    <span *ngIf=\"mode === 'audio'\"  class=\"action video push-center\">\n      <a [routerLink]=\"\" [queryParams]=\"{ action: 'video' }\" (click)=\"enableVideo()\"><i class=\"fa fa-video-camera\"></i></a>\n    </span>\n\n    <span *ngIf=\"mode === 'video'\" class=\"action audio push-center\">\n      <a [routerLink]=\"\" [queryParams]=\"{ action: 'audio' }\" (click)=\"disableVideo()\"><i class=\"fa fa-phone\"></i></a>\n    </span>\n\n    <span *ngIf=\"mode === 'audio'\" class=\"action audio hangup push-center\">\n      <a [routerLink]=\"\" [queryParams]=\"{}\"><i class=\"fa fa-phone\"></i></a>\n    </span>\n\n    <span *ngIf=\"mode === 'video'\" class=\"action video hangup push-center\">\n      <a [routerLink]=\"\" [queryParams]=\"{}\"><i class=\"fa fa-video-camera\"></i></a>\n    </span>\n\n    <span class=\"counter hidden-xs-down\">{{duration | amTimeElapsed}}</span>\n\n\t\t<span class=\"action volume float-right float-left\">\n\t\t\t<a (click)=\"onVolume()\"><i class=\"fa fa-volume-up\"></i></a>\n\t\t</span>\n\n\t\t<span class=\"action full-screen float-right\">\n\t\t\t<a (click)=\"onFullscreen()\"><i class=\"fa fa-arrows-alt\"></i></a>\n\t\t</span>\n\t</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/rethink/communication/mediaCommunication.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  position: relative; }\n  :host .contact-me {\n    width: 100%;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    padding: 10px;\n    background: rgba(0, 0, 0, 0.5);\n    text-align: center;\n    border-top: 1px solid rgba(255, 255, 255, 0.3); }\n  :host span.action {\n    background-color: rgba(255, 255, 255, 0.15);\n    overflow: hidden;\n    display: inline-block;\n    text-align: center;\n    width: 48px;\n    height: 48px;\n    padding: 0;\n    margin-right: 8px;\n    border-radius: 50%; }\n    :host span.action a {\n      display: block;\n      color: #fff;\n      font-size: 18px;\n      width: 100%;\n      height: 100%;\n      line-height: 46px;\n      text-align: center; }\n    :host span.action.audio, :host span.action.video {\n      background-color: #32d167; }\n    :host span.action.mute {\n      background-color: rgba(255, 255, 255, 0.8); }\n    :host span.action.hangup {\n      background-color: #e44c43;\n      width: 90px;\n      border-radius: 45px; }\n  :host .audio-call,\n  :host .video-call {\n    overflow: hidden; }\n  :host .player {\n    width: 100%;\n    height: 100%; }\n  :host .video-wall {\n    background: #000;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 0; }\n  :host .video-call .my-video-wall {\n    left: auto;\n    right: 10px;\n    top: 10px;\n    width: 120px;\n    height: 120px;\n    background: none; }\n    :host .video-call .my-video-wall .player {\n      height: auto;\n      background: none; }\n  :host .audio-call {\n    background-position: center center;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-color: black; }\n    :host .audio-call .video-wall {\n      display: none;\n      background: none;\n      z-index: -1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/rethink/communication/mediaCommunication.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaCommunicationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_fullscreen_directive__ = __webpack_require__("../../../../../src/app/shared/fullscreen.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Models

// Services



var MediaCommunicationComponent = /** @class */ (function () {
    function MediaCommunicationComponent(rd, el, router, route, vcRef, contactService, connectorService, contextualCommDataService) {
        this.rd = rd;
        this.el = el;
        this.router = router;
        this.route = route;
        this.vcRef = vcRef;
        this.contactService = contactService;
        this.connectorService = connectorService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'video-box row no-gutters h-100';
        this.itIsReady = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.streamingActive = false;
        console.log('[Media Communication Component] - Constructor:', this.route.queryParams);
    }
    MediaCommunicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.streamingActive = false;
        this.localStream = this.connectorService.getLocalStream().subscribe(function (stream) {
            console.log('[Media Communication Component] - get local stream: ', stream);
            _this.myStream = stream;
        });
        this.remoteStream = this.connectorService.getRemoteStream().subscribe(function (stream) {
            console.log('[Media Communication Component] - get remote stream: ', stream);
            _this.streamingActive = true;
            _this.stream = stream;
            _this.duration = new Date();
        });
        this.params = this.route.queryParams.subscribe(function (params) {
            console.log('[Media Communication Component] - queryParams: ', params, _this.streamingActive);
            var action = params['action'];
            _this.mode = action;
            _this.connectorService.mode = action;
            if (_this.mode) {
                _this.prepareComponent();
            }
        });
        this.connStatus = this.connectorService.connectorStatus().subscribe(function (status) {
            console.log('[Media Communication Component] -  connector status: ', status);
            if (status === 'end') {
                _this.reset();
            }
        });
        console.log('[Media Communication Component] - Params Action:', this.mode);
    };
    MediaCommunicationComponent.prototype.ngAfterViewInit = function () {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.itIsReady.emit({
            el: this.el,
            component: this,
            status: 'ready'
        });
    };
    MediaCommunicationComponent.prototype.ngOnDestroy = function () {
        console.log('[Media Communication] - ngOnDestroy');
        if (this.params) {
            this.params.unsubscribe();
        }
        if (this.connStatus) {
            this.connStatus.unsubscribe();
        }
        if (this.localStream) {
            this.localStream.unsubscribe();
        }
        if (this.remoteStream) {
            this.remoteStream.unsubscribe();
        }
        this.onHangup();
    };
    MediaCommunicationComponent.prototype.reset = function () {
        this.stream = null;
        this.myStream = null;
        this.duration = null;
        this.streamingActive = false;
        this.fullscreen.exitFullScreen();
    };
    MediaCommunicationComponent.prototype.prepareComponent = function () {
        console.log('[Media Communication Component] - connection mode: ', this.connectorService.connectorMode, this.streamingActive);
        if (this.connectorService.connectorMode === 'offer' && !this.streamingActive) {
            this.callTo(this.user);
        }
    };
    MediaCommunicationComponent.prototype.callTo = function (user) {
        var _this = this;
        var options = { video: true, audio: true };
        var contextID = this.contextualCommDataService.activeContext().id;
        console.log('[Media Communication Component] - ' + this.mode + ' call To', user, contextID);
        this.connectorService.connect(user.username, options, contextID, user.domain)
            .then(function (controller) {
            if (_this.mode === 'video') {
                _this.connectorService.enableVideo();
            }
            if (_this.mode === 'audio') {
                _this.connectorService.disableVideo();
            }
            _this.streamingActive = true;
            controller.dataObjectReporter.data.mode = _this.mode;
            console.log('[Media Communication Component] - called');
        }).catch(function (reason) {
            console.error(reason);
        });
    };
    MediaCommunicationComponent.prototype.enableVideo = function () {
        this.connectorService.enableVideo();
    };
    MediaCommunicationComponent.prototype.disableVideo = function () {
        this.connectorService.disableVideo();
    };
    MediaCommunicationComponent.prototype.onFullscreen = function () {
        this.fullscreen.toogleFullscreen();
    };
    MediaCommunicationComponent.prototype.onHangup = function () {
        console.log('[Media Communication Component] - Hangup', this.connectorService);
        this.connectorService.hangup();
        this.reset();
    };
    MediaCommunicationComponent.prototype.onMute = function () {
        this.connectorService.mute();
    };
    MediaCommunicationComponent.prototype.onVolume = function () {
        this.connectorService.disableAudio();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], MediaCommunicationComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__shared_fullscreen_directive__["a" /* FullscreenDirective */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__shared_fullscreen_directive__["a" /* FullscreenDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_fullscreen_directive__["a" /* FullscreenDirective */]) === "function" && _a || Object)
    ], MediaCommunicationComponent.prototype, "fullscreen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_models__["d" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_models__["d" /* User */]) === "function" && _b || Object)
    ], MediaCommunicationComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], MediaCommunicationComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
    ], MediaCommunicationComponent.prototype, "itIsReady", void 0);
    MediaCommunicationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'media-view',
            template: __webpack_require__("../../../../../src/app/components/rethink/communication/mediaCommunication.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/rethink/communication/mediaCommunication.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__services_services__["f" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_services__["f" /* ContactService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__services_services__["e" /* ConnectorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_services__["e" /* ConnectorService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _l || Object])
    ], MediaCommunicationComponent);
    return MediaCommunicationComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=mediaCommunication.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/rethink/hypertyResource/chat/chatEvent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"float-right align-right\">\n    <span class=\"date\">{{message.date | amTimeAgo}}</span>\n</div>\n\n<!-- TODO: This should be replaced by the user-identity -->\n<div class=\"user-identity\">\n  <div class=\"user-status float-left\">\n    <img alt=\"{{message.user.avatar}}\" class=\"rounded-circle\" src=\"{{message.user.avatar}}\">\n    <span class=\"status {{message.user.status}}\">\n      <i class=\"fa fa-circle{{message.user.status === 'unavailable' ? '-o' : ''}}\"></i>\n    </span>\n  </div>\n\n  <div class=\"user-profile\">\n    <h3 class=\"contact-name\"><a [routerLink]=\"['user', message.user.username]\">{{message.user.cn}}</a></h3>\n    <span class=\"extra-info\">{{message.user.domain}}</span>\n  </div>\n</div>\n<!-- END OF THE user-identity -->\n\n<!-- message -->\n<p class=\"message\">\n  <span *ngIf=\"isAnEvent\" class=\"chat\">\n    <i class=\"fa fa-keyboard-o\"></i>Wrote a Message\n  </span>{{message.message}}\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/rethink/hypertyResource/chat/chatEvent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatEventComponent = /** @class */ (function () {
    function ChatEventComponent() {
        this.isAnEvent = false;
    }
    ChatEventComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */]) === "function" && _a || Object)
    ], ChatEventComponent.prototype, "message", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ChatEventComponent.prototype, "isAnEvent", void 0);
    ChatEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'chat-event',
            template: __webpack_require__("../../../../../src/app/components/rethink/hypertyResource/chat/chatEvent.component.html")
        })
    ], ChatEventComponent);
    return ChatEventComponent;
    var _a;
}());

//# sourceMappingURL=chatEvent.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/rethink/hypertyResource/file/fileEvent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"push-right align-right\">\n    <span class=\"date\">{{message.date}}</span>\n</div>\n<div class=\"contact-avatar push-left\">\n    <img src=\"{{message.user.avatar}}\">\n    <span class=\"status {{message.user.status}}\">\n      <i class=\"fa fa-circle{{message.user.status==='offline'?'-o':''}}\"></i>\n    </span>\n</div>\n<h4 class=\"contact-name\"><a href=\"#\">{{message.user.cn}}</a></h4>\n\n<!-- File -->\n<p class=\"quarter-vertical-padding\">\n  <span class=\"file\"><i class=\"fa fa-file-o\"></i>Shared a file</span>\n  <span class=\"specs\">foto.jpg</span>\n</p>\n<div class=\"filetransfer\">\n  <a href=\"#file-view\"><img src=\"../../../../assets/img/fileteste.jpg\"></a>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/rethink/hypertyResource/file/fileEvent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileEventComponent = /** @class */ (function () {
    function FileEventComponent() {
    }
    FileEventComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_models__["c" /* Message */]) === "function" && _a || Object)
    ], FileEventComponent.prototype, "message", void 0);
    FileEventComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'file-event',
            template: __webpack_require__("../../../../../src/app/components/rethink/hypertyResource/file/fileEvent.component.html")
        })
    ], FileEventComponent);
    return FileEventComponent;
    var _a;
}());

//# sourceMappingURL=fileEvent.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/rethink/userIdentity/userIdentity.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-status float-left\">\n  <img alt=\"{{model.avatar}}\" class=\"rounded-circle\" src=\"{{model.avatar}}\">\n  <span class=\"status {{model.status}}\">\n    <i class=\"fa fa-circle{{model.status === 'unavailable' ? '-o' : ''}}\"></i>\n  </span>\n</div>\n<div class=\"user-profile float-left\">\n  <h3 class=\"contact-name\">{{model.cn}}</h3>\n  <span class=\"extra-info text-truncate\">{{model.domain}}</span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/rethink/userIdentity/userIdentity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserIdentityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserIdentityComponent = /** @class */ (function () {
    function UserIdentityComponent() {
        this.hostClass = 'user-identity';
    }
    UserIdentityComponent.prototype.ngOnInit = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], UserIdentityComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_models__["d" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_models__["d" /* User */]) === "function" && _a || Object)
    ], UserIdentityComponent.prototype, "model", void 0);
    UserIdentityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-identity',
            template: __webpack_require__("../../../../../src/app/components/rethink/userIdentity/userIdentity.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], UserIdentityComponent);
    return UserIdentityComponent;
    var _a;
}());

//# sourceMappingURL=userIdentity.component.js.map

/***/ }),

/***/ "../../../../../src/app/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");

var config = {
    pageTitlePrefix: 'reThink Project - ',
    appPrefix: 'sca',
    splitChar: '/',
    domain: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].host,
    images: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].images,
    sounds: __WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].sounds
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "../../../../../src/app/models/app.models.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AlertType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TriggerActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoveContextEventType; });
var AlertType;
(function (AlertType) {
    AlertType[AlertType["SUCCESS"] = 'success'] = "SUCCESS";
    AlertType[AlertType["INFO"] = 'info'] = "INFO";
    AlertType[AlertType["DANGER"] = 'danger'] = "DANGER";
    AlertType[AlertType["WARNING"] = 'Warning'] = "WARNING";
    AlertType[AlertType["QUESTION"] = 'question'] = "QUESTION";
})(AlertType || (AlertType = {}));
;
var TriggerActions;
(function (TriggerActions) {
    TriggerActions[TriggerActions["OpenContextMenu"] = 'open-context'] = "OpenContextMenu";
    TriggerActions[TriggerActions["OpenContextMenuCreator"] = 'open-context-creation'] = "OpenContextMenuCreator";
})(TriggerActions || (TriggerActions = {}));
;
;
var RemoveContextEventType;
(function (RemoveContextEventType) {
    RemoveContextEventType[RemoveContextEventType["Remove"] = 'remove'] = "Remove";
    RemoveContextEventType[RemoveContextEventType["Dismissed"] = 'dismissed'] = "Dismissed";
    RemoveContextEventType[RemoveContextEventType["Error"] = 'error'] = "Error";
})(RemoveContextEventType || (RemoveContextEventType = {}));
//# sourceMappingURL=app.models.js.map

/***/ }),

/***/ "../../../../../src/app/models/models.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualComm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContextualCommTrigger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__("../../../../../src/app/config.ts");

var User = /** @class */ (function () {
    function User(obj) {
        this.username = obj && obj.username;
        this.cn = obj && obj.cn;
        this.avatar = obj && obj.avatar;
        this.locale = obj && obj.locale;
        this.userURL = obj && obj.userURL;
        this.status = obj && obj.status || 'unavailable';
        this.unread = obj && obj.unread || 0;
        this.domain = obj && obj.domain || __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* config */].domain;
        this.isLegacy = false;
        this.identifiers = '';
        // TODO: this should be removed
        if (!this.username.includes('@')) {
            this.isLegacy = true;
        }
        // TODO: split by the @ from user and domain <domain>@<identifier>
        this.guid = this.username;
    }
    User.prototype.startStatusObservation = function (availability) {
        var _this = this;
        console.log('[UserModel.startStatusObservation] ', availability);
        this.statustUrl = availability.url;
        this.status = availability.data.values[0].value;
        availability.onChange('*', function (event) {
            console.log('[UserModel] Availability change', event.data);
            _this.status = availability.data.values[0].value;
            console.log('[UserModel] Availability change', _this);
        });
    };
    return User;
}());

var Message = /** @class */ (function () {
    function Message(obj) {
        this.isRead = false;
        this.type = obj && obj.type;
        this.message = obj && obj.message;
        this.user = obj && obj.user;
        this.date = obj && obj.date || new Date().toISOString();
    }
    return Message;
}());

var ContextualComm = /** @class */ (function () {
    function ContextualComm(obj) {
        this.id = obj && String(obj.id).toLowerCase();
        this.url = obj && obj.url;
        this.name = obj && String(obj.name).toLowerCase();
        this.description = obj && obj.description;
        this.communication = obj && obj.communication;
        this.context = obj && obj.context;
        this.contexts = obj && obj.contexts || [];
        this.users = obj && obj.users || [];
        this.messages = obj && obj.messages || [];
        this.icon = obj && obj.icon || '';
        this.reporter = obj && obj.reporter || false;
        this.parent = obj && obj.parent;
        console.log('[Models - ContextualComm] - constructor: ', this.users);
        this.users = this.users.map(function (user) {
            return new User(user);
        });
    }
    ContextualComm.prototype.addUser = function (user) {
        console.log('[Models - ContextualComm] - addUser: ', this.users.indexOf(user));
        if (this.users.indexOf(user) === -1) {
            this.users.push(user);
        }
    };
    ContextualComm.prototype.addMessage = function (message) {
        console.log('[Models - ContextualComm] - addMessage: ', this.messages, message);
        this.messages.push(message);
    };
    ContextualComm.prototype.removeContexts = function (urls) {
        var _this = this;
        urls.forEach(function (url) { return _this.removeContext(url); });
    };
    ContextualComm.prototype.removeContext = function (url) {
        this.contexts.splice(this.contexts.findIndex(function (current) { return current.url === url; }), 1);
    };
    return ContextualComm;
}());

var ContextualCommTrigger = /** @class */ (function () {
    function ContextualCommTrigger(value) {
        Object.assign(this, value);
    }
    ;
    return ContextualCommTrigger;
}());

//# sourceMappingURL=models.js.map

/***/ }),

/***/ "../../../../../src/app/models/rethink/HypertyResource.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HypertyResourceType; });
/* unused harmony export direction */
var HypertyResourceType;
(function (HypertyResourceType) {
    HypertyResourceType[HypertyResourceType["Chat"] = 'chat'] = "Chat";
    HypertyResourceType[HypertyResourceType["Audio"] = 'audio'] = "Audio";
    HypertyResourceType[HypertyResourceType["Video"] = 'video'] = "Video";
    HypertyResourceType[HypertyResourceType["AV"] = 'av'] = "AV";
    HypertyResourceType[HypertyResourceType["Screen"] = 'screen'] = "Screen";
    HypertyResourceType[HypertyResourceType["File"] = 'file'] = "File";
    HypertyResourceType[HypertyResourceType["MIDI"] = 'midi'] = "MIDI";
    HypertyResourceType[HypertyResourceType["ActivityContext"] = 'activity_context'] = "ActivityContext";
    HypertyResourceType[HypertyResourceType["AvailabilityContext"] = 'availability_context'] = "AvailabilityContext";
    HypertyResourceType[HypertyResourceType["LocationContext"] = 'location_context'] = "LocationContext";
    HypertyResourceType[HypertyResourceType["HeartRateContext"] = 'heart_rate_context'] = "HeartRateContext";
    HypertyResourceType[HypertyResourceType["UserStepsContext"] = 'user_steps_context'] = "UserStepsContext";
    HypertyResourceType[HypertyResourceType["BatteryContext"] = 'battery_context'] = "BatteryContext";
    HypertyResourceType[HypertyResourceType["SleepContext"] = 'sleep_context'] = "SleepContext";
    HypertyResourceType[HypertyResourceType["LightContext"] = 'light_context'] = "LightContext";
    HypertyResourceType[HypertyResourceType["HumidityContext"] = 'humidity_context'] = "HumidityContext";
    HypertyResourceType[HypertyResourceType["Power"] = 'power'] = "Power";
    HypertyResourceType[HypertyResourceType["UserActivityContext"] = 'user_activity_context'] = "UserActivityContext";
    HypertyResourceType[HypertyResourceType["UserCommunicationContext"] = 'user_communication_context'] = "UserCommunicationContext";
})(HypertyResourceType || (HypertyResourceType = {}));
var direction;
(function (direction) {
    direction[direction["IN"] = 'in'] = "IN";
    direction[direction["OUT"] = 'out'] = "OUT";
    direction[direction["IN_OUT"] = 'inout'] = "IN_OUT";
})(direction || (direction = {}));
//# sourceMappingURL=HypertyResource.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/pipes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeElapsedPipe__ = __webpack_require__("../../../../../src/app/pipes/timeElapsedPipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__timeElapsedPipe__["a" /* TimeElapsedPipe */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__timeElapsedPipe__["a" /* TimeElapsedPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

;
//# sourceMappingURL=pipes.js.map

/***/ }),

/***/ "../../../../../src/app/pipes/timeElapsedPipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeElapsedPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_duration_format__ = __webpack_require__("../../../../moment-duration-format/lib/moment-duration-format.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_duration_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment_duration_format__);
/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimeElapsedPipe = /** @class */ (function () {
    function TimeElapsedPipe(cdRef, ngZone) {
        this.cdRef = cdRef;
        this.ngZone = ngZone;
    }
    TimeElapsedPipe.prototype.transform = function (value, formatStyle) {
        this.format = formatStyle || 'h:mm:ss';
        this.lastValue = value;
        this.createTimer();
        return this.lastText;
    };
    TimeElapsedPipe.prototype.ngOnDestroy = function () {
        this.removeTimer();
    };
    TimeElapsedPipe.prototype.createTimer = function () {
        var _this = this;
        if (this.currentTimer) {
            return;
        }
        var begin = __WEBPACK_IMPORTED_MODULE_1_moment__(this.lastValue);
        var timeToUpdate = 1000;
        this.currentTimer = this.ngZone.runOutsideAngular(function () {
            if (typeof window !== 'undefined') {
                return window.setTimeout(function () {
                    var now = __WEBPACK_IMPORTED_MODULE_1_moment__();
                    var diff = now.diff(begin);
                    _this.lastText = __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](diff).format(_this.format, { trim: false });
                    _this.currentTimer = null;
                    _this.ngZone.run(function () { return _this.cdRef.markForCheck(); });
                }, timeToUpdate);
            }
        });
    };
    TimeElapsedPipe.prototype.removeTimer = function () {
        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
            this.currentTimer = null;
        }
    };
    TimeElapsedPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'amTimeElapsed', pure: false }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _b || Object])
    ], TimeElapsedPipe);
    return TimeElapsedPipe;
    var _a, _b;
}());

//# sourceMappingURL=timeElapsedPipe.js.map

/***/ }),

/***/ "../../../../../src/app/services/activateTask.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivateTaskGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__ = __webpack_require__("../../../../../src/app/services/rethink/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Utils

// Services





var ActivateTaskGuard = /** @class */ (function () {
    function ActivateTaskGuard(router, chatService, rethinkService, contactService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.chatService = chatService;
        this.rethinkService = rethinkService;
        this.contactService = contactService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ActivateTaskGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        var path = state.url;
                        var context = route.params['context'];
                        var task = route.params['task'];
                        var normalizedPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["f" /* normalizeFromURL */])(path, _this.contactService.sessionUser.username);
                        console.log('[Activate Task Guard] - ', context, task, state, normalizedPath);
                        var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["g" /* normalizeName */])(normalizedPath);
                        console.log('[Activate Task Guard - Activate] - normalized path: ', normalizedPath);
                        console.log('[Activate Task Guard - Activate] - normalized name: ', normalizedName);
                        _this.contextualCommDataService.getContextById(normalizedName.id).subscribe(function (context) {
                            _this.activateContext(context);
                            resolve(true);
                        }, function (reason) {
                            console.log('[Activate Task Guard - Activate] - Can not activate - reason: ', reason);
                            _this.goHome();
                            resolve(false);
                        });
                    }
                }
            });
        });
    };
    ActivateTaskGuard.prototype.goHome = function () {
        console.log('[Activate Task Guard - Activate] - Can not activate - Home ');
        this.router.navigate(['/']);
    };
    ActivateTaskGuard.prototype.activateContext = function (context) {
        console.log('[Activate Task Guard - Activate] - Can Activate Route - ', context.url);
        this.chatService.activeDataObjectURL = context.url;
        this.contextualCommService.setActiveContext = context.url;
    };
    ActivateTaskGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__["a" /* ChatService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__["a" /* RethinkService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__contact_service__["a" /* ContactService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _f || Object])
    ], ActivateTaskGuard);
    return ActivateTaskGuard;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=activateTask.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/activateUser.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivateUserGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__ = __webpack_require__("../../../../../src/app/services/rethink/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Utils

// Services





var ActivateUserGuard = /** @class */ (function () {
    function ActivateUserGuard(router, chatService, contactService, rethinkService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.chatService = chatService;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ActivateUserGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rethinkService.status.subscribe({
                next: function (value) {
                    if (value) {
                        var path = state.url;
                        var context = route.params['context'];
                        var user_1 = route.params['user'];
                        var normalizedPath_1 = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["f" /* normalizeFromURL */])(path, _this.contactService.sessionUser.username);
                        console.log('[Activate User Guard] - ', context, user_1, state, normalizedPath_1);
                        var normalizedName_1 = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["g" /* normalizeName */])(normalizedPath_1);
                        console.log('[Activate User Guard - Activate] - normalized path: ', normalizedPath_1);
                        console.log('[Activate User Guard - Activate] - normalized name: ', normalizedName_1);
                        _this.contextualCommDataService.getContextById(normalizedName_1.id).subscribe(function (currentContext) {
                            _this.activateContext(currentContext);
                            resolve(true);
                        }, function (reason) {
                            // Get the parent
                            _this.contextualCommDataService.getContextById(normalizedName_1.parent).subscribe(function (parentContext) {
                                console.log('[Activate User Guard - Activate] - parent context and user found: ', normalizedPath_1);
                                console.log('[Activate User Guard - Activate] - parent context and user found: ', parentContext, user_1);
                                if (parentContext && user_1) {
                                    _this.activateContext(parentContext);
                                    resolve(true);
                                }
                                else {
                                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', 'Parent context not found');
                                    _this.goHome();
                                    resolve(false);
                                }
                            }, function (reason) {
                                var currentUser = _this.contactService.getByUserName(user_1);
                                if (user_1 && currentUser && currentUser.isLegacy) {
                                    reject('This kind of user do not allow private messages');
                                }
                                else {
                                    // TODO Handle this logs and the expection
                                    console.log('[Activate User Guard - Activate] - Can Not Activate Route:', reason);
                                    _this.goHome();
                                    resolve(false);
                                }
                            });
                        });
                    }
                }
            });
        });
    };
    ActivateUserGuard.prototype.goHome = function () {
        console.log('[Activate User Guard - Activate] - Can not activate - Home ');
        this.router.navigate(['/']);
    };
    ActivateUserGuard.prototype.activateContext = function (context) {
        console.log('[Activate User Guard - Activate] - Can Activate Route - ', context.url);
        this.chatService.activeDataObjectURL = context.url;
        this.contextualCommService.setActiveContext = context.url;
    };
    ActivateUserGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__rethink_chat_service__["a" /* ChatService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__contact_service__["a" /* ContactService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__rethink_rethink_service__["a" /* RethinkService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _f || Object])
    ], ActivateUserGuard);
    return ActivateUserGuard;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=activateUser.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/authGuard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(rethinkService, router) {
        this.rethinkService = rethinkService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rethinkService.status.subscribe({
                next: function (value) { if (value) {
                    console.log('CAN ACTIVATE:', value);
                    resolve(value);
                } }
            });
        });
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__["a" /* RethinkService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _b || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());

//# sourceMappingURL=authGuard.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/breadcrumb.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_bufferCount__ = __webpack_require__("../../../../rxjs/add/operator/bufferCount.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_bufferCount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_bufferCount__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BreadcrumbService = /** @class */ (function () {
    function BreadcrumbService(router) {
        // this.paths.take(2)
        var _this = this;
        this.router = router;
        this.paths = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.breadcrumb = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.paths.subscribe(this.breadcrumb);
        console.log('[Breadcrumb Service] - router events:', this.router);
        // Subscribe to route params
        this._urls = new Array();
        this.router.events.subscribe(function (navigation) {
            console.log('[Breadcrumb Service] - router events:', navigation);
            _this._urls.length = 0; // Fastest way to clear out array
            if (navigation instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                _this.generateBreadcrumbTrail(navigation.urlAfterRedirects ? navigation.urlAfterRedirects : navigation.url);
                _this.paths.next(_this._urls);
            }
        });
    }
    BreadcrumbService.prototype.generateBreadcrumbTrail = function (url) {
        // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
        this._urls.unshift(decodeURIComponent(url));
        if (url.lastIndexOf('/') > 0) {
            // Find last '/' and add everything before it as a parent route
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
        }
    };
    BreadcrumbService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object])
    ], BreadcrumbService);
    return BreadcrumbService;
    var _a;
}());

//# sourceMappingURL=breadcrumb.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/contact.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__ = __webpack_require__("../../../../rxjs/add/operator/scan.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_publishReplay__ = __webpack_require__("../../../../rxjs/add/operator/publishReplay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_publishReplay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_publishReplay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__storage_service__ = __webpack_require__("../../../../../src/app/services/storage.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
// Core






// utils

// Interfaces

// Services

var ContactService = /** @class */ (function () {
    function ContactService(localStorage) {
        var _this = this;
        this.localStorage = localStorage;
        this._userList = new Map();
        // action streams
        this._create = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // `updates` receives _operations_ to be applied to our `users`
        // it's a way we can perform changes on *all* users (that are currently
        // stored in `users`)
        this._updates = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._newUser = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        var initialUsers = [];
        if (this.localStorage.hasObject('me')) {
            var me = this.localStorage.getObject('me');
            this._sessionUser = new __WEBPACK_IMPORTED_MODULE_7__models_models__["d" /* User */](me);
        }
        if (this.localStorage.hasObject('contacts')) {
            var mapObj = this.localStorage.getObject('contacts');
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentUser = new __WEBPACK_IMPORTED_MODULE_7__models_models__["d" /* User */](mapObj[k]);
                    this._userList.set(k, currentUser);
                    if (currentUser.userURL !== this._sessionUser.userURL) {
                        initialUsers.push(currentUser);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this._users = this._updates.scan(function (users, operation) {
            return operation(users);
        }, initialUsers)
            .startWith(initialUsers)
            .publishReplay(1)
            .refCount();
        this._create.map(function (user) {
            console.log('[Contact Service] - create user:', user);
            if (!_this._userList.has(user.userURL)) {
                _this._userList.set(user.userURL, user);
                _this.localStorage.setObject('contacts', Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["j" /* strMapToObj */])(_this._userList));
            }
            else {
                user = _this._userList.get(user.userURL);
            }
            return function (users) {
                if (users.indexOf(user) !== -1) {
                    return users;
                }
                else {
                    var id = users.indexOf(user);
                    users[id] = user;
                }
                return users.concat(user);
            };
        }).subscribe(this._updates);
        this._newUser.subscribe(this._create);
        this._users.subscribe(function (users) {
            console.log('LIST USERS:', users);
        });
        var e_1, _c;
    }
    Object.defineProperty(ContactService.prototype, "sessionUser", {
        get: function () {
            return this._sessionUser;
        },
        set: function (user) {
            this._sessionUser = user;
            this.localStorage.setObject('me', user);
        },
        enumerable: true,
        configurable: true
    });
    ContactService.prototype.addUser = function (user) {
        console.log('[Contact Service - AddUser] - ', user);
        this._newUser.next(user);
    };
    ContactService.prototype.updateUser = function (user) {
        this._updates.next(user);
    };
    ContactService.prototype.removeUser = function () {
    };
    ContactService.prototype.getUsers = function () {
        var _this = this;
        return this._users.map(function (users) { return users.filter(function (user) { return user.username !== _this.sessionUser.username; }); });
    };
    ContactService.prototype.getUserList = function () {
        var all = [];
        try {
            for (var _a = __values(this._userList.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var user = _b.value;
                all.push(user);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(all);
        var e_2, _c;
    };
    ContactService.prototype.getUser = function (userURL) {
        console.log('[Contact Service - get user: ', this._userList, userURL);
        return this._userList.get(userURL);
    };
    ContactService.prototype.getByUserName = function (username) {
        console.log('[Contact Service - get user: ', this._userList, username);
        var user;
        this._userList.forEach(function (value) {
            if (value.username === username) {
                user = value;
            }
        });
        return user;
    };
    ContactService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__storage_service__["a" /* LocalStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__storage_service__["a" /* LocalStorage */]) === "function" && _a || Object])
    ], ContactService);
    return ContactService;
    var _a;
}());

//# sourceMappingURL=contact.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/contextualComm.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__storage_service__ = __webpack_require__("../../../../../src/app/services/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_rethink_HypertyResource__ = __webpack_require__("../../../../../src/app/models/rethink/HypertyResource.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};






// utils

// Services


// Interfaces


var ContextualCommService = /** @class */ (function () {
    function ContextualCommService(localStorage, contactService) {
        var _this = this;
        this.localStorage = localStorage;
        this.contactService = contactService;
        this.cxtList = new Map();
        this._contextualCommUpdates = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._newContextualComm = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._currentContext = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.contextualCommEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._contextualCommList = this._contextualCommUpdates
            .scan(function (contextualCommList, operation) {
            var context;
            console.log('[Context Service - contextualCommUpdates] - scan', operation, _this.currentActiveContext);
            if (operation.type === 'add') {
                context = operation.context;
            }
            if (operation.type === 'remove') {
                context = operation.context;
                var parentContextURL = context.parent;
                var parentContext = _this._searchByURL(parentContextURL);
                // Remove reference from it parent
                if (parentContext) {
                    parentContext.removeContext(context.url);
                }
                else {
                    // remove all childs of the main content;
                    console.log('Contexts:', context.contexts);
                    var listOfChilds = context.contexts.map(function (child) { return child.url; });
                    console.log('Contexts:', listOfChilds);
                    context.removeContexts(listOfChilds);
                }
                // Remove reference it self;
                var index = contextualCommList.findIndex(function (current) { return current.url === context.url; });
                var result = contextualCommList.splice(index, 1);
                // Update the references;
                _this.cxtList.delete(context.url);
                _this.updateStorage();
                return contextualCommList;
            }
            if (_this.currentActiveContext && _this.currentActiveContext.url === context.url) {
                context.messages = context.messages.map(function (message) {
                    message.isRead = true;
                    message.user.unread = 0;
                    return message;
                });
                _this._currentContext.next(context);
            }
            else {
                var count_1 = 0;
                context.messages.forEach(function (message) {
                    var currentUser;
                    if (message.user.userURL !== _this.contactService.sessionUser.userURL) {
                        currentUser = _this.contactService.getUser(message.user.userURL);
                        if (message.isRead === false) {
                            count_1++;
                        }
                        currentUser.unread = count_1;
                    }
                });
            }
            _this.updateContexts(context.url, context);
            if (contextualCommList.indexOf(context) === -1) {
                return contextualCommList.concat(context);
            }
            else {
                return contextualCommList;
            }
        }, [])
            .startWith([])
            .publishReplay(1)
            .refCount();
        this._newContextualComm.map(function (context) {
            context.users = context.users.map(function (user) {
                return _this.contactService.getUser(user.userURL);
            }).filter(function (user) {
                return user.userURL !== _this.contactService.sessionUser.userURL;
            });
            context.messages = context.messages.map(function (message) {
                var currentMessage = new __WEBPACK_IMPORTED_MODULE_9__models_models__["c" /* Message */](message);
                currentMessage.user = _this.contactService.getUser(currentMessage.user.userURL);
                return currentMessage;
            });
            console.log('[Context Service - contextualCommUpdates] - map', context.url, context);
            return { type: 'add', context: context };
        }).subscribe(this._contextualCommUpdates);
        // TODO: this should be removed, the hot something
        this._contextualCommList.subscribe(function (result) { return console.log('LIST: ', result); });
        if (this.localStorage.hasObject('contexts')) {
            var mapObj = this.localStorage.getObject('contexts');
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentContext = new __WEBPACK_IMPORTED_MODULE_9__models_models__["a" /* ContextualComm */](mapObj[k]);
                    this.cxtList.set(k, currentContext);
                    this._newContextualComm.next(currentContext);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _c;
    }
    Object.defineProperty(ContextualCommService.prototype, "getActiveContext", {
        get: function () {
            return this.currentActiveContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextualCommService.prototype, "setActiveContext", {
        set: function (value) {
            console.log('[Context Service] - setActiveContext: ', value, this.cxtList.get(value));
            this.currentActiveContext = this.cxtList.get(value);
            this._currentContext.next(this.currentActiveContext);
        },
        enumerable: true,
        configurable: true
    });
    ContextualCommService.prototype._filterByName = function (idName) {
        var found;
        this.cxtList.forEach(function (context) {
            console.log('[Contextual Comm Service] - ', context, idName);
            if (!found) {
                found = context.id === idName ? context : null;
            }
        });
        return found;
    };
    ContextualCommService.prototype._searchByURL = function (url) {
        var found;
        this.cxtList.forEach(function (context) {
            console.log('[Contextual Comm Service] - search by URL', context, url);
            if (!found) {
                found = context.url === url ? context : null;
            }
        });
        return found;
    };
    ContextualCommService.prototype.create = function (name, dataObject, parentNameId, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parentContextualComm = _this._filterByName(parentNameId);
            var newContextURL = dataObject.url;
            var context;
            console.log('[Contextual Comm Service] -  create: ', name, parentContextualComm, parentNameId, newContextURL);
            if (parentContextualComm) {
                var hasChild = parentContextualComm.contexts.find(function (contextualComm) {
                    return contextualComm && contextualComm.url === newContextURL;
                });
                if (!hasChild) {
                    // Create new ContextualComm
                    var current = _this.createContextualComm(name, dataObject, parentContextualComm, contextInfo);
                    // Add the current ContextualComm to his parent;
                    parentContextualComm.contexts.push(current);
                    context = current;
                    _this.updateContexts(parentContextualComm.url, parentContextualComm);
                }
            }
            else {
                if (!_this.cxtList.has(newContextURL)) {
                    // Create new ContextualComm
                    var current = _this.createContextualComm(name, dataObject, undefined, contextInfo);
                    context = current;
                    _this.updateContexts(context.url, context);
                }
            }
            _this._newContextualComm.next(context);
            resolve(context);
        });
    };
    ContextualCommService.prototype.removeContextualComm = function (context) {
        this._contextualCommUpdates.next({ type: 'remove', context: context });
    };
    ContextualCommService.prototype.createContextualComm = function (name, dataObject, parent, contextInfo) {
        var _this = this;
        var data = JSON.parse(JSON.stringify(dataObject.data));
        var metadata = JSON.parse(JSON.stringify(dataObject.metadata));
        var isReporter = contextInfo && contextInfo.reporter ? contextInfo.reporter : false;
        var icon = contextInfo && contextInfo.icon ? contextInfo.icon : '';
        console.log('[Contextual Comm Service] -  createContextualComm: ', name, data, metadata, parent, dataObject);
        var contextualComm = new __WEBPACK_IMPORTED_MODULE_9__models_models__["a" /* ContextualComm */]({
            icon: icon,
            name: name,
            url: metadata.url,
            id: metadata.name,
            parent: parent ? parent.url : '',
            description: metadata.description || '',
            reporter: isReporter
        });
        var participants = data.participants || {};
        Object.keys(participants).forEach(function (item) {
            console.log('MAP:', item, participants[item]);
            var currentUser = _this.contactService.getUser(item);
            if (!currentUser) {
                currentUser = new __WEBPACK_IMPORTED_MODULE_9__models_models__["d" /* User */](participants[item].identity.userProfile);
                _this.contactService.addUser(currentUser);
                console.log('[Context Service - update users] - create new user: ', currentUser);
            }
            contextualComm.addUser(currentUser);
        });
        var communication = (metadata);
        communication.resources = [__WEBPACK_IMPORTED_MODULE_10__models_rethink_HypertyResource__["a" /* HypertyResourceType */].Chat];
        contextualComm.communication = communication;
        console.log('[Context Service - createContextualComm] - New ContextualComm:', contextualComm);
        this.contextualCommEvent.emit({
            type: 'add',
            contextualComm: JSON.parse(JSON.stringify(contextualComm))
        });
        return contextualComm;
    };
    ContextualCommService.prototype.updateContexts = function (url, context) {
        this.cxtList.set(url, context);
        this.updateStorage();
    };
    ContextualCommService.prototype.updateStorage = function () {
        this.localStorage.setObject('contexts', Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["j" /* strMapToObj */])(this.cxtList));
    };
    ContextualCommService.prototype.updateContextMessages = function (message, url) {
        console.log('[Context Service - Update Context Message:', message, url);
        console.log('[Context Service - Active Context:', this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addMessage(message);
        this._newContextualComm.next(context);
        console.log('[Context Service - update messages]', context.name, context.url, context);
    };
    ContextualCommService.prototype.updateContextUsers = function (user, url) {
        console.log('[Context Service - Update Context User:', user, url);
        console.log('[Context Service - Active Context:', this.cxtList, this.cxtList.get(url));
        var context = this.cxtList.get(url);
        context.addUser(user);
        // Update the contact list
        this.contactService.addUser(user);
        this._newContextualComm.next(context);
        console.log('[Context Service - Update contacts]', context.name, context.url, context);
    };
    ContextualCommService.prototype.getContextByName = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext;
            _this.cxtList.forEach(function (context) {
                if (name.includes('@')) {
                    var users = name.split('-');
                    var user1 = users[0];
                    var user2 = users[1];
                    var variation1 = user1 + '-' + user2;
                    var variation2 = user2 + '-' + user1;
                    if (context.name === variation1) {
                        name = variation1;
                    }
                    else if (context.name === variation2) {
                        name = variation2;
                    }
                }
                console.log('[Context Service] - getting Context By Name: ', context, context.name, name);
                if (context.name === name) {
                    // TODO: Solve the problem of active context
                    currentContext = context;
                    console.log('[context service] - found', name, currentContext);
                    _this._newContextualComm.next(context);
                    return resolve(currentContext);
                }
            });
            reject('No context found');
        });
    };
    ContextualCommService.prototype.getContextByResource = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var currentContext = _this.cxtList.get(resource);
            if (currentContext) {
                resolve(currentContext);
            }
            else {
                reject('No context found');
            }
        });
    };
    ContextualCommService.prototype.getContextUsers = function (context) {
        console.log('this.contactService.getUsers(): ');
        this.contactService.getUsers().subscribe({
            next: function (list) { return console.log('List of contacts:', list); }
        });
        return this.contactService.getUsers();
    };
    ContextualCommService.prototype.currentContext = function () {
        return this._currentContext;
    };
    ContextualCommService.prototype.getContextualComms = function () {
        return this._contextualCommList;
    };
    ContextualCommService.prototype.getContextualCommList = function () {
        var all = [];
        try {
            for (var _a = __values(this.cxtList.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var cxt = _b.value;
                all.push(cxt);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(all);
        var e_2, _c;
    };
    ContextualCommService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__storage_service__["a" /* LocalStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__storage_service__["a" /* LocalStorage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__contact_service__["a" /* ContactService */]) === "function" && _b || Object])
    ], ContextualCommService);
    return ContextualCommService;
    var _a, _b;
}());

//# sourceMappingURL=contextualComm.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/contextualCommData.resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommDataResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__triggerAction_service__ = __webpack_require__("../../../../../src/app/services/triggerAction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Utils

// Service




var ContextualCommDataResolver = /** @class */ (function () {
    function ContextualCommDataResolver(router, contactService, triggerActionService, contextualCommService, contextualCommDataService) {
        this.router = router;
        this.contactService = contactService;
        this.triggerActionService = triggerActionService;
        this.contextualCommService = contextualCommService;
        this.contextualCommDataService = contextualCommDataService;
    }
    ContextualCommDataResolver.prototype.resolve = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var context = route.params['context'];
            var task = route.params['task'];
            var user = route.params['user'];
            var path = state.url;
            var name = '';
            var title = '';
            if (context) {
                name = context;
                title = context;
            }
            ;
            if (task) {
                name = task;
                title = task;
            }
            ;
            if (user) {
                name = user;
                title = user;
            }
            ;
            name = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["f" /* normalizeFromURL */])(path, _this.contactService.sessionUser.username);
            var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["g" /* normalizeName */])(name);
            console.log('[ContextualCommData - Resolve] - normalized name:', name, task, normalizedName, path, user);
            if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["e" /* isAnUser */])(normalizedName.name)) {
                _this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
                    next: function (contextualComm) { return resolve(contextualComm); },
                    error: function (reason) {
                        console.log('[ContextualCommData - Resolve] - user:', reason);
                        reject(reason);
                        _this.goHome();
                    }
                });
            }
            else {
                _this.contextualCommDataService.getContextById(normalizedName.id).subscribe({
                    next: function (contextualComm) { return resolve(contextualComm); },
                    error: function (reason) {
                        console.log('[ContextualCommData - Resolve] - task or context:', reason);
                        reject(reason);
                        _this.goHome();
                    }
                });
            }
        });
    };
    ContextualCommDataResolver.prototype.goHome = function () {
        console.log('[ContextualCommData - Resolve] - Can not resolve - Home ');
        this.router.navigate(['/']);
    };
    ContextualCommDataResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__contact_service__["a" /* ContactService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__triggerAction_service__["a" /* TriggerActionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__triggerAction_service__["a" /* TriggerActionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__contextualComm_service__["a" /* ContextualCommService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _e || Object])
    ], ContextualCommDataResolver);
    return ContextualCommDataResolver;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=contextualCommData.resolver.js.map

/***/ }),

/***/ "../../../../../src/app/services/contextualCommData.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise__ = __webpack_require__("../../../../rxjs/add/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rethink_chat_service__ = __webpack_require__("../../../../../src/app/services/rethink/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// Services



var ContextualCommDataService = /** @class */ (function () {
    function ContextualCommDataService(location, router, chatService, contactService, contextualCommService) {
        this.router = router;
        this.chatService = chatService;
        this.contactService = contactService;
        this.contextualCommService = contextualCommService;
        this.location = location;
    }
    ContextualCommDataService.prototype.createContext = function (name, parentNameId, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.contextualCommService.getContextByName(name)
                .then(function (context) {
                console.info('[ContextualCommData Service] - context found: ', context);
                resolve(context);
            }).catch(function (reason) {
                var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["g" /* normalizeName */])(name, parentNameId);
                console.info('[ContextualCommData Service] - no contexts was found: ', reason);
                console.info('[ContextualCommData Service] - creating new context: ', name, normalizedName);
                _this.chatService.create(normalizedName.id, [], [], contextInfo).then(function (controller) {
                    console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
                    console.info('[ContextualCommData Service] - creating new contexts: ', controller, normalizedName.parent);
                    return _this.contextualCommService.create(name, controller.dataObject, normalizedName.parent, contextInfo);
                }).then(function (context) {
                    console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
                    resolve(context);
                }).catch(function (error) {
                    console.warn('Context not found', error);
                    // console.error('Reason:', reason);
                });
            });
        });
    };
    ContextualCommDataService.prototype.joinContext = function (name, id, dataObject, parentNameId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.info('[ContextualCommData Service] - join: ', name, id);
            _this.getContextById(id).toPromise().then(function (context) {
                console.info('[ContextualCommData Service] - communication objects was created successfully: ', dataObject);
                console.info('[ContextualCommData Service] - creating new contexts: ', dataObject, parentNameId);
                resolve(context);
            }).catch(function (reason) {
                // console.error('Reason:', reason);
                return _this.contextualCommService.create(name, dataObject, parentNameId);
            }).then(function (context) {
                resolve(context);
            });
        });
    };
    ContextualCommDataService.prototype.createAtomicContext = function (username, name, id, parentNameId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var activeContext = _this.contextualCommService.getActiveContext;
            console.log('[ContextualCommData Service] - normalizedName:', name, id, parentNameId);
            _this.getContextById(id).subscribe(function (context) {
                resolve(context);
            }, function (error) {
                _this.chatService.create(id, [username], []).then(function (controller) {
                    console.info('[ContextualCommData Service] - communication objects was created successfully: ', controller);
                    console.info('[ContextualCommData Service] - creating new contexts: ', controller, activeContext);
                    return _this.contextualCommService.create(name, controller.dataObject, parentNameId);
                }).then(function (context) {
                    console.info('[ContextualCommData Service] -  ContextualComm created: ', context);
                    resolve(context);
                }).catch(function (reason) {
                    console.error('Reason:', reason);
                    reject(reason);
                });
            });
        });
    };
    ContextualCommDataService.prototype.removeContext = function (context) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(new Promise(function (resolve, reject) {
            var chatToClose = context.contexts.map(function (sub) { return _this.chatService.close(sub.url); });
            var contextToRemove = context.contexts.map(function (sub) { return _this.contextualCommService.removeContextualComm(sub); });
            // add the main context
            chatToClose.push(_this.chatService.close(context.url));
            contextToRemove.push(_this.contextualCommService.removeContextualComm(context));
            console.log('Childs to remove:', chatToClose, contextToRemove);
            return Promise.all([chatToClose])
                .then(function (result) { return Promise.all(contextToRemove); })
                .then(function () { resolve(true); _this._redirect(context); })
                .catch(function (error) { return reject(error); });
        }));
    };
    ContextualCommDataService.prototype._redirect = function (context) {
        var basePath = this.router.url;
        var contextPathObj = Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["g" /* normalizeName */])(context.id);
        var basePathObj = Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["g" /* normalizeName */])(basePath);
        if (contextPathObj.id === basePathObj.id) {
            console.log('Navigate to the parent object path: ', contextPathObj);
            this.router.navigate([Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["h" /* objectToPath */])(contextPathObj.parent)]);
        }
    };
    /**
     *
     *
     * @returns {Observable<ContextualComm[]>}
     *
     * @memberof ContextualCommDataService
     */
    ContextualCommDataService.prototype.getContexts = function () {
        return this.contextualCommService.getContextualComms()
            .map(function (contexts) { return contexts.filter(function (context) { return context.parent === ''; }); });
    };
    ContextualCommDataService.prototype.activeContext = function () {
        var contextualComm = this.contextualCommService.getActiveContext;
        if (contextualComm) {
            return contextualComm;
        }
        else {
            throw new Error('No Contextual Comm Active');
        }
    };
    ContextualCommDataService.prototype.getContext = function (name) {
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            var found = contexts.filter(function (context) { return Object(__WEBPACK_IMPORTED_MODULE_5__utils_utils__["b" /* filterContextsByName */])(name, context); })[0];
            console.log('[ContextualCommData Service] - found: ', found);
            if (!found) {
                throw new Error('Context not found');
            }
            return found;
        });
    };
    ContextualCommDataService.prototype.getContextTask = function (id) {
        return this.contextualCommService.getContextualComms()
            .map(function (contexts) {
            return contexts.filter(function (context) { return context.id === id; })[0].contexts.filter(function (context) { return !context.id.includes('@'); });
        });
    };
    ContextualCommDataService.prototype.getContextById = function (id) {
        var _this = this;
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            var found = contexts.filter(function (context) { return _this.filterContextsById(id, context); })[0];
            if (!found) {
                throw new Error('Context not found');
            }
            return found;
        });
    };
    ContextualCommDataService.prototype.getContextByResource = function (resource) {
        return this.contextualCommService.getContextualCommList()
            .map(function (contexts) {
            return contexts.filter(function (context) {
                return context.url === resource;
            })[0];
        });
    };
    ContextualCommDataService.prototype.currentContext = function () {
        return this.contextualCommService.currentContext();
    };
    ContextualCommDataService.prototype.filterContextsById = function (id, context) {
        if (id.includes('@')) {
            var base = id.substr(0, id.lastIndexOf('/') + 1);
            var user = id.substr(id.lastIndexOf('/') + 1);
            var users = user.split('-');
            var variation1 = base + users[0] + '-' + users[1];
            var variation2 = base + users[1] + '-' + users[0];
            if (context.id === variation1) {
                id = variation1;
            }
            else if (context.id === variation2) {
                id = variation2;
            }
        }
        console.log('[ContextualCommData Service] - getting Context By Id: ', context.id, id, context.id === id);
        return context.id === id;
    };
    ContextualCommDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__rethink_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__rethink_chat_service__["a" /* ChatService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__contact_service__["a" /* ContactService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__contextualComm_service__["a" /* ContextualCommService */]) === "function" && _e || Object])
    ], ContextualCommDataService);
    return ContextualCommDataService;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=contextualCommData.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/contextualCommTrigger.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommTriggerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_service__ = __webpack_require__("../../../../../src/app/services/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_rethink_HypertyResource__ = __webpack_require__("../../../../../src/app/models/rethink/HypertyResource.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};


// utils

// Services

// Interfaces


var ContextualCommTriggerService = /** @class */ (function () {
    // Temporary data for initial contexts;
    // private work: ContextualCommTrigger = {
    //   contextName: 'Work',
    //   contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    //   contextScheme: '',
    //   values: [],
    //   trigger: [],
    //   icon: 'briefcase'
    // };
    function ContextualCommTriggerService(localStorage) {
        this.localStorage = localStorage;
        this.cxtTrigger = new Map();
        this._contextualCommTriggerUpdate = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._contextualCommTrigger = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._contextualCommTriggerList = this._contextualCommTriggerUpdate
            .scan(function (triggers, trigger) {
            console.log('[ContextualCommTriggerService - scan] - ', triggers, trigger);
            if (triggers.indexOf(trigger) === -1) {
                return triggers.concat(trigger);
            }
            else {
                return triggers;
            }
        }, [])
            .publishReplay(1)
            .refCount();
        this._contextualCommTrigger.subscribe(this._contextualCommTriggerUpdate);
        this._contextualCommTriggerList.subscribe(function (a) {
            console.log('[ContextualCommTriggerService - list] - ', a);
        });
        if (this.localStorage.hasObject('context-triggers')) {
            var mapObj = this.localStorage.getObject('context-triggers');
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentTrigger = new __WEBPACK_IMPORTED_MODULE_5__models_models__["b" /* ContextualCommTrigger */](mapObj[k]);
                    console.log('[ContextualCommTriggerService - storage]', mapObj[k], currentTrigger);
                    this.cxtTrigger.set(k, currentTrigger);
                    this._contextualCommTrigger.next(currentTrigger);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            // this._contextualCommTrigger.next(this.work);
            // this._contextualCommTrigger.next(this.fitness);
            // this._contextualCommTrigger.next(this.school);
            // this.cxtTrigger.set(this.work.contextName, this.work);
            // this.cxtTrigger.set(this.fitness.contextName, this.fitness);
            // this.cxtTrigger.set(this.school.contextName, this.school);
        }
        var e_1, _c;
    }
    ContextualCommTriggerService.prototype.createContextTrigger = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[ContextualCommTriggerService - Get Localstorage] ', name);
            var contextualCommTriggerName = 'trigger-' + name;
            var contextTrigger;
            if (!_this.cxtTrigger.has(contextualCommTriggerName)) {
                console.info('[Create a new ContextualTrigger]', name);
                var context = {
                    contextName: name,
                    contextScheme: 'context',
                    contextResource: [__WEBPACK_IMPORTED_MODULE_4__models_rethink_HypertyResource__["a" /* HypertyResourceType */].Video, __WEBPACK_IMPORTED_MODULE_4__models_rethink_HypertyResource__["a" /* HypertyResourceType */].Audio, __WEBPACK_IMPORTED_MODULE_4__models_rethink_HypertyResource__["a" /* HypertyResourceType */].Chat],
                    values: [],
                    trigger: []
                };
                contextTrigger = new __WEBPACK_IMPORTED_MODULE_5__models_models__["b" /* ContextualCommTrigger */](context);
                /*let contextValue:ContextValues = {
                  name: 'location',
                  unit: 'rad',
                  value: 0,
                  sum: 0
                }*/
            }
            else {
                console.info('[Get the exist ContextualTrigger]', name);
                contextTrigger = _this.cxtTrigger.get(contextualCommTriggerName);
            }
            _this.activeContextTrigger = contextTrigger;
            _this.updateContextTrigger(contextualCommTriggerName, contextTrigger);
            _this._contextualCommTrigger.next(contextTrigger);
            console.info('[ContextualCommTriggerService - create]', contextTrigger);
            resolve(contextTrigger);
        });
    };
    ContextualCommTriggerService.prototype.updateContextTrigger = function (name, contextTrigger) {
        var contextTriggerName;
        if (name.includes('trigger')) {
            contextTriggerName = name;
        }
        else {
            contextTriggerName = 'trigger-' + name;
        }
        this.cxtTrigger.set(contextTriggerName, contextTrigger);
        this.localStorage.setObject('context-triggers', Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["j" /* strMapToObj */])(this.cxtTrigger));
        console.info('[ContextualCommTriggerService - updateContextTrigger]', name, contextTrigger);
        this._contextualCommTrigger.next(contextTrigger);
    };
    ContextualCommTriggerService.prototype.getContextualCommTriggers = function () {
        return this._contextualCommTriggerList;
    };
    ContextualCommTriggerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* LocalStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__storage_service__["a" /* LocalStorage */]) === "function" && _a || Object])
    ], ContextualCommTriggerService);
    return ContextualCommTriggerService;
    var _a;
}());

//# sourceMappingURL=contextualCommTrigger.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rethink/chat.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Services




var ChatService = /** @class */ (function () {
    function ChatService(rethinkService, contextualCommService, contactService) {
        this.rethinkService = rethinkService;
        this.contextualCommService = contextualCommService;
        this.contactService = contactService;
        this.controllerList = new Map();
        this.onMessageEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onInvitation = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCloseEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(ChatService.prototype, "activeDataObjectURL", {
        get: function () {
            return this._activeDataObjectURL;
        },
        set: function (value) {
            console.log('[Chat Service] - setActiveController:', value, this.controllerList);
            this._activeDataObjectURL = value;
            this.chatControllerActive = this.controllerList.get(value);
            console.info('[Chat Service] - active controller: ', this.chatControllerActive);
        },
        enumerable: true,
        configurable: true
    });
    ChatService.prototype._updateControllersList = function (dataObjectURL, chatController) {
        this.prepareController(chatController);
        this.controllerList.set(dataObjectURL, chatController);
        console.log('[Chat Service - Update Controller List] - ', chatController, this.controllerList);
    };
    ChatService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.hypertyURL = 'hyperty-catalogue://catalogue.' + _this.rethinkService.domain + '/.well-known/hyperty/GroupChatManager';
            console.log('[Chat Service - getHyperty] - ', _this.chatGroupManager);
            if (!_this.chatGroupManager) {
                _this.rethinkService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.chatGroupManager = hyperty.instance;
                    _this._discovery = _this.chatGroupManager.discovery;
                    _this.hyperty = hyperty;
                    _this.prepareHyperty();
                    resolve(_this.hyperty);
                })
                    .catch(function (reason) {
                    console.error(reason);
                    reject(reason);
                });
            }
            else {
                resolve(_this.hyperty);
            }
        });
    };
    ChatService.prototype.prepareHyperty = function () {
        var _this = this;
        console.log('[Chat Service - prepareHyperty]', this.chatGroupManager);
        this.chatGroupManager.onResumeReporter(function (controllers) {
            console.log('[Chat Service - prepareHyperty] - onResume reporters: ', controllers);
            Object.keys(controllers).forEach(function (url) {
                _this.controllerList.set(url, controllers[url]);
                _this._updateControllersList(url, controllers[url]);
            });
        });
        this.chatGroupManager.onResumeObserver(function (controllers) {
            console.log('[Chat Service - prepareHyperty] - onResume observers: ', controllers);
            Object.keys(controllers).forEach(function (url) {
                _this.controllerList.set(url, controllers[url]);
                _this._updateControllersList(url, controllers[url]);
            });
        });
        this.chatGroupManager.onInvitation(function (event) {
            console.log('[Chat Service - OnInvitation] - ', event);
            _this.onInvitation.emit(event);
        });
    };
    ChatService.prototype.prepareController = function (chatController) {
        var _this = this;
        console.log('[Chat Service - prepareController]', chatController);
        chatController.onUserAdded(function (user) {
            var dataObjectURL = chatController.dataObject.url;
            console.log('[Chat Service - prepareController] - onUserAdded', chatController, user, dataObjectURL);
            var current;
            var userInfo = {};
            if (user.hasOwnProperty('data')) {
                current = _this.contactService.getUser(user.data.identity.userProfile.userURL);
                userInfo.domain = user.data.domain;
                userInfo.idp = user.data.identity.idp;
                Object.assign(userInfo, user.data.identity.userProfile);
            }
            else {
                current = _this.contactService.getUser(user.identity.userProfile.userURL);
                userInfo.domain = user.domain;
                userInfo.idp = user.identity.idp;
                Object.assign(userInfo, user.identity.userProfile);
            }
            if (!current) {
                current = new __WEBPACK_IMPORTED_MODULE_4__models_models__["d" /* User */](userInfo);
            }
            console.log('[Chat Service - prepareController] - current user:', userInfo, current);
            _this.contextualCommService.updateContextUsers(current, dataObjectURL);
        });
        chatController.onMessage(function (message) {
            console.log('[Chat Service - prepareController] - onMessage', message, _this.chatControllerActive);
            var dataObjectURL = chatController.dataObject.url;
            var user = _this.contactService.getUser(message.identity.userProfile.userURL);
            if (user) {
                var msg = {
                    type: 'message',
                    message: message.value.content,
                    user: user
                };
                var currentMessage = new __WEBPACK_IMPORTED_MODULE_4__models_models__["c" /* Message */](msg);
                _this.contextualCommService.updateContextMessages(currentMessage, dataObjectURL);
                _this.onMessageEvent.emit(currentMessage);
            }
            else {
                console.info('The message was rejected because the user ' + message.identity.userProfile.userURL + ' is unknown');
            }
        });
        chatController.onClose(function (event) {
            _this.onCloseEvent.emit(event);
        });
        // this._updateControllersList(chatController.dataObject.url, chatController);
    };
    ChatService.prototype.create = function (name, users, domains, contextInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.chatGroupManager.create(name, users, domains, contextInfo).then(function (chatController) {
                console.log('[Chat Created]', chatController);
                _this._updateControllersList(chatController.dataObject.url, chatController);
                _this.prepareHyperty();
                resolve(chatController);
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    /**
     *
     *
     * @param {object} event
     * @returns {*}
     *
     * @memberof ChatService
     */
    ChatService.prototype.join = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Chat Service - Join] - event: ', event);
            _this.chatGroupManager.join(url).then(function (chatController) {
                var dataObject = chatController.dataObject;
                _this._updateControllersList(dataObject.url, chatController);
                resolve(dataObject);
            });
        });
    };
    ChatService.prototype.invite = function (dataObjectURL, listOfEmails, listOfDomains) {
        console.log('[Invite]', listOfEmails, ' - ', listOfDomains);
        console.log('[Chat Service - invite]: ', this.controllerList, dataObjectURL, this.controllerList.get(dataObjectURL));
        var currentController = this.controllerList.get(dataObjectURL);
        return currentController.addUser(listOfEmails, listOfDomains);
    };
    ChatService.prototype.send = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Chat Service - Send Message]', _this.chatControllerActive, message);
            _this.chatControllerActive.send(message).then(function (result) {
                console.log('[Chat Service - Sended Message]', message, result, _this.chatControllerActive);
                var user = _this.contactService.getUser(result.identity.userProfile.userURL);
                console.log('[Chat Service] - user:', user, result.identity.userProfile.userURL);
                var msg = {
                    type: 'message',
                    message: result.value.content,
                    user: user
                };
                var currentMessage = new __WEBPACK_IMPORTED_MODULE_4__models_models__["c" /* Message */](msg);
                _this.contextualCommService.updateContextMessages(currentMessage, _this.chatControllerActive.dataObject.url);
                resolve(currentMessage);
            }).catch(reject);
        });
    };
    ChatService.prototype.close = function (url) {
        var _this = this;
        var found = this.controllerList.get(url);
        console.log(this.controllerList);
        return found.close().then(function (result) { return _this.controllerList.delete(url); });
    };
    ChatService.prototype.discovery = function () {
        return this._discovery;
    };
    ChatService.prototype.onUserAdded = function (callback) {
        this._onUserAdded = callback;
    };
    ChatService.prototype.onMessage = function (callback) {
        this._onMessage = callback;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], ChatService.prototype, "onInvitation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
    ], ChatService.prototype, "onCloseEvent", void 0);
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__rethink_service__["a" /* RethinkService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__contextualComm_service__["a" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contextualComm_service__["a" /* ContextualCommService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__contact_service__["a" /* ContactService */]) === "function" && _e || Object])
    ], ChatService);
    return ChatService;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=chat.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rethink/connector.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Utils

// Services




var STATUS = { INPROGRESS: 'in-progress', END: 'end' };
var ConnectorService = /** @class */ (function () {
    function ConnectorService(router, route, sanitizer, contactService, rethinkService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.contactService = contactService;
        this.rethinkService = rethinkService;
        this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/Connector';
        this.controllers = {};
        this.callInProgress = false;
        this._webrtcMode = 'offer';
        this._localStream = new __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__["ReplaySubject"]();
        this._remoteStream = new __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__["ReplaySubject"]();
        this._connectorStatus = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.onInvitation = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDisconnect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('[Connector Service] - constructor', this.router);
        this.paramsSubscription = this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* NavigationEnd */]) {
                console.log('[Connector Service] - query params changes:', event, event['action'], _this.mode, _this.callInProgress);
                if (!_this.callInProgress) {
                    _this.acceptCall();
                }
            }
        });
    }
    Object.defineProperty(ConnectorService.prototype, "connectorMode", {
        get: function () {
            return this._webrtcMode;
        },
        set: function (value) {
            this._webrtcMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorService.prototype, "getControllers", {
        get: function () {
            return this.controllers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectorService.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            console.log('[Connector Service] - set mode: ', value);
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    ConnectorService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.hypertyVideo) {
                _this.rethinkService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.hypertyVideo = hyperty.instance;
                    _this.hyperty = hyperty;
                    _this.prepareHyperty();
                    resolve(_this.hyperty);
                })
                    .catch(function (reason) {
                    console.error(reason);
                    reject(reason);
                });
            }
            else {
                resolve(_this.hyperty);
            }
        });
    };
    ConnectorService.prototype.acceptCall = function () {
        var _this = this;
        console.log('[Connector Service] - AcceptCall: ', this.controllers, this.controllers.hasOwnProperty('ansewer'));
        console.log('[Connector Service] - AcceptCall: ', this.connectorMode);
        if (this.controllers && this.controllers.hasOwnProperty('answer') && this.connectorMode === 'answer') {
            var options = { video: true, audio: true };
            Object(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["c" /* getUserMedia */])(options).then(function (mediaStream) {
                _this._localStream.next(mediaStream);
                return _this.controllers[_this.connectorMode].accept(mediaStream);
            }).then(function (accepted) {
                _this.callInProgress = true;
                _this._connectorStatus.next(STATUS.INPROGRESS);
                console.log('[Connector Service] - accept response:', _this.mode);
                if (_this.mode === 'audio') {
                    _this.controllers[_this.connectorMode].disableVideo();
                }
            }).catch(function (reason) {
                console.error(reason);
            });
        }
        else {
            // console.error('error accepting call', this.controllers, this.controllers.hasOwnProperty('ansewer'), this.connectorMode);
        }
    };
    ConnectorService.prototype.prepareHyperty = function () {
        var _this = this;
        this.hypertyVideo.onInvitation(function (controller, identity) {
            console.log('[Connector Service] - on Invitation:', controller, identity);
            var metadata = controller.dataObjectObserver.metadata;
            _this.mode = controller.dataObjectObserver.data.mode;
            _this.connectorMode = 'answer';
            _this.prepareController(controller);
            var currUser = _this.contactService.getUser(identity.userURL);
            _this.onInvitation.emit({ metadata: metadata, user: currUser, mode: _this.mode });
        });
    };
    ConnectorService.prototype.connect = function (userURL, options, name, domain) {
        var _this = this;
        this.connectorMode = 'offer';
        return Object(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["c" /* getUserMedia */])(options).then(function (mediaStream) {
            _this._localStream.next(mediaStream);
            return _this.hypertyVideo.connect(userURL, mediaStream, name, domain);
        }).then(function (controller) {
            console.log('[Connector Service] - connect:', controller);
            _this.callInProgress = true;
            _this.prepareController(controller);
            return controller;
        }).catch(function (reason) {
            console.error('reason:', reason);
        });
    };
    ConnectorService.prototype.prepareController = function (controller) {
        var _this = this;
        console.log('[Connector Service - Prepare Controller] - mode: ' + this.connectorMode + ' Controllers: ', this.controllers);
        this.controllers[this.connectorMode] = controller;
        controller.onAddStream(function (event) {
            console.log('[Connector Service - Add Stream] - Remote Stream:', event);
            _this._remoteStream.next(event.stream);
        });
        controller.onDisconnect(function (event) {
            console.log('[Connector Service - onDisconnect] - onDisconnect:', event);
            var navigationExtras = {
                queryParams: {},
                relativeTo: _this.route
            };
            _this.router.navigate([], navigationExtras);
            _this._connectorStatus.next(STATUS.END);
            _this.onDisconnect.emit({ user: event.identity, url: event.url });
        });
    };
    ConnectorService.prototype.getRemoteStream = function () {
        return this._remoteStream.map(function (stream) {
            // return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
            return stream;
        }).publishReplay(1).refCount();
    };
    ConnectorService.prototype.getLocalStream = function () {
        return this._localStream.map(function (stream) {
            // return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(stream));
            return stream;
        }).publishReplay(1).refCount();
    };
    ConnectorService.prototype.connectorStatus = function () {
        return this._connectorStatus;
    };
    ConnectorService.prototype.enableVideo = function () {
        this.controllers[this.connectorMode].disableVideo(true);
    };
    ConnectorService.prototype.disableVideo = function () {
        this.controllers[this.connectorMode].disableVideo(false);
    };
    ConnectorService.prototype.disableAudio = function () {
        this.controllers[this.connectorMode].disableAudio();
    };
    ConnectorService.prototype.mute = function () {
        this.controllers[this.connectorMode].mute();
    };
    ConnectorService.prototype.hangup = function () {
        console.log('[Connector Service - hangup]: ', this);
        this.callInProgress = false;
        this.controllers[this.connectorMode].disconnect();
        this._localStream = new __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__["ReplaySubject"]();
        this._remoteStream = new __WEBPACK_IMPORTED_MODULE_7_rxjs_ReplaySubject__["ReplaySubject"]();
        this._connectorStatus.next(STATUS.END);
        this.connectorMode = 'offer';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], ConnectorService.prototype, "onInvitation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
    ], ConnectorService.prototype, "onDisconnect", void 0);
    ConnectorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__contact_service__["a" /* ContactService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__rethink_service__["a" /* RethinkService */]) === "function" && _g || Object])
    ], ConnectorService);
    return ConnectorService;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=connector.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rethink/rethink.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RethinkService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_service__ = __webpack_require__("../../../../../src/app/services/storage.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RethinkService = /** @class */ (function () {
    function RethinkService(localstorage, contactService) {
        this.localstorage = localstorage;
        this.contactService = contactService;
        this.domain = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].domain;
        this.runtimeURL = 'https://catalogue.' + this.domain + '/.well-known/runtime/Runtime';
        this.config = { domain: this.domain, runtimeURL: this.runtimeURL, development: true };
        this.progress = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]('');
        this.status = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
    }
    RethinkService.prototype.loadRuntime = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Loading Rethink Runtime at] ', _this.config, rethink);
            rethink.default.install(_this.config).then(function (runtime) {
                console.log('[Runtime Loaded]');
                _this.runtime = runtime;
                resolve(runtime);
            }).catch(function (error) {
                console.error('[Error Loading Runtime] ', error);
            });
        });
    };
    RethinkService.prototype.getHyperty = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.runtime.requireHyperty(url, true).then(function (hyperty) {
                console.log('[Hyperty Loaded]', hyperty);
                resolve(hyperty);
            }).catch(function (reason) {
                console.error('[Hyperty Load Error]', reason);
                reject(reason);
            });
        });
    };
    RethinkService.prototype.getIdentity = function (hyperty) {
        var _this = this;
        console.log('[Get my Identity]:', hyperty);
        return new Promise(function (resolve, reject) {
            hyperty.instance.identityManager.discoverUserRegistered().then(function (user) {
                var myUser = new __WEBPACK_IMPORTED_MODULE_2__models_models__["d" /* User */](user);
                _this.contactService.sessionUser = myUser;
                _this.contactService.addUser(myUser);
                console.info('Getting the registed user', myUser);
                _this.localstorage.setObject('me', myUser);
                resolve(myUser);
            }).catch(function (reason) {
                console.info('Error getting the register user, using fake information', reason);
                resolve(reason);
            });
        });
    };
    RethinkService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__storage_service__["a" /* LocalStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__storage_service__["a" /* LocalStorage */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__contact_service__["a" /* ContactService */]) === "function" && _b || Object])
    ], RethinkService);
    return RethinkService;
    var _a, _b;
}());

//# sourceMappingURL=rethink.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rethink/userAvailability.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAvailabilityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services


var UserAvailabilityService = /** @class */ (function () {
    function UserAvailabilityService(router, route, rethinkService, contactService) {
        this.router = router;
        this.route = route;
        this.rethinkService = rethinkService;
        this.contactService = contactService;
        this.domain = this.rethinkService.domain;
    }
    UserAvailabilityService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[UserAvailability Service - get hyperty reporter] - ');
            var availabilityReporterURL = 'hyperty-catalogue://catalogue.' + _this.domain + '/.well-known/hyperty/UserAvailabilityReporter';
            _this.rethinkService.getHyperty(availabilityReporterURL)
                .then(function (hyperty) {
                _this.myAvailabilityReporter = hyperty.instance;
                console.log('[UserAvailability Service - getHyperty] Reporter hyperty was instantiated ', _this.myAvailabilityReporter);
                _this.myAvailabilityReporter.start().then(function (availability) {
                    _this.myAvailability = availability;
                    _this.contactService.sessionUser.statustUrl = availability.url;
                    _this.contactService.sessionUser.status = 'available';
                    _this.myAvailabilityReporter.setStatus('available');
                    _this.startObservation();
                    resolve(_this.myAvailabilityReporter);
                });
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    UserAvailabilityService.prototype.stopObservation = function (availability) {
        console.log('[UserAvailability service. stop observing] ', availability);
        this.availabilityObserver.unobserve(availability);
    };
    UserAvailabilityService.prototype.startObservation = function () {
        var _this = this;
        console.log('[UserAvailability service. start observation] ');
        var availabilityObserverURL = 'hyperty-catalogue://catalogue.' + this.domain + '/.well-known/hyperty/UserAvailabilityObserver';
        // let's first start the AvailabilityObserver Hyperty
        this.rethinkService.getHyperty(availabilityObserverURL).then(function (hyperty) {
            _this.availabilityObserver = hyperty.instance;
            console.log('[UserAvailability Service - getHyperty] Observer hyperty was instantiated ', _this.availabilityObserver);
            // Let's retrieve observers from previous sessions
            _this.availabilityObserver.start().then(function (availabilities) {
                // lets retrieve all users to be observed
                _this.contactService.getUsers().subscribe(function (users) {
                    console.log('[UserAvailability Service - startObservation] users to be observed:', users);
                    var newUsers = [];
                    users.forEach(function (user) {
                        if (user.statustUrl && availabilities[user.statustUrl]) {
                            // TODO: confirm controllers is a list not an array
                            user.startStatusObservation(availabilities[user.statustUrl]);
                        }
                        else if (user.username !== _this.contactService.sessionUser.username) {
                            newUsers.push(user);
                        }
                    });
                    // Users that are not subscribed yet, let's subscribe
                    if (newUsers.length >= 0) {
                        _this.subscribeUsers(newUsers);
                    }
                });
            });
        });
    };
    UserAvailabilityService.prototype.subscribeUsers = function (users) {
        // for each user let's discover reporter Hyperties
        var _this = this;
        users.forEach(function (user) {
            _this.discoverUserAvailability(user).then(function (availability) {
                // lets start a new user availability observation
                _this.availabilityObserver.observe(availability).then(function (controller) {
                    user.startStatusObservation(controller);
                });
            });
        });
    };
    UserAvailabilityService.prototype.discoverUserAvailability = function (user) {
        // discover and return last modified user availability hyperty
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.availabilityObserver.discoverUsers(user.username, _this.rethinkService.domain).then(function (discovered) {
                resolve(_this.getLastModifiedAvailability(discovered));
            });
        });
    };
    UserAvailabilityService.prototype.getLastModifiedAvailability = function (hyperties) {
        // from a list of discovered Availability Hyperty reporters return the one that was last modified
        var lastModifiedHyperty = hyperties[0];
        hyperties.forEach(function (hyperty) {
            if (new Date(hyperty.lastModified).getTime() > new Date(lastModifiedHyperty.lastModified).getTime()) {
                lastModifiedHyperty = hyperty;
            }
        });
        return lastModifiedHyperty;
    };
    UserAvailabilityService.prototype.setStatus = function (status) {
        console.log('[UserAvailability service. setStatus]', status);
        this.myAvailabilityReporter.setStatus(status);
    };
    UserAvailabilityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__rethink_service__["a" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__rethink_service__["a" /* RethinkService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contact_service__["a" /* ContactService */]) === "function" && _d || Object])
    ], UserAvailabilityService);
    return UserAvailabilityService;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=userAvailability.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/routing.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// Config

var RoutingService = /** @class */ (function () {
    function RoutingService(titleService, router, activatedRoute) {
        var _this = this;
        this.titleService = titleService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routingChanges = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('[Routing Service] - ');
        router.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) {
            var section = '';
            var title = '';
            console.log('[Routing Service] - params: ', event);
            if (event.hasOwnProperty('context')) {
                section = 'context';
                title = event.context.name;
            }
            else {
                section = event.pageSection || 'home';
                title = event.pageTitle || 'Home';
            }
            _this.titleService.setTitle(__WEBPACK_IMPORTED_MODULE_6__config__["a" /* config */].pageTitlePrefix + title);
            _this.routingChanges.emit({
                section: section,
                title: title
            });
        });
        // const context = route.root.params['context'];
        // const task = route.root.params['task'];
        // const user = route.root.params['user'];
        // let name = '';
        // let title = '';
        // if (context) { name = 'context';  title = context; };
        // if (task) { name = 'context'; title = task; };
        // if (user) { name = 'context'; title = user; };
        // if (title.length === 0) {
        //   name = 'home';
        //   title = 'Home';
        // }
        // this.titleService.setTitle(config.pageTitlePrefix + title);
        // console.log('[Routing Service] - ', this.titleService.getTitle());
        // this.routingChanges.emit({
        //   section: name,
        //   title: title
        // })
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RoutingService.prototype, "routingChanges", void 0);
    RoutingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["d" /* Title */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
    ], RoutingService);
    return RoutingService;
    var _a, _b, _c;
}());

//# sourceMappingURL=routing.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/services.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return servicesInjectables; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rethink_userAvailability_service__ = __webpack_require__("../../../../../src/app/services/rethink/userAvailability.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rethink_connector_service__ = __webpack_require__("../../../../../src/app/services/rethink/connector.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__ = __webpack_require__("../../../../../src/app/services/rethink/rethink.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rethink_chat_service__ = __webpack_require__("../../../../../src/app/services/rethink/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualCommTrigger_service__ = __webpack_require__("../../../../../src/app/services/contextualCommTrigger.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contextualCommData_resolver__ = __webpack_require__("../../../../../src/app/services/contextualCommData.resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contextualComm_service__ = __webpack_require__("../../../../../src/app/services/contextualComm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__triggerAction_service__ = __webpack_require__("../../../../../src/app/services/triggerAction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__activateTask_service__ = __webpack_require__("../../../../../src/app/services/activateTask.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__activateUser_service__ = __webpack_require__("../../../../../src/app/services/activateUser.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__breadcrumb_service__ = __webpack_require__("../../../../../src/app/services/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__routing_service__ = __webpack_require__("../../../../../src/app/services/routing.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__storage_service__ = __webpack_require__("../../../../../src/app/services/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__authGuard_service__ = __webpack_require__("../../../../../src/app/services/authGuard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__user_resolver__ = __webpack_require__("../../../../../src/app/services/user.resolver.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_15__authGuard_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__rethink_chat_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_16__user_resolver__["a"]; });
/* unused harmony reexport LocalStorage */
/* unused harmony reexport RoutingService */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_12__contact_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__rethink_connector_service__["a"]; });
/* unused harmony reexport BreadcrumbService */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__activateTask_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_10__activateUser_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_8__triggerAction_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__contextualComm_service__["a"]; });
/* unused harmony reexport UserAvailabilityService */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__contextualCommData_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__contextualCommData_resolver__["a"]; });
/* unused harmony reexport ContextualCommTriggerService */
// Rethink Services




// Services














var servicesInjectables = [
    __WEBPACK_IMPORTED_MODULE_3__rethink_chat_service__["a" /* ChatService */],
    __WEBPACK_IMPORTED_MODULE_14__storage_service__["a" /* LocalStorage */],
    __WEBPACK_IMPORTED_MODULE_13__routing_service__["a" /* RoutingService */],
    __WEBPACK_IMPORTED_MODULE_2__rethink_rethink_service__["a" /* RethinkService */],
    __WEBPACK_IMPORTED_MODULE_12__contact_service__["a" /* ContactService */],
    __WEBPACK_IMPORTED_MODULE_1__rethink_connector_service__["a" /* ConnectorService */],
    __WEBPACK_IMPORTED_MODULE_11__breadcrumb_service__["a" /* BreadcrumbService */],
    __WEBPACK_IMPORTED_MODULE_9__activateTask_service__["a" /* ActivateTaskGuard */],
    __WEBPACK_IMPORTED_MODULE_10__activateUser_service__["a" /* ActivateUserGuard */],
    __WEBPACK_IMPORTED_MODULE_8__triggerAction_service__["a" /* TriggerActionService */],
    __WEBPACK_IMPORTED_MODULE_0__rethink_userAvailability_service__["a" /* UserAvailabilityService */],
    __WEBPACK_IMPORTED_MODULE_4__contextualCommTrigger_service__["a" /* ContextualCommTriggerService */]
];
//# sourceMappingURL=services.js.map

/***/ }),

/***/ "../../../../../src/app/services/storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorage; });
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }
    LocalStorage.prototype.set = function (key, value) {
        this.localStorage[key] = value;
    };
    LocalStorage.prototype.get = function (key) {
        return this.localStorage[key] || false;
    };
    LocalStorage.prototype.setObject = function (key, value) {
        this.localStorage[key] = JSON.stringify(value);
    };
    LocalStorage.prototype.getObject = function (key) {
        return JSON.parse(this.localStorage[key] || '{}');
    };
    LocalStorage.prototype.remove = function (key) {
        this.localStorage.removeItem(key);
    };
    LocalStorage.prototype.hasObject = function (key) {
        return this.localStorage.hasOwnProperty(key);
    };
    return LocalStorage;
}());

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/triggerAction.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TriggerActionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TriggerActionService = /** @class */ (function () {
    function TriggerActionService() {
        this.triggerAction = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    /**
     *
     *
     * @param {TriggerActions} action
     *
     * @memberof TriggerActionService
     */
    TriggerActionService.prototype.trigger = function (action) {
        this.triggerAction.next(action);
    };
    /**
     *
     *
     * @returns {Observable<TriggerActions>}
     *
     * @memberof TriggerActionService
     */
    TriggerActionService.prototype.action = function () {
        return this.triggerAction;
    };
    TriggerActionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TriggerActionService);
    return TriggerActionService;
}());

//# sourceMappingURL=triggerAction.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/user.resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Service

// import { RethinkService, ChatService, ContextualCommService } from './services';
var UserResolver = /** @class */ (function () {
    function UserResolver(contactService, router) {
        this.contactService = contactService;
        this.router = router;
    }
    UserResolver.prototype.resolve = function (route) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var selectedUser = decodeURIComponent(route.params['user']);
            console.log(selectedUser);
            var user = _this.contactService.getByUserName(selectedUser);
            console.log('[User Resolver] - ', user);
            if (user) {
                resolve(user);
            }
            else {
                reject('no user found');
            }
        });
    };
    UserResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__contact_service__["a" /* ContactService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _b || Object])
    ], UserResolver);
    return UserResolver;
    var _a, _b;
}());

//# sourceMappingURL=user.resolver.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directive.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectiveModules; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screen_directive__ = __webpack_require__("../../../../../src/app/shared/screen.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sidebar_directive__ = __webpack_require__("../../../../../src/app/shared/sidebar.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fullscreen_directive__ = __webpack_require__("../../../../../src/app/shared/fullscreen.directive.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__screen_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__sidebar_directive__["a"]; });
/* unused harmony namespace reexport */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Type



var DirectiveModules = /** @class */ (function () {
    function DirectiveModules() {
    }
    DirectiveModules = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__screen_directive__["a" /* ScreenDirective */],
                __WEBPACK_IMPORTED_MODULE_2__sidebar_directive__["a" /* SidebarDirective */],
                __WEBPACK_IMPORTED_MODULE_3__fullscreen_directive__["a" /* FullscreenDirective */]
            ],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__screen_directive__["a" /* ScreenDirective */],
                __WEBPACK_IMPORTED_MODULE_2__sidebar_directive__["a" /* SidebarDirective */],
                __WEBPACK_IMPORTED_MODULE_3__fullscreen_directive__["a" /* FullscreenDirective */]
            ]
        })
    ], DirectiveModules);
    return DirectiveModules;
}());

//# sourceMappingURL=directive.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/fullscreen.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullscreenDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FullscreenDirective = /** @class */ (function () {
    function FullscreenDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.fullScreen = false;
    }
    FullscreenDirective.prototype.ngAfterViewInit = function () {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        console.log('DIRECTIVE:', this.el, this.renderer);
    };
    FullscreenDirective.prototype.exitFullScreen = function () {
        if (this.fullScreen) {
            this._exitFullScreen();
        }
    };
    FullscreenDirective.prototype.requestFullScreen = function () {
        if (!this.fullScreen) {
            this._requestFullScreen();
        }
    };
    FullscreenDirective.prototype.toogleFullscreen = function () {
        if (this.fullScreen) {
            this._exitFullScreen();
        }
        else {
            this._requestFullScreen();
        }
    };
    FullscreenDirective.prototype._requestFullScreen = function () {
        var docElm = this.el.nativeElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
            this.fullScreen = true;
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
            this.fullScreen = true;
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
            this.fullScreen = true;
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
            this.fullScreen = true;
        }
    };
    FullscreenDirective.prototype._exitFullScreen = function () {
        var docElm = document;
        if (docElm.exitFullscreen) {
            docElm.exitFullscreen();
            this.fullScreen = false;
        }
        else if (docElm.mozCancelFullScreen) {
            docElm.mozCancelFullScreen();
            this.fullScreen = false;
        }
        else if (docElm.webkitCancelFullScreen) {
            docElm.webkitCancelFullScreen();
            this.fullScreen = false;
        }
        else if (docElm.msExitFullscreen) {
            docElm.msExitFullscreen();
            this.fullScreen = false;
        }
    };
    FullscreenDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[fullscreen]',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]) === "function" && _b || Object])
    ], FullscreenDirective);
    return FullscreenDirective;
    var _a, _b;
}());

//# sourceMappingURL=fullscreen.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/rethink.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextNameValidatorDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rethink_validator__ = __webpack_require__("../../../../../src/app/shared/rethink.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NameValidator
 * @implements {Validator}
 */
var ContextNameValidatorDirective = /** @class */ (function () {
    function ContextNameValidatorDirective(contextualCommDataService) {
        this.contextualCommDataService = contextualCommDataService;
        this.valFn = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].composeAsync(null);
    }
    ContextNameValidatorDirective.prototype.ngOnChanges = function (changes) {
        var change = changes['name'];
        if (change) {
            this.valFn = __WEBPACK_IMPORTED_MODULE_2__rethink_validator__["a" /* RethinkValidators */].contextName(this.contextualCommDataService);
        }
        else {
            this.valFn = __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].composeAsync(null);
        }
    };
    ContextNameValidatorDirective.prototype.validate = function (control) {
        return this.valFn(control);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ContextNameValidatorDirective.prototype, "name", void 0);
    ContextNameValidatorDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[exist]',
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_ASYNC_VALIDATORS */], useExisting: __WEBPACK_IMPORTED_MODULE_2__rethink_validator__["a" /* RethinkValidators */], multi: true }]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _a || Object])
    ], ContextNameValidatorDirective);
    return ContextNameValidatorDirective;
    var _a;
}());

//# sourceMappingURL=rethink.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/rethink.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RethinkValidators; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);

var RethinkValidators = /** @class */ (function () {
    function RethinkValidators() {
    }
    RethinkValidators.contextName = function (contextualCommDataService) {
        return function (control) {
            var name = control.value.toLowerCase();
            return new Promise(function (resolve) {
                contextualCommDataService.getContext(name).subscribe(function (context) {
                    if (context) {
                        resolve({ 'exist': name });
                    }
                    else {
                        resolve(null);
                    }
                }, function (error) {
                    resolve(null);
                });
            });
        };
    };
    return RethinkValidators;
}());

//# sourceMappingURL=rethink.validator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/screen.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScreenDirective = /** @class */ (function () {
    function ScreenDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.envs = ['xs', 'sm', 'md', 'lg', 'xl'];
        this.breakpoints = {
            xs: { name: 'xs', max: 575 },
            sm: { name: 'sm', min: 576, max: 767 },
            md: { name: 'md', min: 768, max: 991 },
            lg: { name: 'lg', min: 992, max: 1199 },
            xl: { name: 'xl', min: 1200 }
        };
    }
    ScreenDirective.prototype.onResize = function (event) {
        this.update();
    };
    ScreenDirective.prototype.ngAfterContentInit = function () {
    };
    ScreenDirective.prototype.ngAfterViewInit = function () {
        console.log('Screen Directive:', this.getEnvironment());
    };
    ScreenDirective.prototype.getEnvironment = function () {
        return this.update();
    };
    ScreenDirective.prototype.update = function () {
        var current = this.el.nativeElement;
        var _width = current.offsetWidth;
        if (this.breakpoints.xl.min <= _width) {
            return this.breakpoints.xl;
        }
        else if (this.breakpoints.lg.max >= _width && this.breakpoints.lg.min <= _width) {
            return this.breakpoints.lg;
        }
        else if (this.breakpoints.md.max >= _width && this.breakpoints.md.min <= _width) {
            return this.breakpoints.md;
        }
        else if (this.breakpoints.sm.max >= _width && this.breakpoints.sm.min <= _width) {
            return this.breakpoints.sm;
        }
        else if (this.breakpoints.xs.max >= _width) {
            return this.breakpoints.xs;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ScreenDirective.prototype, "onResize", null);
    ScreenDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[screen]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]) === "function" && _b || Object])
    ], ScreenDirective);
    return ScreenDirective;
    var _a, _b;
}());

//# sourceMappingURL=screen.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sidebar.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebarDirective = /** @class */ (function () {
    function SidebarDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.open = false;
        this.statusEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('DIRECTIVE:', el, renderer);
    }
    SidebarDirective.prototype.ngAfterViewInit = function () {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this._removeClass('opened');
        console.log('DIRECTIVE:', this.el);
    };
    SidebarDirective.prototype.show = function () {
        console.log('DIRECTIVE - SHOW: ', this.open);
        if (!this.open) {
            this._addClass('opened');
            this.open = !this.open;
        }
        else {
            this._removeClass('opened');
            this.open = !this.open;
        }
        this.statusEmitter.emit({ status: this.open });
    };
    SidebarDirective.prototype._addClass = function (className) {
        this.renderer.setElementClass(this.el.nativeElement, className, true);
    };
    SidebarDirective.prototype._removeClass = function (className) {
        this.renderer.setElementClass(this.el.nativeElement, className, false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SidebarDirective.prototype, "statusEmitter", void 0);
    SidebarDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[showSidebar]',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _b || Object])
    ], SidebarDirective);
    return SidebarDirective;
    var _a, _b;
}());

//# sourceMappingURL=sidebar.directive.js.map

/***/ }),

/***/ "../../../../../src/app/utils/CustomURLSerializer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomUrlSerializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");

var CustomUrlSerializer = /** @class */ (function () {
    function CustomUrlSerializer() {
    }
    CustomUrlSerializer.prototype.parse = function (url) {
        var dus = new __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* DefaultUrlSerializer */]();
        return dus.parse(url);
    };
    CustomUrlSerializer.prototype.serialize = function (tree) {
        var dus = new __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* DefaultUrlSerializer */](), path = dus.serialize(tree);
        var at = new RegExp(/%40/g);
        // use your regex to replace as per your requirement.
        return path.replace(at, '@');
    };
    return CustomUrlSerializer;
}());

//# sourceMappingURL=CustomURLSerializer.js.map

/***/ }),

/***/ "../../../../../src/app/utils/CustomUtils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomUtils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomURLSerializer__ = __webpack_require__("../../../../../src/app/utils/CustomURLSerializer.ts");


// @NgModule({
//   declarations: [ TimeElapsedPipe ],
//   imports: [ CommonModule],
//   exports: [ TimeElapsedPipe ]
// })
var CustomUtils = [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* UrlSerializer */], useClass: __WEBPACK_IMPORTED_MODULE_1__CustomURLSerializer__["a" /* CustomUrlSerializer */] }];
//# sourceMappingURL=CustomUtils.js.map

/***/ }),

/***/ "../../../../../src/app/utils/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = strMapToObj;
/* unused harmony export objToStrMap */
/* harmony export (immutable) */ __webpack_exports__["c"] = getUserMedia;
/* harmony export (immutable) */ __webpack_exports__["e"] = isAnUser;
/* harmony export (immutable) */ __webpack_exports__["g"] = normalizeName;
/* harmony export (immutable) */ __webpack_exports__["i"] = splitFromURL;
/* harmony export (immutable) */ __webpack_exports__["f"] = normalizeFromURL;
/* harmony export (immutable) */ __webpack_exports__["h"] = objectToPath;
/* harmony export (immutable) */ __webpack_exports__["a"] = clearMyUsername;
/* harmony export (immutable) */ __webpack_exports__["b"] = filterContextsByName;
/* harmony export (immutable) */ __webpack_exports__["d"] = isALegacyUser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};

function strMapToObj(strMap) {
    var obj = Object.create(null);
    strMap.forEach(function (v, k) {
        obj[k] = v;
    });
    return obj;
}
function objToStrMap(obj) {
    var strMap = new Map();
    try {
        for (var _a = __values(Object.keys(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
            var k = _b.value;
            strMap.set(k, obj[k]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return strMap;
    var e_1, _c;
}
function getUserMedia(constraints) {
    return new Promise(function (resolve, reject) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
            resolve(mediaStream);
        }).catch(function (reason) {
            reject(reason);
        });
    });
}
function isAnUser(name) {
    console.log('isAnUser - name:', name);
    var users = [];
    if (name.indexOf('-') !== -1) {
        users = name.split('-');
    }
    else {
        users.push(name);
    }
    console.log('isAnUser - users:', users);
    var result = users.map(function (user) {
        var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        console.log('isAnUser:', pattern.test(user));
        return pattern.test(user);
    });
    console.log(result);
    return result[0] && result[1];
}
function normalizeName(name, parent) {
    var prefix = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].appPrefix;
    var splitChar = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].splitChar;
    var at = new RegExp(/%40/g);
    // Clear path from attributes
    if (name.indexOf('?') !== -1) {
        name = name.substring(0, name.lastIndexOf('?'));
    }
    name = name.toLowerCase();
    name = name.replace(at, '@');
    var normalized = {};
    var splited = [];
    if (name.indexOf('/') !== -1) {
        splited = name.split('/');
        splited[0] = prefix;
    }
    else {
        if (!parent) {
            splited.push(prefix);
        }
        splited.push(name);
    }
    if (parent) {
        var tmp1 = parent.split(splitChar);
        tmp1.reduceRight(function (prev, curr) {
            prev.unshift(curr);
            return prev;
        }, splited);
    }
    console.log('Splited: ', name, parent, splited);
    var userName = splited[3] === 'user' ? splited[4] : splited[3];
    var isTask = splited[2] === 'user' && isAnUser(splited[3]) ? false : true;
    if (!isTask) {
        userName = splited[3];
    }
    var contextId = splited[0] + splitChar + splited[1];
    var task = isTask ? splited[2] : null;
    var user = userName ? userName : null;
    if (contextId) {
        normalized['id'] = contextId;
        normalized['name'] = splited[1];
        normalized['parent'] = null;
    }
    if (task) {
        normalized['id'] = contextId + splitChar + task;
        normalized['name'] = task;
        normalized['parent'] = contextId;
    }
    if (user) {
        normalized['id'] = contextId + splitChar + (task ? task + splitChar : '') + user;
        normalized['name'] = user;
        normalized['parent'] = contextId + (task ? splitChar + task : '');
    }
    console.log('Normalized Path:', normalized);
    return normalized;
}
function splitFromURL(name, currentUser) {
    var splitChar = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].splitChar;
    var splited = name.split(splitChar);
    var result = {};
    var context = splited[1];
    var task = splited[2];
    var user = splited[3];
    if (context) {
        result['context'] = context;
    }
    if (task) {
        result['context'] = context;
        result['task'] = task;
    }
    if (user) {
        result['context'] = context;
        result['task'] = task;
        if (user.includes('@') && user.includes('-')) {
            var users = user.split('-');
            if (currentUser) {
                users.splice(users.indexOf(currentUser), 1);
            }
            result['user'] = users[0];
        }
    }
    return result;
}
function normalizeFromURL(path, username) {
    var splitChar = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].splitChar;
    var at = new RegExp(/%40/g);
    path = path.replace(at, '@');
    // Clear path from attributes
    if (path.indexOf('?') !== -1) {
        path = path.substring(0, path.lastIndexOf('?'));
    }
    var pathSplited = path.split('/');
    pathSplited[0] = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].appPrefix;
    if (path.includes('@') && username) {
        var lastIndex = pathSplited.length - 1;
        var last = pathSplited[lastIndex];
        var updated = last;
        if (!last.includes(username)) {
            updated = last + '-' + username;
        }
        pathSplited[lastIndex] = updated;
    }
    var joined = pathSplited.join(splitChar);
    console.log('AQUI:', path, username, pathSplited, joined);
    return joined;
}
function objectToPath(value) {
    var prefix = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].appPrefix;
    var splitChar = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].splitChar;
    var path = '';
    if (value.includes(prefix)) {
        path = value.replace(prefix + splitChar, '');
    }
    console.log('ObjectToPath: ', value, ' | ', path);
    return path;
}
function clearMyUsername(name, username) {
    if (name.indexOf('-') !== -1 && name.indexOf('@') !== -1 && name.includes(username)) {
        return name.replace(username, '').replace('-', '');
    }
    return name;
}
function filterContextsByName(name, context) {
    if (name.includes('@')) {
        var users = name.split('-');
        var user1 = users[0];
        var user2 = users[1];
        var variation1 = user1 + '-' + user2;
        var variation2 = user2 + '-' + user1;
        if (context.name === variation1) {
            name = variation1;
        }
        else if (context.name === variation2) {
            name = variation2;
        }
    }
    console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
    return context.name === name;
}
function isALegacyUser(user) {
    var reg = new RegExp(/([a-zA-Z]+):\/\//, 'i');
    return reg.test(user);
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../../../../../src/app/views/activityView/activity-view.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"pl-4 pr-4 pt-4\">Recent Activity</h3>\n\n<div class=\"overflow-content w-100 h-100\">\n  <div class=\"row h-100 no-gutters\">\n    <div class=\"col-12 col-lg-7 h-100 v-scroll\">\n      <context-activity-list [eventMode]=\"true\" [messages]=\"messages\"></context-activity-list>\n    </div>\n\n    <div class=\"col-12 col-lg-5 h-100\">\n\n    </div>\n\n  </div>\n</div>\n\n<chat-view></chat-view>\n"

/***/ }),

/***/ "../../../../../src/app/views/activityView/activity-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contextualCommActivity_contextualCommActivity_component__ = __webpack_require__("../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Components

// Services

var ActivityViewComponent = /** @class */ (function () {
    function ActivityViewComponent(route, chatService, contextualCommService) {
        this.route = route;
        this.chatService = chatService;
        this.contextualCommService = contextualCommService;
        this.hostClass = 'view-content d-flex flex-column';
        this.messages = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
    }
    // Load data ones componet is ready
    ActivityViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.forEach(function (data) {
            console.log('Resolve data Context: ', data.context);
            _this.messages.next(data.context.messages);
        });
        this.contextualCommService.currentContext().subscribe(function (contextualComm) {
            console.log('[ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ActivityViewComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */]) === "function" && _a || Object)
    ], ActivityViewComponent.prototype, "contextualCommActivityComponent", void 0);
    ActivityViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-view',
            template: __webpack_require__("../../../../../src/app/views/activityView/activity-view.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_services__["d" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_services__["d" /* ChatService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_services__["i" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_services__["i" /* ContextualCommService */]) === "function" && _d || Object])
    ], ActivityViewComponent);
    return ActivityViewComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=activity-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/breadcrumb/breadcrumb.component.html":
/***/ (function(module, exports) {

module.exports = "<li class=\"breadcrumb-trigger hidden-sm-up\">\n  <a href=\"javascript:;\" class=\"menu-trigger\" (click)=\"onClickEvent($event)\">\n    <i class=\"icon-ellipsis fa fa-ellipsis-v\"></i>\n    <i class=\"icon-back fa fa-chevron-left\"></i>\n  </a>\n</li>\n\n<li class=\"breadcrumb-path\" *ngFor=\"let item of breadcrumb | async; let i = index; let $first = first; let $last = last; \" [class.first]=\"$first\" [class.last]=\"$last\" >\n  <h3 class=\"level-{{i}}\">\n\n    <a class=\"name\" *ngIf=\"!$last\" routerLink=\"{{item}}\" routerLinkActive=\"active\">\n      <!--<span *ngIf=\"!$last\" class=\"fa fa-lock\"></span>-->\n      <!--{{item.replace('/', '').substr(item.lastIndexOf('/'))}}-->\n      {{item}}\n    </a>\n\n    <!-- TODO apply an PIPE here to replace the address -->\n    <span class=\"name\" *ngIf=\"$last\">\n      <!--<span *ngIf=\"!$last\" class=\"fa fa-lock\"></span>-->\n      <!--{{item.replace('/', '').substr(item.lastIndexOf('/'))}}-->\n      {{item}}\n    </span>\n  </h3>\n</li>\n"

/***/ }),

/***/ "../../../../../src/app/views/breadcrumb/breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextBreadcrumbComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_breadcrumb_service__ = __webpack_require__("../../../../../src/app/services/breadcrumb.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContextBreadcrumbComponent = /** @class */ (function () {
    function ContextBreadcrumbComponent(router, breadcrumbService) {
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.hostClass = 'rethink-breadcrumb';
        this.openContext = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.breadcrumb = this.breadcrumbService.breadcrumb.map(function (paths) {
            console.log('[Breadcrumb Service] - Component: ', paths);
            return paths.map(function (path) {
                if (path.indexOf('?') !== -1) {
                    path = path.substring(0, path.indexOf('?'));
                }
                if (path.indexOf('user') !== -1) {
                    path = path.replace('user', '');
                }
                return path;
            }).map(function (item) {
                item = item.replace('/', '').substr(item.lastIndexOf('/'));
                if (item && item.length > 0) {
                    return item;
                }
            }).filter(function (item) { return item ? true : false; });
        });
    }
    ContextBreadcrumbComponent.prototype.ngOnInit = function () {
    };
    ContextBreadcrumbComponent.prototype.ngAfterViewInit = function () {
    };
    ContextBreadcrumbComponent.prototype.ngOnDestroy = function () {
    };
    ContextBreadcrumbComponent.prototype.onClickEvent = function ($event) {
        this.openContext.emit($event);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContextBreadcrumbComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContextBreadcrumbComponent.prototype, "openContext", void 0);
    ContextBreadcrumbComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ul[context-breadcrumb]',
            template: __webpack_require__("../../../../../src/app/views/breadcrumb/breadcrumb.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _b || Object])
    ], ContextBreadcrumbComponent);
    return ContextBreadcrumbComponent;
    var _a, _b;
}());

//# sourceMappingURL=breadcrumb.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualComm/contextualComm.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"sidebar\" #sidebar showSidebar class=\"col-sm-4 col-lg-3 col-xl-2 sidebar hidden-xs-down\">\n    <context-user-view [allowAddUser]=allowAddUser [users]=userList ></context-user-view>\n</div>\n\n<div class=\"col-12 col-sm-8 push-sm-4 col-lg-9 push-lg-3 col-xl-10 push-xl-2 main-content\">\n    <div #content class=\"content-panel\">\n        <router-outlet></router-outlet>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualComm/contextualComm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contextualCommUsers_add_user_component__ = __webpack_require__("../../../../../src/app/views/contextualCommUsers/add-user.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Services

// Utils

// Components

var ContextualCommComponent = /** @class */ (function () {
    function ContextualCommComponent(router, route, appService, contextualCommDataService, contactService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.appService = appService;
        this.contextualCommDataService = contextualCommDataService;
        this.contactService = contactService;
        this.hostClass = 'context-view row no-gutters';
        this.allowAddUser = false;
        this.userList = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.routeData = this.route.data.subscribe(function (data) {
            _this.updateCurrentContext(data.context);
        });
        this.currentContext = this.contextualCommDataService.currentContext().subscribe(function (context) {
            console.log('[ContextualComm View - active context change]:', context);
            _this.updateCurrentContext(context);
        });
    }
    ContextualCommComponent.prototype.onResize = function (event) {
        this.updateView();
    };
    ContextualCommComponent.prototype.updateCurrentContext = function (context) {
        var _this = this;
        console.log('[ContextualComm View - active context change]:', context);
        this.allowAddUser = context.reporter ? true : false;
        // Check if the context is not an atomicContext
        // TODO: we should check for an instance of Atomic and Composite Context;
        if (!context.id.includes('@')) {
            console.log('[ContextualComm View - is not an Atomic Context]:', context);
            this.userList.next(context.users);
        }
        else {
            var normalizedPath = Object(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["f" /* normalizeFromURL */])(this.router.url, this.contactService.sessionUser.username);
            var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["g" /* normalizeName */])(normalizedPath);
            console.log('[ContextualComm View - get parent active context]:', normalizedPath);
            console.log('[ContextualComm View - get parent active context]:', normalizedName);
            var result = void 0;
            result = this.contextualCommDataService.getContextById(normalizedName.id);
            result.subscribe(function (parentContext) {
                console.log('[ContextualComm View - get parent context]:', parentContext);
                _this.userList.next(parentContext.users);
            });
            this.allowAddUser = false;
        }
    };
    // Load data ones componet is ready
    ContextualCommComponent.prototype.ngOnInit = function () {
        console.log('[ContextualComm View - onInit]', this.content);
    };
    ContextualCommComponent.prototype.ngAfterViewInit = function () {
        this.updateView();
    };
    ContextualCommComponent.prototype.ngOnDestroy = function () {
        this.currentContext.unsubscribe();
        this.routeData.unsubscribe();
    };
    ContextualCommComponent.prototype.updateView = function () {
        // TODO: try to put this code in Sidebar Directive
        // TODO: i tried but i can't do it;
        var element = document.getElementById('sidebar');
        if (element.classList.contains('opened')) {
            element.classList.remove('opened');
        }
    };
    ContextualCommComponent.prototype.onInviteEvent = function (value) {
        console.log('Invite some one: ', value);
    };
    ContextualCommComponent.prototype.onCloseEvent = function () {
    };
    ContextualCommComponent.prototype.onContactClick = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContextualCommComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _a || Object)
    ], ContextualCommComponent.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sidebar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _b || Object)
    ], ContextualCommComponent.prototype, "sidebar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__contextualCommUsers_add_user_component__["a" /* AddUserComponent */]),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__contextualCommUsers_add_user_component__["a" /* AddUserComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__contextualCommUsers_add_user_component__["a" /* AddUserComponent */]) === "function" && _c || Object)
    ], ContextualCommComponent.prototype, "addUserComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ContextualCommComponent.prototype, "onResize", null);
    ContextualCommComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'context-view',
            template: __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.component.html"),
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["j" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["j" /* RethinkService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["h" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["h" /* ContextualCommDataService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["f" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["f" /* ContactService */]) === "function" && _h || Object])
    ], ContextualCommComponent);
    return ContextualCommComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=contextualComm.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualComm/contextualComm.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualComm_routing__ = __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_rethink_directive__ = __webpack_require__("../../../../../src/app/shared/rethink.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_directive_module__ = __webpack_require__("../../../../../src/app/shared/directive.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_rethink_communication_mediaCommunication_component__ = __webpack_require__("../../../../../src/app/components/rethink/communication/mediaCommunication.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_rethink_communication_chatCommunication_component__ = __webpack_require__("../../../../../src/app/components/rethink/communication/chatCommunication.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_rethink_hypertyResource_chat_chatEvent_component__ = __webpack_require__("../../../../../src/app/components/rethink/hypertyResource/chat/chatEvent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_rethink_hypertyResource_file_fileEvent_component__ = __webpack_require__("../../../../../src/app/components/rethink/hypertyResource/file/fileEvent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__userView_contact_box_component__ = __webpack_require__("../../../../../src/app/views/userView/contact-box.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__userView_user_view_component__ = __webpack_require__("../../../../../src/app/views/userView/user-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__activityView_activity_view_component__ = __webpack_require__("../../../../../src/app/views/activityView/activity-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__contextualCommActivity_contextualCommActivity_component__ = __webpack_require__("../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_pipes__ = __webpack_require__("../../../../../src/app/pipes/pipes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Generic Components






// Components views



// Components

// Custom Pipes

// Services

var ContextualCommModule = /** @class */ (function () {
    function ContextualCommModule() {
    }
    ContextualCommModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_15__pipes_pipes__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_3_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__shared_directive_module__["a" /* DirectiveModules */],
                __WEBPACK_IMPORTED_MODULE_4__contextualComm_routing__["a" /* ContextualCommRoutingModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__shared_rethink_directive__["a" /* ContextNameValidatorDirective */],
                __WEBPACK_IMPORTED_MODULE_14__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */],
                __WEBPACK_IMPORTED_MODULE_13__activityView_activity_view_component__["a" /* ActivityViewComponent */],
                __WEBPACK_IMPORTED_MODULE_12__userView_user_view_component__["a" /* UserViewComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_rethink_communication_chatCommunication_component__["a" /* ChatCommunicationComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_rethink_communication_mediaCommunication_component__["a" /* MediaCommunicationComponent */],
                __WEBPACK_IMPORTED_MODULE_11__userView_contact_box_component__["a" /* ContactBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_rethink_hypertyResource_chat_chatEvent_component__["a" /* ChatEventComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_rethink_hypertyResource_file_fileEvent_component__["a" /* FileEventComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__services_services__["c" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_16__services_services__["l" /* UserResolver */],
                __WEBPACK_IMPORTED_MODULE_16__services_services__["i" /* ContextualCommService */],
                __WEBPACK_IMPORTED_MODULE_16__services_services__["h" /* ContextualCommDataService */],
                __WEBPACK_IMPORTED_MODULE_16__services_services__["g" /* ContextualCommDataResolver */]
            ]
        })
    ], ContextualCommModule);
    return ContextualCommModule;
}());

//# sourceMappingURL=contextualComm.module.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualComm/contextualComm.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__ = __webpack_require__("../../../../../src/app/services/contextualCommData.resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_resolver__ = __webpack_require__("../../../../../src/app/services/user.resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contextualComm_component__ = __webpack_require__("../../../../../src/app/views/contextualComm/contextualComm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__activityView_activity_view_component__ = __webpack_require__("../../../../../src/app/views/activityView/activity-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__userView_user_view_component__ = __webpack_require__("../../../../../src/app/views/userView/user-view.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Components






// TODO: Optimize the Resolve Context
var contextualCommRoutes = [
    {
        path: ':context',
        component: __WEBPACK_IMPORTED_MODULE_5__contextualComm_component__["a" /* ContextualCommComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_services__["c" /* AuthGuard */]],
        resolve: {
            context: __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__["a" /* ContextualCommDataResolver */]
        },
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_6__activityView_activity_view_component__["a" /* ActivityViewComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* ActivateTaskGuard */]],
                resolve: {
                    context: __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__["a" /* ContextualCommDataResolver */]
                }
            },
            {
                path: ':task',
                component: __WEBPACK_IMPORTED_MODULE_6__activityView_activity_view_component__["a" /* ActivityViewComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_services__["a" /* ActivateTaskGuard */]],
                resolve: {
                    context: __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__["a" /* ContextualCommDataResolver */]
                },
            },
            {
                path: 'user/:user',
                component: __WEBPACK_IMPORTED_MODULE_7__userView_user_view_component__["a" /* UserViewComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ActivateUserGuard */]],
                resolve: {
                    user: __WEBPACK_IMPORTED_MODULE_4__services_user_resolver__["a" /* UserResolver */],
                    context: __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__["a" /* ContextualCommDataResolver */]
                }
            },
            {
                path: ':task/user/:user',
                component: __WEBPACK_IMPORTED_MODULE_7__userView_user_view_component__["a" /* UserViewComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_services__["b" /* ActivateUserGuard */]],
                resolve: {
                    user: __WEBPACK_IMPORTED_MODULE_4__services_user_resolver__["a" /* UserResolver */],
                    context: __WEBPACK_IMPORTED_MODULE_3__services_contextualCommData_resolver__["a" /* ContextualCommDataResolver */]
                }
            }
        ]
    }
];
var ContextualCommRoutingModule = /** @class */ (function () {
    function ContextualCommRoutingModule() {
    }
    ContextualCommRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */].forChild(contextualCommRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */]
            ]
        })
    ], ContextualCommRoutingModule);
    return ContextualCommRoutingModule;
}());

//# sourceMappingURL=contextualComm.routing.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.html":
/***/ (function(module, exports) {

module.exports = "<li class=\"list-item\" *ngFor=\"let message of messages | async\" [ngSwitch]=\"message.type\">\n  <chat-event *ngSwitchCase=\"'message'\" [message]=\"message\" [isAnEvent]=\"eventMode\"></chat-event>\n  <file-event *ngSwitchCase=\"'file'\" [message]=\"message\"></file-event>\n  <span *ngSwitchDefault>other</span>\n</li>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContextualCommActivityComponent = /** @class */ (function () {
    function ContextualCommActivityComponent(el) {
        this.el = el;
        this.hostClass = 'activity-list w-100 h-100';
        this.eventMode = false;
    }
    ContextualCommActivityComponent.prototype.ngOnChanges = function (changes) {
        console.log('CHANGES:', changes);
    };
    ContextualCommActivityComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.messages.subscribe(function (messages) {
            // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
            setTimeout(function () { _this.scrollToBottom(); });
        });
    };
    ContextualCommActivityComponent.prototype.scrollToBottom = function () {
        var scrollPane = this.el.nativeElement;
        var parentEl = scrollPane.offsetParent;
        if (parentEl) {
            parentEl.scrollTop = parentEl.scrollHeight;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContextualCommActivityComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]) === "function" && _a || Object)
    ], ContextualCommActivityComponent.prototype, "messages", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ContextualCommActivityComponent.prototype, "eventMode", void 0);
    ContextualCommActivityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'context-activity-list',
            template: __webpack_require__("../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object])
    ], ContextualCommActivityComponent);
    return ContextualCommActivityComponent;
    var _a, _b;
}());

//# sourceMappingURL=contextualCommActivity.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n\n  <div class=\"row justify-content-center\">\n    <div class=\"col-12 col-md-8\">\n\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">{{title}}</h5>\n\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n\n      <form class=\"context\" [formGroup]=\"complexForm\" (ngSubmit)=\"submitForm(complexForm.value)\" (submit)=\"d('success')\">\n\n        <div class=\"modal-body\">\n\n          <div class=\"form-group\">\n            <label for=\"name\">Context Name</label>\n\n            <input type=\"text\" id=\"name\" formControlName=\"name\" class=\"form-control {{ complexForm.controls['name'].errors ? 'is-invalid' : 'is-valid' }}\"\n               [formControl]=\"complexForm.controls['name']\" (blur)=\"onLostFocus($event)\"\n               aria-describedby=\"nameHelp\" placeholder=\"Context name\">\n\n            <!-- <div class=\"form-control-feedback\">Success! You've done it.</div> -->\n\n            <div *ngIf=\"complexForm.controls['name'].errors\" class=\"invalid-feedback\">\n              <span [hidden]=\"!complexForm.controls['name'].errors.exist\">This context name already taken</span>\n              <span [hidden]=\"!complexForm.controls['name'].errors.required\">Don't forget the context name.</span>\n              <span [hidden]=\"!complexForm.controls['name'].errors.pattern\">Contexts names can't contain spaces, periods, or most punctuation.</span>\n              <span [hidden]=\"!complexForm.controls['name'].errors.minlength\">Name must be at least 4 characters long.</span>\n              <span [hidden]=\"!complexForm.controls['name'].errors.maxlength\">Name cannot be more than 22 characters long.</span>\n            </div>\n            <!-- Contexts names can't contain spaces, periods, or most punctuation. Try again?-->\n            <small id=\"nameHelp\" class=\"form-text text-muted\">Contexts names must be lowercase, without spaces or periods, and shorter than 22 characters</small>\n\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"icon\">Icons</label>\n\n            <div ngbRadioGroup id=\"icons\" class=\"form-control btn-group\" formControlName=\"icon\" [formControl]=\"complexForm.controls['icon']\" name=\"icon\">\n              <label ngbButtonLabel *ngFor=\"let icon of icons; let i = index\" class=\"btn btn-primary mt-1 mb-1\">\n                <input ngbButton type=\"radio\" name=\"icon\" id=\"icon-{{icon}}\" value=\"{{icon}}\" autocomplete=\"off\"><i class=\"fa fa-{{icon}}\"></i>\n              </label>\n            </div>\n\n          </div>\n\n          <div *ngIf=\"complexForm.controls['parent'].value\"  class=\"form-group {{ complexForm.controls['parent'].errors ? 'is-invalid' : 'is-valid' }}\">\n            <label>Select the main context</label>\n\n            <select class=\"form-control\" formControlName=\"parent\" [formControl]=\"complexForm.controls['parent']\">\n              <option selected value=null>Choose...</option>\n              <option *ngFor=\"let context of contextualComms | async\" [value]=\"context.id\">{{context.name}}</option>\n            </select>\n\n            <div *ngIf=\"complexForm.controls['parent'].errors\" class=\"invalid-feedback\">\n              <span [hidden]=\"!complexForm.controls['parent'].errors.required\">Main context is required</span>\n            </div>\n\n          </div>\n        </div>\n\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" (click)=\"c('Close click')\">Close</button>\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!complexForm.valid\">Save changes</button>\n        </div>\n\n<!--        <p>Form value: {{ complexForm.value | json }}</p>\n        <p>Form status: {{ complexForm.status | json }}</p>-->\n\n      </form>\n    </div>\n  </div>\n\n</ng-template>\n\n<!-- Add context button -->\n<a href=\"javascript:;\" class=\"float-left\" (click)=\"open(content)\">\n  <i class=\"fa fa-plus-circle\"></i>new context\n</a>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddContextualCommComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_defaultIfEmpty__ = __webpack_require__("../../../../rxjs/add/operator/defaultIfEmpty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_defaultIfEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_defaultIfEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_app_models__ = __webpack_require__("../../../../../src/app/models/app.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_rethink_validator__ = __webpack_require__("../../../../../src/app/shared/rethink.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_contact_service__ = __webpack_require__("../../../../../src/app/services/contact.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// Bootstrap

// App Model

// Validator

// Services



var AddContextualCommComponent = /** @class */ (function () {
    function AddContextualCommComponent(router, fb, route, modalService, contactService, triggerActionService, contextualCommDataService) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.modalService = modalService;
        this.contactService = contactService;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'add-context-view';
        this.model = {};
        this.icons = [
            'comments',
            'briefcase',
            'heart',
            'heartbeat',
            'film',
            'camera',
            'futbol-o',
            'gamepad',
            'graduation-cap',
            'cogs',
            'users'
        ];
        this.title = 'Add New context';
        this.pattern = '[a-zA-Z0-9- ]*';
        this.minLenght = 4;
        this.maxLenght = 22;
        this.required = true;
        this.contextualComms = this.contextualCommDataService.getContexts();
        //  = this.router.events.subscribe((navigation: NavigationEnd) => {
        //   console.log('[AddContextualComm] - router events:', navigation);
        //   if (navigation instanceof NavigationEnd) {
        //     this.routeParams = splitFromURL(navigation.url);
        //     console.log('[AddContextualComm] - route params:', this.routeParams);
        //   }
        // });
        this.routeEvents = this.route.params.subscribe(function (event) {
            console.log('[AddContextualComm] - route events:', event);
            _this.routeParams = event;
        });
    }
    AddContextualCommComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.triggerActions = this.triggerActionService.action().subscribe(function (action) {
            if (action === __WEBPACK_IMPORTED_MODULE_6__models_app_models__["b" /* TriggerActions */].OpenContextMenuCreator) {
                _this.open(_this.el);
            }
        });
    };
    AddContextualCommComponent.prototype.ngOnDestroy = function () {
        this.routeEvents.unsubscribe();
        this.triggerActions.unsubscribe();
        console.log('[AddContextualComm] - destroy component');
    };
    AddContextualCommComponent.prototype.buildForm = function () {
        var _this = this;
        console.log('[AddContextualComm] - build form: ', this.routeParams);
        var mainContext = this.routeParams.context || '';
        var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["g" /* normalizeName */])(mainContext);
        var contextNameId = normalizedName.parent ? normalizedName.parent : normalizedName.id;
        this.contextualCommDataService
            .getContextById(contextNameId)
            .subscribe(function (context) {
            _this.fillForm(context);
        }, function (error) {
            _this.fillForm();
        });
    };
    AddContextualCommComponent.prototype.fillForm = function (context) {
        this.model.name = '';
        this.model.icon = this.icons[0];
        this.model.parent = context ? context.id : null;
        this.model.reporter = true;
        if (this.complexForm) {
            this.complexForm.reset();
        }
        this.complexForm = this.fb.group({
            'name': [this.model.name,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].pattern(this.pattern),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(this.minLenght),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].maxLength(this.maxLenght)
                ]),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].composeAsync([
                    __WEBPACK_IMPORTED_MODULE_7__shared_rethink_validator__["a" /* RethinkValidators */].contextName(this.contextualCommDataService)
                ])],
            'parent': [{ value: this.model.parent, disabled: true }],
            'icon': [this.model.icon]
        });
        // console.log('[AddContextualComm] - controls: ', this.complexForm.controls);
    };
    AddContextualCommComponent.prototype.open = function (content) {
        var _this = this;
        console.log('[AddContextualComm] - ', content);
        this.buildForm();
        this.modalService.open(content, { windowClass: 'custom-modal' }).result.then(function (result) {
            console.log('AQUI:', result);
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    AddContextualCommComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    AddContextualCommComponent.prototype.onLostFocus = function (event) {
        var nameEl = event.target;
        var value = nameEl.value.replace(/\s+/g, '-');
        nameEl.value = value;
    };
    AddContextualCommComponent.prototype.submitForm = function (value) {
        var _this = this;
        console.log('Submit:', value);
        var name = value.name.trim();
        var parent = value.parent || this.model.parent;
        var info = value;
        info['reporter'] = true;
        this.contextualCommDataService.createContext(name, parent, info).then(function (result) {
            _this.buildForm();
        }).catch(function (reason) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], AddContextualCommComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
    ], AddContextualCommComponent.prototype, "el", void 0);
    AddContextualCommComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-contextualcomm-view',
            template: __webpack_require__("../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.html"),
            styles: [__webpack_require__("../../../../../src/app/views/contextualCommMenu/add-contextualComm.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__services_contact_service__["a" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_contact_service__["a" /* ContactService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__services_services__["k" /* TriggerActionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_services__["k" /* TriggerActionService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _h || Object])
    ], AddContextualCommComponent);
    return AddContextualCommComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=add-contextualComm.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/contextMenu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mp-level\">\n\n  <h2 class=\"p-3\">Contexts</h2>\n\n  <div class=\"list-group\">\n\n    <div class=\"list-group-item border-0 list-group-item-action flex-column align-items-start search-bar\">\n\n      <form class=\"filter d-flex w-100 justify-content-between\">\n        <span class=\"fa fa-search\"></span>\n        <label for=\"search-field\"></label>\n        <input id=\"search-field\" name=\"search-field\" type=\"text\" value=\"\" placeholder=\"type a team's name\" class=\"search float-left\">\n      </form>\n\n    </div>\n\n    <a class=\"list-group-item\"\n      *ngFor=\"let context of contextualComm | async; let i = index;\"\n       routerLink=\"{{context.name | lowercase}}\" routerLinkActive=\"active\">\n      <i class=\"fa fa-{{context.icon}}\"></i><span class=\"title\">{{context.name}}</span>\n    </a>\n\n  </div>\n\n<!--\n\t<ngb-accordion class=\"context-menu\" #acc=\"ngbAccordion\" activeIds=\"form\" (panelChange)=\"beforeChange($event)\">\n\n\t\t<ngb-panel id=\"form\">\n\n\t\t\t<ng-template ngbPanelContent>\n\t\t\t\t<div class=\"search-bar\">\n\n\t\t\t\t\t<form class=\"filter\">\n            <span class=\"fa fa-search\"></span>\n            <label for=\"search-field\"></label>\n\t\t\t\t\t\t<input id=\"search-field\" name=\"search-field\" type=\"text\" value=\"\" placeholder=\"type a team's name\" class=\"search float-left\">\n\t\t\t\t\t</form>\n\n\t\t\t\t</div>\n\t\t\t</ng-template>\n\n\t\t</ngb-panel>\n\n\t\t<ngb-panel *ngFor=\"let context of contextualComm | async; let i = index;\">\n\n\t\t\t<ng-template ngbPanelTitle>\n\t\t\t\t<span class=\"fa fa-angle-down float-right\"></span>\n\t\t\t\t<a class=\"title\" routerLink=\"{{context.name | lowercase}}\" routerLinkActive=\"active\"><i class=\"fa fa-{{context.icon}}\"></i>{{context.name}}</a>\n\t\t\t</ng-template>\n\n\t\t\t<ng-template ngbPanelContent>\n\n\t\t\t\t<ul>\n\t\t\t\t\t\t<li [hidden]=\"sub.name.includes('@')\" *ngFor=\"let sub of context.contexts\">\n\t\t\t\t\t\t\t<a class=\"sub-level\" routerLink=\"{{context.name | lowercase}}/{{sub.name | lowercase}}\" routerLinkActive=\"active\">{{sub.name}}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\n\t\t\t</ng-template>\n\t\t</ngb-panel>\n\t</ngb-accordion> -->\n\n\t<add-contextualcomm-view></add-contextualcomm-view>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/contextMenu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContextMenuComponent = /** @class */ (function () {
    function ContextMenuComponent(contextualCommDataService) {
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'mp-menu';
        this.contextualComm = this.contextualCommDataService.getContexts();
    }
    ContextMenuComponent.prototype.beforeChange = function ($event) {
        if ($event.panelId === 'form' && $event.nextState === false) {
            $event.preventDefault();
        }
    };
    ;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContextMenuComponent.prototype, "hostClass", void 0);
    ContextMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'context-menu',
            template: __webpack_require__("../../../../../src/app/views/contextualCommMenu/contextMenu.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_services__["h" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_services__["h" /* ContextualCommDataService */]) === "function" && _a || Object])
    ], ContextMenuComponent);
    return ContextMenuComponent;
    var _a;
}());

//# sourceMappingURL=contextMenu.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/remove-contextualComm.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">DELETE {{context.name}}?</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n     <p>Do you really want to <b>delete</b> the {{context.name}} context?</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"c('no')\">No</button>\n    <button type=\"button\" class=\"btn btn-success\" (click)=\"c('yes')\">Yes</button>\n  </div>\n</ng-template>\n\n<a href=\"javascript:;\" title=\"Delete the {{context.name}}\" (click)=\"open(content)\" class=\"remove float-right\"><i class=\"fa fa-remove\"></i></a>\n\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommMenu/remove-contextualComm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoveContextualCommComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_app_models__ = __webpack_require__("../../../../../src/app/models/app.models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RemoveContextualCommComponent = /** @class */ (function () {
    function RemoveContextualCommComponent(modalService) {
        this.modalService = modalService;
        this.removeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
    }
    RemoveContextualCommComponent.prototype.open = function (content) {
        var _this = this;
        var numOfAtomic = this.context.contexts.filter(function (context) { return context.id.includes('@'); }).length;
        var numOfComposite = this.context.contexts.length - numOfAtomic;
        var isMainContext = (this.context.parent.length === 0);
        console.log(numOfAtomic, numOfComposite, isMainContext);
        if (numOfComposite > 0 && isMainContext) {
            this.removeEvent.emit({
                type: __WEBPACK_IMPORTED_MODULE_3__models_app_models__["a" /* RemoveContextEventType */].Error,
                context: this.context,
                reason: 'You can\'t remove a context which contains sub contexts'
            });
            return false;
        }
        this.modalService.open(content).result.then(function (result) {
            if (result === 'yes') {
                _this.removeEvent.emit({
                    type: __WEBPACK_IMPORTED_MODULE_3__models_app_models__["a" /* RemoveContextEventType */].Remove,
                    context: _this.context
                });
            }
            else {
                _this.removeEvent.emit({
                    type: __WEBPACK_IMPORTED_MODULE_3__models_app_models__["a" /* RemoveContextEventType */].Dismissed,
                    reason: _this.getDismissReason(result)
                });
            }
        }, function (reason) {
            _this.removeEvent.emit({
                type: __WEBPACK_IMPORTED_MODULE_3__models_app_models__["a" /* RemoveContextEventType */].Dismissed,
                reason: _this.getDismissReason(reason)
            });
        });
    };
    RemoveContextualCommComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    RemoveContextualCommComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], RemoveContextualCommComponent.prototype, "modalTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models_models__["a" /* ContextualComm */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_models__["a" /* ContextualComm */]) === "function" && _a || Object)
    ], RemoveContextualCommComponent.prototype, "context", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
    ], RemoveContextualCommComponent.prototype, "removeEvent", void 0);
    RemoveContextualCommComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'remove-contextualcomm-view',
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
            template: __webpack_require__("../../../../../src/app/views/contextualCommMenu/remove-contextualComm.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _c || Object])
    ], RemoveContextualCommComponent);
    return RemoveContextualCommComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=remove-contextualComm.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommUsers/add-user.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #addUserContent let-c=\"close\" let-d=\"dismiss\">\n\n  <div class=\"row justify-content-md-center add-user-view fade {{ready ? 'visible' : ''}}\">\n    <div class=\"col-12\">\n\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"modalTitle\"></h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n\n      <div class=\"modal-body row\">\n\n        <div class=\"col-sm-12 col-md-6\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"addUserTitle\">Add User</h5>\n          </div>\n\n          <ng-template #rt let-user=\"result\" let-t=\"term\">\n            <user-identity [model]=\"user\"></user-identity>\n          </ng-template>\n\n          <div class=\"form-group search-group\">\n            <div class=\"input-group\">\n              <input id=\"typeahead-template\" type=\"text\" class=\"form-control\" placeholder=\"Search users\"\n                [inputFormatter]=\"formatter\"\n                [(ngModel)]=\"searchResultModel\" [ngbTypeahead]=\"search\" [resultTemplate]=\"rt\" />\n              <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n            </div>\n          </div>\n\n          <ngb-progressbar [style.display]=\"!busy ? 'none' : 'block'\" type=\"info\" [value]=\"100\" [striped]=\"true\" [animated]=\"true\"><i>Inviting</i></ngb-progressbar>\n\n          <div class=\"fx-login-submit\">\n            <button class=\"btn btn-success\" [disabled]=\"busy\" type=\"submit\" (click)=\"addUser()\">Add user</button>\n          </div>\n\n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"inviteUserTitle\">Invite Users</h5>\n          </div>\n\n          <form class=\"invite\" #inviteForm (submit)=\"submitEvent(inviteForm.value)\">\n\n            <div class=\"form-group\">\n              <input type=\"text\" [disabled]=\"busy\" [(ngModel)]=\"model.email\" ngControl=\"email\" name=\"email\"\n              class=\"form-control\" placeholder=\"someone@mail.com\" required>\n            </div>\n\n            <div class=\"form-group\">\n              <input type=\"text\" [disabled]=\"busy\" [(ngModel)]=\"model.domain\" ngControl=\"domain\" name=\"domain\"\n                class=\"form-control\" placeholder=\"some.domain.com\" required>\n            </div>\n\n            <ngb-progressbar [style.display]=\"!busy ? 'none' : 'block'\" type=\"info\" [value]=\"100\" [striped]=\"true\" [animated]=\"true\"><i>Inviting</i></ngb-progressbar>\n\n            <div class=\"fx-login-submit\">\n              <button class=\"btn btn-success\" [disabled]=\"busy\" type=\"submit\">Invite</button>\n            </div>\n          </form>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n</ng-template>\n\n\n<!-- Add contact button -->\n<a href=\"javascript:;\" class=\"float-left\" (click)=\"open(addUserContent)\">\n  <i class=\"fa fa-plus-circle\"></i>Add Contact\n</a>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommUsers/add-user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_notification_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// config

// Bootstrap

// Utils

// Services



var searchResult;
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(router, modalService, chatService, contactService, notificationsService, contextualCommDataService) {
        this.router = router;
        this.modalService = modalService;
        this.chatService = chatService;
        this.contactService = contactService;
        this.notificationsService = notificationsService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'add-user-action';
        this.closeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.inviteEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.contactClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.model = { email: '', domain: '' };
        this.busy = false;
        this.ready = false;
        this.formatter = function (user) { return user.username; };
    }
    AddUserComponent.prototype.ngOnInit = function () {
        this.contactList = this.contactService.getUsers();
        this.contactList.subscribe(function (contacts) {
            console.log('Contacts:', contacts);
            searchResult = contacts;
        });
    };
    AddUserComponent.prototype.search = function (text$) {
        return text$
            .distinctUntilChanged()
            .map(function (term) { return term.length < 2 ?
            [] :
            searchResult.filter(function (v) {
                console.log(v, term);
                return v.username.toLowerCase().indexOf(term.toLowerCase()) > -1;
            }).slice(0, 10); });
    };
    AddUserComponent.prototype.open = function (content) {
        var _this = this;
        this.ready = true;
        this.busy = false;
        this.modalService.open(content, { backdrop: false, windowClass: 'custom-modal' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    AddUserComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    AddUserComponent.prototype.addUser = function () {
        this.busy = true;
        console.log('THIS:', this.searchResultModel);
        if (this.searchResultModel && this.searchResultModel.username) {
            this._invite({
                email: this.searchResultModel.username,
                domain: this.searchResultModel.domain
            });
            this.searchResultModel;
        }
    };
    AddUserComponent.prototype.submitEvent = function () {
        // this.inviteEvent.emit( JSON.parse(JSON.stringify(this.model)) );
        this.busy = true;
        this._invite({
            email: this.model.email,
            domain: this.model.domain
        });
    };
    AddUserComponent.prototype._invite = function (data) {
        var _this = this;
        var path = this.router.url;
        var normalizedName = Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["g" /* normalizeName */])(path);
        var parentNameId = '';
        console.log('[Add User Component] - parent: ', normalizedName, this.chatService.activeDataObjectURL);
        parentNameId = normalizedName.parent;
        if (!parentNameId) {
            parentNameId = normalizedName.id;
        }
        this.contextualCommDataService.getContextById(parentNameId).subscribe(function (context) {
            var parentURL = context.url;
            var currentURL = _this.chatService.activeDataObjectURL;
            var parentChat = _this.chatService.invite(parentURL, [data.email], [data.domain || __WEBPACK_IMPORTED_MODULE_4__config__["a" /* config */].domain]);
            var currentChat;
            if (parentURL !== currentURL || !Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["d" /* isALegacyUser */])(data.email)) {
                currentChat = _this.chatService.invite(currentURL, [data.email], [data.domain || __WEBPACK_IMPORTED_MODULE_4__config__["a" /* config */].domain]);
            }
            console.log('[Add User Component] - invite: ', data);
            console.log('[Add User Component] - invite: ', parentURL, currentURL);
            console.log('[Add User Component] - invite: ', parentChat, currentChat);
            parentChat.then(function (parentController) {
                console.log('[Add User Component] - parent controller:', parentController);
                console.log('[Add User Component] - check controllers: ', parentController, currentURL, parentController.url === currentURL);
                if (!currentChat) {
                    return parentController;
                }
                return currentChat;
            }).then(function (currentController) {
                if (!Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["d" /* isALegacyUser */])(data.email)) {
                    console.log('[Add User Component] - current controller', currentController);
                    var normalizedPath = Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["f" /* normalizeFromURL */])(path + '/user/' + data.email, _this.contactService.sessionUser.username);
                    var normalizedUserName = Object(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["g" /* normalizeName */])(normalizedPath);
                    console.log('[Add User Component] - normalized name: ', normalizedUserName);
                    return _this.contextualCommDataService.createAtomicContext(data.email, normalizedUserName.name, normalizedUserName.id, normalizedUserName.parent);
                }
            }).then(function (childController) {
                console.log('[Add User Component] - one to one controller', childController);
                _this.busy = false;
                _this.clean();
            }).catch(function (reason) { _this.errorNotificateSystem(reason); });
        }, function (reason) {
            _this.errorNotificateSystem(reason);
        });
    };
    AddUserComponent.prototype.errorNotificateSystem = function (error) {
        console.log('ERROR:', error);
        this.notificationsService.error('Error', error, {
            showProgressBar: false,
            timeOut: 3000,
            pauseOnHover: false,
            haveActions: false
        });
        this.busy = false;
        this.clean();
    };
    AddUserComponent.prototype.clean = function () {
        this.model.email = '';
        this.model.domain = '';
        if (this.searchResultModel) {
            this.searchResultModel = null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], AddUserComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddUserComponent.prototype, "closeEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddUserComponent.prototype, "inviteEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddUserComponent.prototype, "contactClick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AddUserComponent.prototype, "busy", void 0);
    AddUserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-user-view',
            template: __webpack_require__("../../../../../src/app/views/contextualCommUsers/add-user.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["c" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9__services_services__["d" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_services__["d" /* ChatService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9__services_services__["f" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__services_services__["f" /* ContactService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__components_notification_notifications_module__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__components_notification_notifications_module__["NotificationsService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _f || Object])
    ], AddUserComponent);
    return AddUserComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=add-user.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/contextualCommUsers/contextualCommUsers.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Search contact input -->\n<div class=\"search-bar\">\n    <form class=\"filter\">\n        <span class=\"fa fa-search\"></span>\n        <input type=\"text\" placeholder=\"type a name\" class=\"search push-left\" (keyup)=\"onFilterKey($event)\">\n    </form>\n</div>\n\n<div class=\"sidebar-content\">\n\n  <div class=\"contexts float-left w-100 pb-3\">\n    <h4 class=\"title float-left\">Contexts</h4>\n\n    <add-contextualcomm-view *ngIf=\"allowAddUser\"></add-contextualcomm-view>\n\n    <ul class=\"context-list p-0\">\n      <li class=\"item p-0 m-0\" *ngFor=\"let context of contexts\">\n        <a class=\"link action\" title=\"Open {{context.name}} context\" [routerLink]=\"[context.name]\" routerLinkActive=\"active\">\n          <i *ngIf=\"context.icon\" class=\"fa fa-{{context.icon}}\"></i>\n          <span class=\"name\">{{context.name}}</span>\n        </a>\n\n        <remove-contextualcomm-view *ngIf=\"allowAddUser\" (removeEvent)=\"removeContext($event, context)\" [context]=\"context\"></remove-contextualcomm-view>\n\n      </li>\n    </ul>\n  </div>\n\n  <div class=\"users float-left w-100 pb-3 pt-3\">\n    <h4 class=\"title float-left\">Users</h4>\n\n    <add-user-view *ngIf=\"allowAddUser\"></add-user-view>\n\n    <ul class=\"contact-list\">\n      <!-- List of ContactComponent -->\n      <li class=\"item m-0\" *ngFor=\"let contact of contactsFilter | async\">\n        <a class=\"link\" [routerLink]=\"[this.basePath, 'user', contact.username]\" routerLinkActive=\"active\">\n\n          <user-identity *ngIf=\"contact\" [model]=contact></user-identity>\n\n          <div *ngIf=\"contact.unread\" class=\"alert\">\n              <span class=\"new-message\">{{contact.unread}}</span>\n              <i class=\"fa fa-comment-o\"></i>\n          </div>\n          <div class=\"pointer\">\n              <span class=\"action chat\"><i class=\"fa fa-angle-right\"></i></span>\n          </div>\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<footer class=\"alt-foot\">\n    Copyright 2016 © Altice Labs - All rights reserved\n</footer>\n"

/***/ }),

/***/ "../../../../../src/app/views/contextualCommUsers/contextualCommUsers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextualCommUsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_notification_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/notifications.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_app_models__ = __webpack_require__("../../../../../src/app/models/app.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_directive_module__ = __webpack_require__("../../../../../src/app/shared/directive.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_utils__ = __webpack_require__("../../../../../src/app/utils/utils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// configs

// Services



// Directives


var ContextualCommUsersComponent = /** @class */ (function () {
    function ContextualCommUsersComponent(router, route, notificationsService, contextualCommDataService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.notificationsService = notificationsService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'context-user-view d-flex flex-column justify-content-between';
        this.contactClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.contactAdd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.contactsFilter = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]();
        this.hide = true;
        this.basePath = this.router.url;
        this.events = this.router.events.subscribe(function (navigation) {
            console.log('[ContextualCommUsers] - ', navigation);
            if (navigation instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]) {
                var url = navigation.url;
                if (url.includes('@')) {
                    url = url.substr(0, url.lastIndexOf('/'));
                }
                _this.basePath = url;
            }
            if (navigation instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationError */]) {
                _this.notificationsService.error('Error', navigation.error, {
                    showProgressBar: false,
                    timeOut: 3000,
                    pauseOnHover: false,
                    haveActions: false
                });
            }
        });
        this.paramsObserver = this.route.params.subscribe(function (params) {
            console.log('[ContextualCommUsers] - params:', params);
            var context = params['context'];
            var id = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].appPrefix + '/' + context;
            _this.rootContext = context;
            _this.contextSubscription = _this.contextualCommDataService.getContextTask(id)
                .subscribe(function (contexts) {
                console.log('[ContextualCommUsers] - contexts: ', contexts);
                _this.contexts = contexts;
            });
        });
        console.log('[ContextualCommUsers - constructor]', this.router, this.router.url);
    }
    // Load data ones componet is ready
    ContextualCommUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUsers = this.users.subscribe(function (users) {
            console.log('[contextualCommUsers - subscribe]', users);
            _this.filter('');
        });
        console.log('[contextualCommUsers - ngOnInit]', this.currentUsers);
    };
    ContextualCommUsersComponent.prototype.ngOnDestroy = function () {
        this.currentUsers.unsubscribe();
        this.events.unsubscribe();
        this.paramsObserver.unsubscribe();
        this.contextSubscription.unsubscribe();
        console.log('[contextualCommUsers - ngOnDestroy]', this.events, this.paramsObserver);
    };
    ContextualCommUsersComponent.prototype.onFilterKey = function (event) {
        this.filter(event.target.value);
    };
    ContextualCommUsersComponent.prototype.filter = function (value) {
        this.contactsFilter = this.users.map(function (users) {
            console.log('[contextualCommUsers - filter]:', users, value);
            return users.filter(function (user) {
                console.log('[contextualCommUsers - filter]:', user, value);
                return user.cn.includes(value);
            });
        });
    };
    ContextualCommUsersComponent.prototype.onCloseSidebarEvent = function ($event) {
        // TODO: try to put this code in Sidebar Directive
        // TODO: i tried but i can't do it;
        var element = document.getElementById('sidebar');
        if (element.classList.contains('opened')) {
            element.classList.remove('opened');
        }
        else {
            element.classList.add('opened');
        }
    };
    ContextualCommUsersComponent.prototype.removeContext = function (event, context) {
        var _this = this;
        console.log('Context to be removed: ', event, context);
        var contextPathObj = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["g" /* normalizeName */])(context.id);
        if (event.type === __WEBPACK_IMPORTED_MODULE_6__models_app_models__["a" /* RemoveContextEventType */].Remove) {
            this.contextualCommDataService.removeContext(event.context)
                .subscribe(function (result) {
                console.log('Success:', result);
                console.log('Context Remove Path:', _this.basePath);
                var basePathObj = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["g" /* normalizeName */])(_this.basePath);
                if (contextPathObj.id === basePathObj.id) {
                    var parent = Object(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["i" /* splitFromURL */])(basePathObj.id);
                    console.log('Context Remove Path: ', parent);
                    _this.router.navigate([parent.context]);
                }
                console.log('Context Remove Path:', contextPathObj, basePathObj);
            }, function (error) {
                _this.notificationsService.error('Error removing context', error);
            });
        }
        if (event.type === __WEBPACK_IMPORTED_MODULE_6__models_app_models__["a" /* RemoveContextEventType */].Error) {
            this.notificationsService.error('Error removing context', event.reason);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7__shared_directive_module__["c" /* SidebarDirective */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__shared_directive_module__["c" /* SidebarDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_directive_module__["c" /* SidebarDirective */]) === "function" && _a || Object)
    ], ContextualCommUsersComponent.prototype, "sidebar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "contactClick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "contactAdd", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]) === "function" && _b || Object)
    ], ContextualCommUsersComponent.prototype, "users", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ContextualCommUsersComponent.prototype, "allowAddUser", void 0);
    ContextualCommUsersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'context-user-view',
            template: __webpack_require__("../../../../../src/app/views/contextualCommUsers/contextualCommUsers.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__components_notification_notifications_module__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__components_notification_notifications_module__["NotificationsService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _f || Object])
    ], ContextualCommUsersComponent);
    return ContextualCommUsersComponent;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=contextualCommUsers.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\n  <div class=\"content-panel\">\n\n    <div class=\"pt-3 pb-3\">\n      <h2>Dashboard</h2>\n\n      <div class=\"pt-3 row\">\n\n        <div class=\"col-12 col-sm-6\">\n          <h3>Contexts List</h3>\n\n          <div class=\"pt-3 pb-3\">\n            <a class=\"btn btn-outline-primary\" href=\"javascript:;\" (click)=\"onCreateEvent()\"><strong>new context</strong></a>\n          </div>\n\n          <div class=\"list-group\">\n\n            <div class=\"list-group-item d-flex justify-content-between align-items-center\" *ngFor=\"let context of contextualComms | async;\">\n              <a routerLink=\"{{context.name | lowercase}}\" routerLinkActive=\"active\">\n                <i *ngIf=\"context.icon\" class=\"pr-3 fa fa-{{context.icon}}\"></i>{{context.name}}\n              </a>\n\n              <span class=\"badge badge-default badge-pill\">{{context.contexts.length}}</span>\n\n              <remove-contextualcomm-view *ngIf=\"context.reporter\" (removeEvent)=\"removeContext($event, context)\" [context]=\"context\"></remove-contextualcomm-view>\n            </div>\n\n<!--            <div class=\"list-group\" *ngFor=\"let item of context.contexts;\">\n              <div class=\"list-group-item justify-content-between\">\n                <a routerLink=\"{{context.name}}/{{item.name | lowercase}}\" routerLinkActive=\"active\">\n                  <i *ngIf=\"item.icon\" class=\"pr-3 fa fa-{{item.icon}}\"></i>{{item.name}}\n                </a>\n              </div>\n            </div>-->\n\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_app_models__ = __webpack_require__("../../../../../src/app/models/app.models.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_contextualCommData_service__ = __webpack_require__("../../../../../src/app/services/contextualCommData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_notification_notifications_module__ = __webpack_require__("../../../../../src/app/components/notification/notifications.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Services



var HomeComponent = /** @class */ (function () {
    function HomeComponent(route, rethinkService, triggerActionService, notificationsService, contextualCommDataService) {
        this.route = route;
        this.rethinkService = rethinkService;
        this.triggerActionService = triggerActionService;
        this.notificationsService = notificationsService;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'home-view col';
    }
    // Load data ones componet is ready
    HomeComponent.prototype.ngOnInit = function () {
        this.contextualComms = this.contextualCommDataService.getContexts();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        if (this.removeContextSubscription) {
            this.removeContextSubscription.unsubscribe();
        }
    };
    HomeComponent.prototype.onCreateEvent = function () {
        this.triggerActionService.trigger(__WEBPACK_IMPORTED_MODULE_2__models_app_models__["b" /* TriggerActions */].OpenContextMenuCreator);
    };
    HomeComponent.prototype.removeContext = function (event, context) {
        var _this = this;
        console.log('Context to be removed: ', event, context);
        if (event.type === __WEBPACK_IMPORTED_MODULE_2__models_app_models__["a" /* RemoveContextEventType */].Remove) {
            this.removeContextSubscription = this.contextualCommDataService.removeContext(event.context)
                .subscribe(function (result) { console.log('Success:', result); }, function (error) {
                _this.notificationsService.error('Error removing context', error);
            });
        }
        if (event.type === __WEBPACK_IMPORTED_MODULE_2__models_app_models__["a" /* RemoveContextEventType */].Error) {
            this.notificationsService.error('Error removing context', event.reason);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "hostClass", void 0);
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'home-view',
            template: __webpack_require__("../../../../../src/app/views/home/home.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["j" /* RethinkService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["j" /* RethinkService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["k" /* TriggerActionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["k" /* TriggerActionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__components_notification_notifications_module__["NotificationsService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_notification_notifications_module__["NotificationsService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_contextualCommData_service__["a" /* ContextualCommDataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_contextualCommData_service__["a" /* ContextualCommDataService */]) === "function" && _e || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Loading spinner when wait for the auth and app be ready -->\n<div class=\"content-panel mx-auto text-center\">\n  <i class=\"fa fa-cog fa-spin fa-4x\"></i>\n  <span class=\"mt-2 d-block text-center\">{{ status }}</span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/loading/loading.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  height: 100%; }\n\n.content-panel {\n  height: auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/views/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
        this.hostClass = 'main-content d-flex flex-row align-items-center';
    }
    LoadingComponent.prototype.ngOnInit = function () {
        console.log('Status:', status);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], LoadingComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], LoadingComponent.prototype, "status", void 0);
    LoadingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'loading',
            template: __webpack_require__("../../../../../src/app/views/loading/loading.component.html"),
            styles: [__webpack_require__("../../../../../src/app/views/loading/loading.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/userView/contact-box.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"float-right\">\n  <span class=\"close\"><a href=\"javascript:;\" (click)=\"onCloseClick()\"><i class=\"fa fa-close\"></i></a></span>\n</div>\n\n<!-- TODO: Replace this for the user-identity view -->\n<div class=\"user-identity\">\n  <div class=\"user-status float-left\">\n    <img alt=\"{{user.avatar}}\" class=\"rounded-circle\" src=\"{{user.avatar}}\">\n    <span class=\"status {{user.status}}\">\n      <i class=\"fa fa-circle{{user.status === 'unavailable' ? '-o' : ''}}\"></i>\n    </span>\n  </div>\n  <div class=\"user-profile float-left\">\n    <h3 class=\"contact-name\">{{user.cn}}</h3>\n    <span class=\"extra-info\">{{user.domain}}</span>\n  </div>\n</div>\n<!-- END OF USER IDENTITY -->\n\n<div class=\"contact-me ml-3 mt-3\">\n  <span class=\"action audio\"><a (click)=\"makeAudioCall($event)\" [routerLink]=\"\" [queryParams]=\"{ action: 'audio' }\"><i class=\"fa fa-phone\"></i></a></span>\n  <span class=\"action video\"><a (click)=\"makeVideoCall($event)\" [routerLink]=\"\" [queryParams]=\"{ action: 'video' }\"><i class=\"fa fa-video-camera\"></i></a></span>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/views/userView/contact-box.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_models__ = __webpack_require__("../../../../../src/app/models/models.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactBoxComponent = /** @class */ (function () {
    function ContactBoxComponent() {
        // TODO: Use with the Bootstrap: user-identity contactbox p-4 col-12
        this.hostClass = 'contact-box float-left w-100';
        this.callEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.closeEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ContactBoxComponent.prototype.makeAudioCall = function (event) {
        this.callEvent.emit({
            type: 'audio',
            event: event
        });
    };
    ContactBoxComponent.prototype.makeVideoCall = function (event) {
        this.callEvent.emit({
            type: 'video',
            event: event
        });
    };
    ContactBoxComponent.prototype.onCloseClick = function () {
        this.closeEvent.emit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], ContactBoxComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_models__["d" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_models__["d" /* User */]) === "function" && _a || Object)
    ], ContactBoxComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContactBoxComponent.prototype, "callEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ContactBoxComponent.prototype, "closeEvent", void 0);
    ContactBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'contact-box',
            template: __webpack_require__("../../../../../src/app/views/userView/contact-box.component.html")
        })
    ], ContactBoxComponent);
    return ContactBoxComponent;
    var _a;
}());

//# sourceMappingURL=contact-box.component.js.map

/***/ }),

/***/ "../../../../../src/app/views/userView/user-view.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <media-view fullscreen [hidden]=\"action !== 'video' && action !== 'audio'\" [mode]=\"action\" [user]=\"user\"></media-view>-->\n<media-view (itIsReady)=\"mediaComponentReady($event)\" *ngIf=\"action === 'video' || action === 'audio'\" [mode]=\"action\" [user]=\"user\"></media-view>\n<contact-box *ngIf=\"!action\" [user]=\"user\" (callEvent)=\"onCallEvent($event)\" (closeEvent)=\"onCloseEvent()\"></contact-box>\n\n\n<div class=\"overflow-content w-100 h-100\">\n  <div class=\"row h-100 no-gutters\">\n    <div class=\"col-12 col-lg-7 h-100 v-scroll\">\n      <context-activity-list [messages]=\"messages\"></context-activity-list>\n    </div>\n\n    <div class=\"col-12 col-lg-5 h-100\">\n\n    </div>\n\n  </div>\n</div>\n\n\n<chat-view></chat-view>\n"

/***/ }),

/***/ "../../../../../src/app/views/userView/user-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_services__ = __webpack_require__("../../../../../src/app/services/services.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contextualCommActivity_contextualCommActivity_component__ = __webpack_require__("../../../../../src/app/views/contextualCommActivity/contextualCommActivity.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_rethink_communication_mediaCommunication_component__ = __webpack_require__("../../../../../src/app/components/rethink/communication/mediaCommunication.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_directive_module__ = __webpack_require__("../../../../../src/app/shared/directive.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Services

// Components



var UserViewComponent = /** @class */ (function () {
    function UserViewComponent(router, route, screen, contactService, contextualCommService, chatService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.screen = screen;
        this.contactService = contactService;
        this.contextualCommService = contextualCommService;
        this.chatService = chatService;
        this.hostClass = 'view-content d-flex flex-column';
        this.messages = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.paramsSubscription = this.route.queryParams.subscribe(function (event) {
            console.log('[User View] - router event change:', event, event['action']);
            _this.action = event['action'];
        });
    }
    UserViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.forEach(function (data) {
            console.log('Resolve data User: ', data.user);
            console.log('Resolve data Context: ', data.context);
            _this.user = data.user;
            _this.messages.next(data.context.messages);
        });
        this.currentContextSub = this.contextualCommService.currentContext().subscribe(function (contextualComm) {
            console.log('[User View - ContextualCommActivity Component - update] - ', contextualComm);
            _this.messages.next(contextualComm.messages);
        });
    };
    UserViewComponent.prototype.mediaComponentReady = function (event) {
        console.log('[User View] - media component: ', this.screen);
        if (this.screen.getEnvironment().name === 'xs') {
            var a = event.component;
            a.onFullscreen();
        }
    };
    UserViewComponent.prototype.ngAfterViewInit = function () {
        // console.log('[User View] - ViewInit: ', this.fullscreenDirective)
    };
    UserViewComponent.prototype.ngOnDestroy = function () {
        console.log('[User View] - OnDestroy', this.messages);
        this.currentContextSub.unsubscribe();
    };
    UserViewComponent.prototype.onCallEvent = function (event) {
        // this.mediaComponent.onFullscreen();
    };
    UserViewComponent.prototype.onAcceptCall = function () {
        console.log('[User View] - onAcceptCall');
    };
    UserViewComponent.prototype.onRejectCall = function () {
        console.log('[User View] - onRejectCall');
    };
    UserViewComponent.prototype.onCloseEvent = function () {
        var user = this.user.username;
        var url = this.router.url.replace('user/' + user, '');
        this.router.navigate([url], { relativeTo: this.route });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
        __metadata("design:type", Object)
    ], UserViewComponent.prototype, "hostClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__components_rethink_communication_mediaCommunication_component__["a" /* MediaCommunicationComponent */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__components_rethink_communication_mediaCommunication_component__["a" /* MediaCommunicationComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__components_rethink_communication_mediaCommunication_component__["a" /* MediaCommunicationComponent */]) === "function" && _a || Object)
    ], UserViewComponent.prototype, "mediaComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */]),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__contextualCommActivity_contextualCommActivity_component__["a" /* ContextualCommActivityComponent */]) === "function" && _b || Object)
    ], UserViewComponent.prototype, "contextualCommActivityComponent", void 0);
    UserViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-view',
            template: __webpack_require__("../../../../../src/app/views/userView/user-view.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__shared_directive_module__["b" /* ScreenDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_directive_module__["b" /* ScreenDirective */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["f" /* ContactService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["f" /* ContactService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["i" /* ContextualCommService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["i" /* ContextualCommService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__services_services__["d" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_services__["d" /* ChatService */]) === "function" && _h || Object])
    ], UserViewComponent);
    return UserViewComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=user-view.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    host: 'hysmart.rethink.ptinovacao.pt',
    images: '../assets/img',
    sounds: '../assets/sounds'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map