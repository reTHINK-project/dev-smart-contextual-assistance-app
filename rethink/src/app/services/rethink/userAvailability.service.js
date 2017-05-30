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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
// Services
var rethink_service_1 = require("./rethink.service");
var contact_service_1 = require("../contact.service");
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
    function UserAvailabilityService(router, route, rethinkService, contactService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.rethinkService = rethinkService;
        this.contactService = contactService;
        console.log('[UserAvailability Service - constructor] - ');
        this.availabilityReporterURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityReporter';
        this.availabilityObserverURL = 'hyperty-catalogue://catalogue.' + this.rethinkService.domain + '/.well-known/hyperty/UserAvailabilityObserver';
        this.rethinkService.getHyperty(this.availabilityReporterURL)
            .then(function (hyperty) {
            _this.myAvailabilityReporter = hyperty.instance;
            console.log('[UserAvailability Service - getHyperty] Reporter hyperty was instantiated ', _this.myAvailabilityReporter);
            _this.hyperty = hyperty;
            _this.myAvailabilityReporter.start().then(function (availability) {
                _this.myAvailability = availability;
            });
        });
        this.startObservation();
    }
    UserAvailabilityService.prototype.startObservation = function () {
        var _this = this;
        console.log('[UserAvailability service. start observation] ');
        // let's first start the AvailabilityObserver Hyperty 
        this.rethinkService.getHyperty(this.availabilityObserverURL)
            .then(function (hyperty) {
            _this.availabilityObserver = hyperty.instance;
            console.log('[UserAvailability Service - getHyperty] Observer hyperty was instantiated ', _this.availabilityObserver);
            _this.hyperty = hyperty;
            // Let's retrieve observers from previous sessions
            _this.availabilityObserver.start().then(function (availabilities) {
                // lets retrieve all users to be observed
                _this.contactService.getUserList().subscribe(function (users) {
                    console.log('[UserAvailability Service - startObservation] users to be observed:', users);
                    var newUsers = [];
                    //for each User lets start observation 
                    users.forEach(function (user) {
                        if (user.statustUrl) {
                            // TODO: confirm controllers is a list not an array
                            user.startStatusObservation(availabilities[user.statustUrl]);
                        }
                        else {
                            newUsers.push(user);
                        }
                    });
                    // Users that have no controller yet, let's subscribe to have one
                    // if (uncontrolledUsers.length >= 0) {
                    //   this.subscribeUsers(uncontrolledUsers);
                    // }
                });
            });
        });
    };
    UserAvailabilityService.prototype.subscribeUsers = function (users) {
        //for each user let's discover reporter Hyperties
        var _this = this;
        users.forEach(function (user) {
            _this.discoverUserAvailability(user).then(function (availability) {
                //lets start a new user availability observation
                _this.availabilityObserver.observe(availability).then(function (controller) {
                    user.startStatusObservation(controller);
                });
            });
        });
    };
    UserAvailabilityService.prototype.discoverUserAvailability = function (user) {
        // discover and return last modified user availability hyperty
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.availabilityObserver.discoverUsers(user.identifiers, user.domain).then(function (discovered) {
                resolve(_this.getLastModifiedAvailability(discovered));
            });
        });
    };
    UserAvailabilityService.prototype.getLastModifiedAvailability = function (hyperties) {
        // from a list of discovered Availability Hyperty reporters return the one that was last modified
        var lastModifiedHyperty = hyperties[0];
        hyperties.forEach(function (hyperty) {
            if (hyperty.lastModified > lastModifiedHyperty.lastModified) {
                lastModifiedHyperty = hyperty;
            }
        });
        return lastModifiedHyperty;
    };
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
        rethink_service_1.RethinkService,
        contact_service_1.ContactService])
], UserAvailabilityService);
exports.UserAvailabilityService = UserAvailabilityService;
//# sourceMappingURL=userAvailability.service.js.map