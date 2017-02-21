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
var initialUsers = [
    { guid: 'id1', locale: '', domain: '', userURL: '', identifiers: '', cn: 'Rita Coelho', idp: 'google.com', status: 'online', avatar: 'img/avatar.jpg', username: 'openidtest20@gmail.com', unread: 1 },
    { guid: 'id2', locale: '', domain: '', userURL: '', identifiers: '', cn: 'Diogo Reis', idp: 'google.com', status: 'away', avatar: 'img/avatar-2.jpg', username: 'openidtest10@gmail.com', unread: 0 },
    { guid: 'id3', locale: '', domain: '', userURL: '', identifiers: '', cn: 'Rodrigo Castro', idp: 'google.com', status: 'offline', avatar: 'img/avatar-3.jpg', username: 'openidtest10@gmail.com', unread: 1 },
    { guid: 'id4', locale: '', domain: '', userURL: '', identifiers: '', cn: 'Martim Almeida', idp: 'google.com', status: 'online', avatar: 'img/avatar-4.jpg', username: 'openidtest20@gmail.com', unread: 5 },
    { guid: 'id5', locale: '', domain: '', userURL: 'user://gmail.com/openidtest20', identifiers: '', idp: 'google.com', cn: 'open id test 20', status: 'online', avatar: 'img/avatar.jpg', username: 'openidtest20@gmail.com', unread: 1 },
    { guid: 'id6', locale: '', domain: '', userURL: 'user://gmail.com/openidtest10', identifiers: '', idp: 'google.com', cn: 'open id test 10', status: 'away', avatar: 'img/avatar-2.jpg', username: 'openidtest10@gmail.com', unread: 2 },
];
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
        this._users = this._updates
            .scan(function (users, operation) {
            return operation(users);
        }, initialUsers)
            .publishReplay(1)
            .refCount();
        this._updates.subscribe({
            next: function (users) { return console.log('List of users:', users); }
        });
        this._create.map(function (user) {
            return function (users) {
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