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
// Core
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/map');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/publishReplay');
// utils
var utils_1 = require('../utils/utils');
// Interfaces
var models_1 = require('../models/models');
// Services
var storage_service_1 = require('./storage.service');
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
        var anonimous = new models_1.User({});
        if (this.localStorage.hasObject('contacts')) {
            var mapObj = this.localStorage.getObject('contacts');
            for (var _i = 0, _a = Object.keys(mapObj); _i < _a.length; _i++) {
                var k = _a[_i];
                this._userList.set(k, new models_1.User(mapObj[k]));
            }
        }
        this._users = this._updates
            .scan(function (users, user) {
            return users.concat(user);
        }, [])
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
            return user;
        }).subscribe(this._updates);
        this._newUser.subscribe(this._create);
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
        this._newUser.next(user);
    };
    ContactService.prototype.updateUser = function (user, property, value) {
    };
    ContactService.prototype.removeUser = function () {
    };
    ContactService.prototype.getUsers = function () {
        return this._users;
    };
    ContactService.prototype.getUser = function (userURL) {
        console.log('[Contact Service - get user: ', this._userList, userURL);
        return this._userList.get(userURL);
    };
    ContactService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.LocalStorage])
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map