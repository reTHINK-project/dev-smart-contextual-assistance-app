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
    // Temporary data for initial contexts;
    // private work: ContextualCommTrigger = {
    //   contextName: 'Work',
    //   contextResource: [HypertyResourceType.audio, HypertyResourceType.video, HypertyResourceType.chat],
    //   contextScheme: '',
    //   values: [],
    //   trigger: [],
    //   icon: 'briefcase'
    // };
    function ContextualCommTriggerService(localStorage) {
        this.localStorage = localStorage;
        this.cxtTrigger = new Map();
        this._contextualCommTriggerUpdate = new Subject_1.Subject();
        this._contextualCommTrigger = new Subject_1.Subject();
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
            try {
                for (var _a = __values(Object.keys(mapObj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    var currentTrigger = new models_1.ContextualCommTrigger(mapObj[k]);
                    console.log('[ContextualCommTriggerService - storage]', mapObj[k], currentTrigger);
                    this.cxtTrigger.set(k, currentTrigger);
                    this._contextualCommTrigger.next(currentTrigger);
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
        else {
            // this._contextualCommTrigger.next(this.work);
            // this._contextualCommTrigger.next(this.fitness);
            // this._contextualCommTrigger.next(this.school);
            // this.cxtTrigger.set(this.work.contextName, this.work);
            // this.cxtTrigger.set(this.fitness.contextName, this.fitness);
            // this.cxtTrigger.set(this.school.contextName, this.school);
        }
        var e_1, _c;
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
                    contextResource: [HypertyResource_1.HypertyResourceType.Video, HypertyResource_1.HypertyResourceType.Audio, HypertyResource_1.HypertyResourceType.Chat],
                    values: [],
                    trigger: []
                };
                contextTrigger = new models_1.ContextualCommTrigger(context);
                /*let contextValue:ContextValues = {
                  name: 'location',
                  unit: 'rad',
                  value: 0,
                  sum: 0
                }*/
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
    ContextualCommTriggerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [storage_service_1.LocalStorage])
    ], ContextualCommTriggerService);
    return ContextualCommTriggerService;
}());
exports.ContextualCommTriggerService = ContextualCommTriggerService;
//# sourceMappingURL=contextualCommTrigger.service.js.map