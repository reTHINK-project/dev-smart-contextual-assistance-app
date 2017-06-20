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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// configs
var config_1 = require("../../config");
// Services
var contextualCommData_service_1 = require("../../services/contextualCommData.service");
var ContextualCommUsersComponent = (function () {
    function ContextualCommUsersComponent(router, route, contextualCommDataService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.contextualCommDataService = contextualCommDataService;
        this.hostClass = 'context-user-view d-flex flex-column justify-content-between';
        this.contactClick = new core_1.EventEmitter();
        this.contactAdd = new core_1.EventEmitter();
        this.contactsFilter = new Observable_1.Observable();
        this.hide = true;
        this.basePath = this.router.url;
        this.events = this.router.events.subscribe(function (navigation) {
            console.log('[ContextualCommUsers] - ', navigation);
            if (navigation instanceof router_1.NavigationEnd) {
                var url = navigation.url;
                if (url.includes('@')) {
                    url = url.substr(0, url.lastIndexOf('/'));
                }
                _this.basePath = url;
            }
        });
        this.paramsObserver = this.route.params.subscribe(function (params) {
            console.log('[ContextualCommUsers] - params:', params);
            var context = params['context'];
            var id = config_1.config.appPrefix + '/' + context;
            _this.rootContext = context;
            _this.contexts = _this.contextualCommDataService.getContextTask(id);
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
        console.log('[contextualCommUsers - ngOnDestroy]', this.events, this.paramsObserver);
    };
    ContextualCommUsersComponent.prototype.onFilterKey = function (event) {
        this.filter(event.target.value);
    };
    ContextualCommUsersComponent.prototype.filter = function (value) {
        this.contactsFilter = this.users.map(function (users) {
            console.log('[contextualCommUsers - filter]:', users);
            return users.filter(function (user) {
                console.log('[contextualCommUsers - filter]:', user);
                return user.cn.includes(value);
            });
        });
    };
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "contactClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ContextualCommUsersComponent.prototype, "contactAdd", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Subject_1.Subject)
    ], ContextualCommUsersComponent.prototype, "users", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextualCommUsersComponent.prototype, "allowAddUser", void 0);
    ContextualCommUsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'context-user-view',
            templateUrl: './contextualCommUsers.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            contextualCommData_service_1.ContextualCommDataService])
    ], ContextualCommUsersComponent);
    return ContextualCommUsersComponent;
}());
exports.ContextualCommUsersComponent = ContextualCommUsersComponent;
//# sourceMappingURL=contextualCommUsers.component.js.map