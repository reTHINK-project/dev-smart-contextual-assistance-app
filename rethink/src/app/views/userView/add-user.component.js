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
var services_1 = require("../../services/services");
var AddUserComponent = (function () {
    function AddUserComponent(chatService, contactService) {
        this.chatService = chatService;
        this.contactService = contactService;
        this.hostClass = 'add-user-view fade';
        this.status = false;
        this.closeEvent = new core_1.EventEmitter();
        this.inviteEvent = new core_1.EventEmitter();
        this.contactClick = new core_1.EventEmitter();
        this.model = { email: '', domain: '' };
        this.busy = false;
    }
    AddUserComponent.prototype.ngOnInit = function () {
        // this.contactList = this.contactService.getAllContacts();
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
    AddUserComponent.prototype.show = function () {
        this.status = true;
    };
    AddUserComponent.prototype.hide = function () {
        this.status = false;
    };
    AddUserComponent.prototype.toogle = function () {
        this.status = !this.status;
    };
    AddUserComponent.prototype.close = function () {
        this.status = false;
    };
    return AddUserComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], AddUserComponent.prototype, "hostClass", void 0);
__decorate([
    core_1.HostBinding('class.visible'),
    __metadata("design:type", Boolean)
], AddUserComponent.prototype, "status", void 0);
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
    __metadata("design:type", Boolean)
], AddUserComponent.prototype, "busy", void 0);
AddUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-user-view',
        templateUrl: './add-user.component.html',
        styleUrls: ['./add-user.component.css']
    }),
    __metadata("design:paramtypes", [services_1.ChatService,
        services_1.ContactService])
], AddUserComponent);
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map