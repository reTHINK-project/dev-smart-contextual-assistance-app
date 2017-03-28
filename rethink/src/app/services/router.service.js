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
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/take");
var RouterService = (function () {
    function RouterService(router) {
        var _this = this;
        this.router = router;
        this.paths = new Subject_1.Subject();
        // this.paths.take(2)
        this.breadcrumb = this.paths.take(2);
        // Subscribe to route params
        this._urls = new Array();
        this.router.events.subscribe(function (navigation) {
            _this._urls.length = 0; //Fastest way to clear out array
            if (navigation instanceof router_1.NavigationEnd) {
                _this.generateBreadcrumbTrail(navigation.urlAfterRedirects ? navigation.urlAfterRedirects : navigation.url);
                _this.paths.next(_this._urls);
            }
        });
    }
    RouterService.prototype.generateBreadcrumbTrail = function (url) {
        this._urls.unshift(decodeURIComponent(url)); //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
        }
    };
    return RouterService;
}());
RouterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], RouterService);
exports.RouterService = RouterService;
//# sourceMappingURL=router.service.js.map