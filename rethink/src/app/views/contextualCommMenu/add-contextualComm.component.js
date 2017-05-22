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
// App Model
var app_models_1 = require("../../models/app.models");
// Serives
var services_1 = require("../../services/services");
var contextualCommData_service_1 = require("../../services/contextualCommData.service");
var AddContextualCommComponent = (function () {
    function AddContextualCommComponent(rd, modalService, triggerActionService, contextualCommDataService) {
        this.rd = rd;
        this.modalService = modalService;
        this.triggerActionService = triggerActionService;
        this.contextualCommDataService = contextualCommDataService;
        this.model = {};
        this.icons = [
            'comments',
            'briefcase',
            'heart',
            'heartbeat',
            'film',
            'camera',
            'futbol-o',
            'gamepad',
            'graduation-cap',
            'cogs',
            'users'
        ];
        this.title = 'Add New context';
        this.model.icon = this.icons[0];
        this.contextualComms = this.contextualCommDataService.getContexts();
    }
    AddContextualCommComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.triggerActionService.action().subscribe(function (action) {
            if (action === app_models_1.TriggerActions.OpenContextMenuCreator) {
                _this.open(_this.el);
            }
        });
    };
    AddContextualCommComponent.prototype.open = function (content) {
        var _this = this;
        console.log('[AddContextualComm] - ', content);
        this.modalService.open(content, { windowClass: 'custom-modal' }).result.then(function (result) {
            console.log('AQUI:', result);
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    AddContextualCommComponent.prototype.getDismissReason = function (reason) {
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
    AddContextualCommComponent.prototype.submitForm = function (value) {
        console.log('Submit:', value);
        this.contextualCommDataService.createContext(value.name, value.parent, value);
        this.clean();
    };
    AddContextualCommComponent.prototype.clean = function () {
        this.model = {};
    };
    return AddContextualCommComponent;
}());
__decorate([
    core_1.ViewChild('content'),
    __metadata("design:type", core_1.ElementRef)
], AddContextualCommComponent.prototype, "el", void 0);
AddContextualCommComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-contextualComm-view',
        templateUrl: './add-contextualComm.component.html',
        styleUrls: ['./add-contextualComm.component.css']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        ng_bootstrap_1.NgbModal,
        services_1.TriggerActionService,
        contextualCommData_service_1.ContextualCommDataService])
], AddContextualCommComponent);
exports.AddContextualCommComponent = AddContextualCommComponent;
//# sourceMappingURL=add-contextualComm.component.js.map