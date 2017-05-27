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
// Bootstrap
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// Utils
var utils_1 = require("../../utils/utils");
// Services
var contextualCommData_service_1 = require("../../services/contextualCommData.service");
var services_1 = require("../../services/services");
var AddUserComponent = (function () {
    function AddUserComponent(router, modalService, chatService, contactService, contextualCommDataService) {
        this.router = router;
        this.modalService = modalService;
        this.chatService = chatService;
        this.contactService = contactService;
        this.contextualCommDataService = contextualCommDataService;
        this.closeEvent = new core_1.EventEmitter();
        this.inviteEvent = new core_1.EventEmitter();
        this.contactClick = new core_1.EventEmitter();
        this.model = { email: '', domain: '' };
        this.busy = false;
        this.ready = false;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        this.contactList = this.contactService.getUsers();
    };
    AddUserComponent.prototype.open = function (content) {
        var _this = this;
        this.ready = true;
        this.modalService.open(content, { backdrop: false, windowClass: 'custom-modal' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    AddUserComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    AddUserComponent.prototype.submitEvent = function () {
        // this.inviteEvent.emit( JSON.parse(JSON.stringify(this.model)) );
        var _this = this;
        this.busy = true;
        var normalizedName = utils_1.normalizeName(this.router.url);
        console.log('[Add User Component] - parent: ', normalizedName, this.chatService.activeDataObjectURL);
        this.contextualCommDataService.getContextById(normalizedName.parent)
            .subscribe(function (context) {
            var parentURL = context.url;
            var currentURL = _this.chatService.activeDataObjectURL;
            var parentChat = _this.chatService.invite(parentURL, [_this.model.email], [_this.model.domain]);
            var currentChat = _this.chatService.invite(currentURL, [_this.model.email], [_this.model.domain]);
            console.log('[Add User Component] - invite: ', parentChat, currentChat);
            Promise.all([parentChat, currentChat]).then(function (chatController) {
                console.log('[Users as joined with success]', chatController);
                setTimeout(function () {
                    _this.busy = false;
                    _this.clean();
                }, 200);
            }).catch(function (error) {
                console.log('Error Inviting', error);
            });
        });
    };
    AddUserComponent.prototype.clean = function () {
        this.model.email = '';
        this.model.domain = '';
    };
    return AddUserComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddUserComponent.prototype, "closeEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddUserComponent.prototype, "inviteEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AddUserComponent.prototype, "contactClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AddUserComponent.prototype, "busy", void 0);
AddUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-user-view',
        templateUrl: './add-user.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        ng_bootstrap_1.NgbModal,
        services_1.ChatService,
        services_1.ContactService,
        contextualCommData_service_1.ContextualCommDataService])
], AddUserComponent);
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map