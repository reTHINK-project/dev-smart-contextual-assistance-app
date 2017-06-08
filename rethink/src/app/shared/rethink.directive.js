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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rethink_validator_1 = require("./rethink.validator");
var contextualCommData_service_1 = require("../services/contextualCommData.service");
/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NameValidator
 * @implements {Validator}
 */
var ContextNameValidatorDirective = (function () {
    function ContextNameValidatorDirective(contextualCommDataService) {
        this.contextualCommDataService = contextualCommDataService;
        this.valFn = rethink_validator_1.RethinkValidators.contextName(this.contextualCommDataService);
    }
    ContextNameValidatorDirective.prototype.ngOnChanges = function (changes) {
        var change = changes['name'];
        console.log(changes);
        if (change) {
            console.log('CHANGE:', change, name);
            this.valFn = rethink_validator_1.RethinkValidators.contextName(this.contextualCommDataService);
        }
    };
    ContextNameValidatorDirective.prototype.validate = function (control) {
        console.log('AQUI:', control);
        return this.valFn(control);
    };
    return ContextNameValidatorDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContextNameValidatorDirective.prototype, "name", void 0);
ContextNameValidatorDirective = __decorate([
    core_1.Directive({
        selector: '[exist]',
        providers: [{ provide: forms_1.NG_ASYNC_VALIDATORS, useExisting: rethink_validator_1.RethinkValidators, multi: true }]
    }),
    __metadata("design:paramtypes", [contextualCommData_service_1.ContextualCommDataService])
], ContextNameValidatorDirective);
exports.ContextNameValidatorDirective = ContextNameValidatorDirective;
//# sourceMappingURL=rethink.directive.js.map