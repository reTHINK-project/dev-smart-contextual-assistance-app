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
var Subject_1 = require("rxjs/Subject");
// utils
var utils_1 = require("../utils/utils");
// Services
var storage_service_1 = require("./storage.service");
// Interfaces
var HypertyResource_1 = require("../models/rethink/HypertyResource");
var models_1 = require("../models/models");
var ContextualCommTriggerService = (function () {
    function ContextualCommTriggerService(localStorage) {
        this.localStorage = localStorage;
        this.cxtTrigger = new Map();
        this._contextualCommTriggerUpdate = new Subject_1.Subject();
        this._contextualCommTrigger = new Subject_1.Subject();
        // Temporary data for initial contexts;
        this.work = {
            contextName: 'Work',
            contextResource: [HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.chat],
            contextScheme: '',
            values: [],
            trigger: [],
            icon: 'briefcase'
        };
        this.fitness = {
            contextName: 'Fitness',
            contextResource: [HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.chat],
            contextScheme: '',
            values: [],
            trigger: [],
            icon: 'heartbeat'
        };
        this.school = {
            contextName: 'School',
            contextResource: [HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.chat],
            contextScheme: '',
            values: [],
            trigger: [],
            icon: 'heart'
        };
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
            for (var _i = 0, _a = Object.keys(mapObj); _i < _a.length; _i++) {
                var k = _a[_i];
                var currentTrigger = new models_1.ContextualCommTrigger(mapObj[k]);
                console.log('[ContextualCommTriggerService - storage]', mapObj[k], currentTrigger);
                this.cxtTrigger.set(k, currentTrigger);
                this._contextualCommTrigger.next(currentTrigger);
            }
        }
        else {
            this._contextualCommTrigger.next(this.work);
            this._contextualCommTrigger.next(this.fitness);
            this._contextualCommTrigger.next(this.school);
        }
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
                    contextResource: [HypertyResource_1.HypertyResourceType.video, HypertyResource_1.HypertyResourceType.audio, HypertyResource_1.HypertyResourceType.chat],
                    values: [],
                    trigger: []
                };
                contextTrigger = new models_1.ContextualCommTrigger(context);
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
        this.localStorage.setObject('context-triggers', utils_1.strMapToObj(this.cxtTrigger));
        console.info('[ContextualCommTriggerService - updateContextTrigger]', name, contextTrigger);
        this._contextualCommTrigger.next(contextTrigger);
    };
    ContextualCommTriggerService.prototype.getContextualCommTriggers = function () {
        return this._contextualCommTriggerList;
    };
    return ContextualCommTriggerService;
}());
ContextualCommTriggerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [storage_service_1.LocalStorage])
], ContextualCommTriggerService);
exports.ContextualCommTriggerService = ContextualCommTriggerService;
//# sourceMappingURL=contextualCommTrigger.service.js.map