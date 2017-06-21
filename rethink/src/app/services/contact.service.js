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
Object.defineProperty(exports, "__esModule", { value: true });
// Core
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/scan");
require("rxjs/add/operator/publishReplay");
// utils
var utils_1 = require("../utils/utils");
// Interfaces
var models_1 = require("../models/models");
// Services
var storage_service_1 = require("./storage.service");
var ContactService = (function () {
    function ContactService(localStorage) {
        var _this = this;
        this.localStorage = localStorage;
        this._userList = new Map();
        // action streams
        this._create = new Subject_1.Subject();
        // `updates` receives _operations_ to be applied to our `users`
        // it's a way we can perform changes on *all* users (that are currently
        // stored in `users`)
        this._updates = new Subject_1.Subject();
        this._newUser = new Subject_1.Subject();
        var initialUsers = [];
        var me;
        if (this.localStorage.hasObject('me')) {
            me = this.localStorage.getObject('me');
        }
        if (this.localStorage.hasObject('contacts')) {
            var mapObj = this.localStorage.getObject('contacts');
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentUser = new models_1.User(mapObj[k]);
                    this._userList.set(k, currentUser);
                    if (currentUser.userURL !== me.userURL) {
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
                _this.localStorage.setObject('contacts', utils_1.strMapToObj(_this._userList));
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
        return this._users;
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
        return Observable_1.Observable.of(all);
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [storage_service_1.LocalStorage])
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map