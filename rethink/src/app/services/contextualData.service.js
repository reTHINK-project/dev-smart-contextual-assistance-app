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
var context_service_1 = require('./rethink/context.service');
var ContextualDataService = (function () {
    function ContextualDataService(contextService) {
        this.contextService = contextService;
    }
    ContextualDataService.prototype.getMessages = function () {
        return this.contextService.getContextMessages('work');
    };
    ContextualDataService.prototype.getUsers = function () {
        return this.contextService.getContextUsers('work');
    };
    ContextualDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [context_service_1.ContextService])
    ], ContextualDataService);
    return ContextualDataService;
}());
exports.ContextualDataService = ContextualDataService;
//# sourceMappingURL=contextualData.service.js.map