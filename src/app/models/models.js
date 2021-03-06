"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../app/config");
var User = (function () {
    function User(obj) {
        this.username = obj && obj.username;
        this.cn = obj && obj.cn;
        this.avatar = obj && obj.avatar;
        this.locale = obj && obj.locale;
        this.userURL = obj && obj.userURL;
        this.status = obj && obj.status || 'unavailable';
        this.unread = obj && obj.unread || 0;
        this.domain = obj && obj.domain || config_1.config.domain;
        this.identifiers = '';
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
            _this.status = event.data;
            console.log('[UserModel] Availability change', _this);
        });
    };
    return User;
}());
exports.User = User;
var Message = (function () {
    function Message(obj) {
        this.isRead = false;
        this.type = obj && obj.type;
        this.message = obj && obj.message;
        this.user = obj && obj.user;
        this.date = obj && obj.date || new Date().toISOString();
    }
    return Message;
}());
exports.Message = Message;
var ContextualComm = (function () {
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
    return ContextualComm;
}());
exports.ContextualComm = ContextualComm;
var ContextualCommTrigger = (function () {
    function ContextualCommTrigger(value) {
        Object.assign(this, value);
    }
    ;
    return ContextualCommTrigger;
}());
exports.ContextualCommTrigger = ContextualCommTrigger;
//# sourceMappingURL=models.js.map