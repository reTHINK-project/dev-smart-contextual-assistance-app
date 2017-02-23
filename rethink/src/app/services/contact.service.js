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
// Interfaces
var models_1 = require('../models/models');
// Services
var storage_service_1 = require('./storage.service');
var rethink_service_1 = require('./rethink/rethink.service');
var ContactService = (function () {
    function ContactService(localStorage, rethinkService) {
        this.localStorage = localStorage;
        this.rethinkService = rethinkService;
        // action streams
        this._create = new Subject_1.Subject();
        // `updates` receives _operations_ to be applied to our `users`
        // it's a way we can perform changes on *all* users (that are currently
        // stored in `users`)
        this._updates = new Subject_1.Subject();
        this._newUser = new Subject_1.Subject();
        var users;
        this._userList;
        if (this.localStorage.hasObject('contacts')) {
            users = this.localStorage.getObject('contacts');
            console.log('[Contacts Service -  constructor] - ', users);
            this._userList = new Map();
        }
        else {
            this._userList = new Map();
        }
        this._users = this._updates
            .scan(function (users, operation) {
            return operation(users);
        }, users)
            .publishReplay(1)
            .refCount();
        this._create.map(function (user) {
            var _this = this;
            return function (users) {
                if (!_this._userList.has(user.userURL)) {
                    _this._userList.set(user.userURL, new models_1.User(user));
                    _this.localStorage.setObject('contacts', _this._userList.toJSON());
                }
                console.log('[contact service - users]: - ', users, user);
                return users.concat(user);
            };
        }).subscribe(this._updates);
        this._newUser.subscribe(this._create);
    }
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
        this._userList.get(userURL);
        console.log('Get User includes:', userURL);
    };
    ContactService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.LocalStorage, rethink_service_1.RethinkService])
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map