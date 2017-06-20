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
var router_1 = require("@angular/router");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
// Services
var services_1 = require("../../services/services");
// Utils
var utils_1 = require("../../utils/utils");
// Components
var add_user_component_1 = require("../contextualCommUsers/add-user.component");
var ContextualCommComponent = (function () {
    function ContextualCommComponent(el, router, route, appService, contextualCommDataService, contactService) {
        var _this = this;
        this.el = el;
        this.router = router;
        this.route = route;
        this.appService = appService;
        this.contextualCommDataService = contextualCommDataService;
        this.contactService = contactService;
        this.hostClass = 'context-view row no-gutters';
        this.allowAddUser = false;
        this.userList = new BehaviorSubject_1.BehaviorSubject([]);
        this.route.data.subscribe(function (data) {
            _this.updateCurrentContext(data.context);
        });
        this.contextualCommDataService.currentContext().subscribe(function (context) {
            console.log('[ContextualComm View - active context change]:', context);
            _this.updateCurrentContext(context);
        });
    }
    ContextualCommComponent.prototype.onResize = function (event) {
        this.updateView();
    };
    ContextualCommComponent.prototype.updateCurrentContext = function (context) {
        var _this = this;
        console.log('[ContextualComm View - active context change]:', context);
        this.allowAddUser = context.reporter ? true : false;
        // Check if the context is not an atomicContext
        // TODO: we should check for an instance of Atomic and Composite Context;
        if (!context.id.includes('@')) {
            console.log('[ContextualComm View - is not an Atomic Context]:', context);
            this.userList.next(context.users);
        }
        else {
            var normalizedPath = utils_1.normalizeFromURL(this.router.url, this.contactService.sessionUser.username);
            var normalizedName = utils_1.normalizeName(normalizedPath);
            console.log('[ContextualComm View - get parent active context]:', normalizedPath);
            console.log('[ContextualComm View - get parent active context]:', normalizedName);
            var result = void 0;
            if (utils_1.isAnUser(normalizedName.name)) {
                result = this.contextualCommDataService.getContext(normalizedName.name);
            }
            else {
                result = this.contextualCommDataService.getContextById(normalizedName.id);
            }
            result.subscribe(function (parentContext) {
                console.log('[ContextualComm View - get parent context]:', parentContext);
                _this.userList.next(parentContext.users);
            });
            this.allowAddUser = false;
        }
    };
    // Load data ones componet is ready
    ContextualCommComponent.prototype.ngOnInit = function () {
        console.log('[ContextualComm View - onInit]', this.content);
    };
    ContextualCommComponent.prototype.ngAfterViewInit = function () {
        this.updateView();
    };
    ContextualCommComponent.prototype.updateView = function () {
        var parentEl = this.content.element.nativeElement.parentElement;
        var currentEl = this.content.element.nativeElement;
        var parentHeight = parentEl.offsetHeight;
        var topMargin = 60;
        var bottomPadding = 60;
        var height = parentHeight - (topMargin + bottomPadding) + 'px';
        currentEl.style.height = height;
    };
    ContextualCommComponent.prototype.onInviteEvent = function (value) {
        console.log('Invite some one: ', value);
    };
    ContextualCommComponent.prototype.onCloseEvent = function () {
    };
    ContextualCommComponent.prototype.onContactClick = function () {
    };
    return ContextualCommComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], ContextualCommComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.ViewChild('content', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], ContextualCommComponent.prototype, "content", void 0);
__decorate([
    core_1.ViewChild(add_user_component_1.AddUserComponent),
    __metadata("design:type", add_user_component_1.AddUserComponent)
], ContextualCommComponent.prototype, "addUserComponent", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContextualCommComponent.prototype, "onResize", null);
ContextualCommComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'context-view',
        templateUrl: './contextualComm.component.html',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        router_1.Router,
        router_1.ActivatedRoute,
        services_1.RethinkService,
        services_1.ContextualCommDataService,
        services_1.ContactService])
], ContextualCommComponent);
exports.ContextualCommComponent = ContextualCommComponent;
//# sourceMappingURL=contextualComm.component.js.map