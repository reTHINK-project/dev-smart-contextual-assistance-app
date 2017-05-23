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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
// Services
var rethink_service_1 = require("./rethink.service");
var UserAvailabilityService = (function () {
    /*private _onUserAdded: Function;
    private _onInvitation: Function;
    private _onMessage: Function;
    private _discovery: any;*/
    /*private _activeDataObjectURL: string;
    public get activeDataObjectURL(): string {
      return this._activeDataObjectURL;
    }
  
    public set activeDataObjectURL(value: string) {
      console.log('[Chat Service] - active controller:', value, this.controllerList);
      this._activeDataObjectURL = value;
      this.chatControllerActive = this.controllerList.get(value);
      console.info('[Chat Service] - active controller: ', this.chatControllerActive);
    }*/
    function UserAvailabilityService(router, route, rethinkService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.rethinkService = rethinkService;
        console.log('[UserAvailability Service - constructor] - ');
        this.hypertyURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityReporter';
        this.rethinkService.getHyperty(this.hypertyURL)
            .then(function (hyperty) {
            _this.myAvailabilityReporter = hyperty.instance;
            console.log('[UserAvailability Service - getHyperty] hyperty was instantiated ', _this.myAvailabilityReporter);
            //this._discovery = this.chatGroupManager.discovery;
            _this.hyperty = hyperty;
            _this.myAvailabilityReporter.start().then(function (availability) {
                _this.myAvailability = availability;
            });
        });
    }
    UserAvailabilityService.prototype.setStatus = function (status) {
        console.log('[UserAvailability service. setStatus]', status);
        this.myAvailabilityReporter.setStatus(status);
    };
    return UserAvailabilityService;
}());
UserAvailabilityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        rethink_service_1.RethinkService])
], UserAvailabilityService);
exports.UserAvailabilityService = UserAvailabilityService;
//# sourceMappingURL=userAvailability.service.js.map