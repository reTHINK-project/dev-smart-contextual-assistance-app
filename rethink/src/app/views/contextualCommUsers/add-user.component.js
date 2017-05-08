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
// Bootstrap
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// Services
var services_1 = require("../../services/services");
var AddUserComponent = (function () {
    function AddUserComponent(modalService, chatService, contactService) {
        this.modalService = modalService;
        this.chatService = chatService;
        this.contactService = contactService;
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
        this.chatService.invite([this.model.email], [this.model.domain])
            .then(function (chatController) {
            console.log('[Users as joined with success]', chatController);
            setTimeout(function () {
                _this.busy = false;
                _this.clean();
            }, 200);
        }).catch(function (error) {
            console.log('Error Inviting', error);
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
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        services_1.ChatService,
        services_1.ContactService])
], AddUserComponent);
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map