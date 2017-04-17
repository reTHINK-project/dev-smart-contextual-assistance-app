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
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var runtime_browser_1 = require("runtime-browser");
var models_1 = require("../../models/models");
var contact_service_1 = require("../contact.service");
var RethinkService = (function () {
    function RethinkService(contactService) {
        this.contactService = contactService;
        this.domain = 'localhost';
        this.runtimeURL = 'https://catalogue.' + this.domain + '/.well-known/runtime/Runtime';
        this.config = { domain: this.domain, runtimeURL: this.runtimeURL, development: true };
        this.progress = new BehaviorSubject_1.BehaviorSubject('');
        this.status = new BehaviorSubject_1.BehaviorSubject(false);
    }
    Object.defineProperty(RethinkService.prototype, "setCurrentUser", {
        set: function (v) {
            this.currentUser = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RethinkService.prototype, "getCurrentUser", {
        get: function () {
            return this.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    RethinkService.prototype.loadRuntime = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('[Loading Rethink Runtime at] ', _this.config);
            runtime_browser_1.default.install(_this.config).then(function (runtime) {
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
                var myUser = new models_1.User(user);
                _this.setCurrentUser = myUser;
                _this.contactService.sessionUser = myUser;
                _this.contactService.addUser(myUser);
                console.info('Getting the registed user', myUser);
                resolve(myUser);
            }).catch(function (reason) {
                console.info('Error getting the register user, using fake information', reason);
                resolve(reason);
            });
        });
    };
    return RethinkService;
}());
RethinkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], RethinkService);
exports.RethinkService = RethinkService;
//# sourceMappingURL=rethink.service.js.map