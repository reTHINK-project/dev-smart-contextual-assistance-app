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
// Services
var rethink_service_1 = require("./rethink.service");
var ConnectorService = (function () {
    function ConnectorService(appService) {
        this.appService = appService;
        this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.appService.domain + '/.well-known/hyperty/Connector';
    }
    ConnectorService.prototype.getHyperty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.hypertyVideo) {
                _this.appService.getHyperty(_this.hypertyURL)
                    .then(function (hyperty) {
                    _this.hypertyVideo = hyperty.instance;
                    _this.hyperty = hyperty;
                    resolve(_this.hyperty);
                })
                    .catch(function (reason) {
                    console.error(reason);
                    reject(reason);
                });
            }
            else {
                resolve(_this.hyperty);
            }
        });
    };
    return ConnectorService;
}());
ConnectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rethink_service_1.RethinkService])
], ConnectorService);
exports.ConnectorService = ConnectorService;
//# sourceMappingURL=connector.service.js.map