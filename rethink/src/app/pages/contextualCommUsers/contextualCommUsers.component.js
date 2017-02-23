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
var Observable_1 = require('rxjs/Observable');
// Services
var services_1 = require('../../services/services');
var ContextualCommUsersComponent = (function () {
    function ContextualCommUsersComponent(route, appService) {
        this.route = route;
        this.appService = appService;
        this.hostClass = 'context-user-view contactlist all-100';
        this.contactClick = new core_1.EventEmitter();
        this.contactAdd = new core_1.EventEmitter();
    }
    // Load data ones componet is ready
    ContextualCommUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('[contextualCommUsers - ngOnInit]', this.model);
        this.model.subscribe(function (users) {
            _this.filter('');
        });
    };
    ContextualCommUsersComponent.prototype.onContactClick = function (model) {
        console.log('aaa', model);
    };
    ContextualCommUsersComponent.prototype.onFilterKey = function (event) {
        this.filter(event.target.value);
    };
    ContextualCommUsersComponent.prototype.filter = function (value) {
        this.contactsFilter = this.model.map(function (users) {
            return users.filter(function (user) {
                return user.cn.includes(value);
            });
        });
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], ContextualCommUsersComponent.prototype, "hostClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContextualCommUsersComponent.prototype, "contactClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContextualCommUsersComponent.prototype, "contactAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], ContextualCommUsersComponent.prototype, "model", void 0);
    ContextualCommUsersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ul[context-user-view]',
            templateUrl: './contextualCommUsers.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, services_1.RethinkService])
    ], ContextualCommUsersComponent);
    return ContextualCommUsersComponent;
}());
exports.ContextualCommUsersComponent = ContextualCommUsersComponent;
//# sourceMappingURL=contextualCommUsers.component.js.map