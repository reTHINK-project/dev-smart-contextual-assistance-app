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
// Services
var services_1 = require("../../services/services");
var ContextualCommUsersComponent = (function () {
    function ContextualCommUsersComponent(router, route, appService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.appService = appService;
        this.hostClass = 'context-user-view contactlist all-100';
        this.contactClick = new core_1.EventEmitter();
        this.contactAdd = new core_1.EventEmitter();
        this.hide = true;
        this.basePath = this.router.url;
        this.router.events.subscribe(function (navigation) {
            console.log('[ContextualCommUsers] - ', navigation);
            if (navigation instanceof router_1.NavigationEnd) {
                var url = navigation.url;
                if (url.includes('@')) {
                    url = url.substr(0, url.lastIndexOf('/'));
                }
                _this.basePath = url;
            }
        });
        console.log('[ContextualCommUsers - constructor]', this.router, this.router.url);
    }
    // Load data ones componet is ready
    ContextualCommUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('[contextualCommUsers - ngOnInit]', this.users);
        this.users.subscribe(function (users) {
            _this.filter('');
        });
    };
    ContextualCommUsersComponent.prototype.ngAfterViewInit = function () {
        console.log('[contextualCommUsers - ngAfterViewInit]', this.users);
    };
    ContextualCommUsersComponent.prototype.onFilterKey = function (event) {
        this.filter(event.target.value);
    };
    ContextualCommUsersComponent.prototype.filter = function (value) {
        this.contactsFilter = this.users.map(function (users) {
            return users.filter(function (user) {
                console.log(user);
                return user.cn.includes(value);
            });
        });
    };
    return ContextualCommUsersComponent;
}());
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
    __metadata("design:type", Observable_1.Observable)
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
        services_1.RethinkService])
], ContextualCommUsersComponent);
exports.ContextualCommUsersComponent = ContextualCommUsersComponent;
//# sourceMappingURL=contextualCommUsers.component.js.map