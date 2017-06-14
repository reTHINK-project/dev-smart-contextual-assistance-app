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
require("rxjs/add/operator/defaultIfEmpty");
// Bootstrap
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// App Model
var app_models_1 = require("../../models/app.models");
// Validator
var rethink_validator_1 = require("../../shared/rethink.validator");
// Serives
var services_1 = require("../../services/services");
var contextualCommData_service_1 = require("../../services/contextualCommData.service");
var AddContextualCommComponent = (function () {
    function AddContextualCommComponent(rd, fb, modalService, triggerActionService, contextualCommDataService) {
        var _this = this;
        this.rd = rd;
        this.fb = fb;
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
        this.contexts = [];
        this.contextualComms = this.contextualCommDataService.getContexts()
            .map((function (contexts) { return contexts.filter(function (context) { return context.reporter; }); }));
        this.contextualComms
            .subscribe(function (contexts) {
            _this.contexts = contexts;
        });
    }
    AddContextualCommComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.triggerActionService.action().subscribe(function (action) {
            if (action === app_models_1.TriggerActions.OpenContextMenuCreator) {
                _this.open(_this.el);
            }
        });
    };
    AddContextualCommComponent.prototype.buildForm = function () {
        this.model.name = '';
        this.model.icon = this.icons[0];
        this.model.parent = null;
        this.model.reporter = true;
        console.log('Is empty:', this.contexts.length);
        if (this.complexForm) {
            this.complexForm.reset();
        }
        this.complexForm = this.fb.group({
            'name': [this.model.name,
                forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('[a-zA-Z1-9- ]*'),
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(22)
                ]),
                forms_1.Validators.composeAsync([
                    rethink_validator_1.RethinkValidators.contextName(this.contextualCommDataService)
                ])],
            'parent': [{ value: null, disabled: this.contexts.length === 0 }],
            'icon': [this.model.icon]
        });
    };
    AddContextualCommComponent.prototype.open = function (content) {
        var _this = this;
        console.log('[AddContextualComm] - ', content);
        this.buildForm();
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
    AddContextualCommComponent.prototype.onLostFocus = function (event) {
        var nameEl = event.target;
        var value = nameEl.value.replace(/\s+/g, '-');
        nameEl.value = value;
    };
    AddContextualCommComponent.prototype.submitForm = function (value) {
        var _this = this;
        console.log('Submit:', value);
        var name = value.name.trim();
        var parent = value.parent;
        var info = value;
        info['reporter'] = true;
        this.contextualCommDataService.createContext(name, parent, info).then(function (result) {
            _this.buildForm();
        }).catch(function (reason) {
        });
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
        forms_1.FormBuilder,
        ng_bootstrap_1.NgbModal,
        services_1.TriggerActionService,
        contextualCommData_service_1.ContextualCommDataService])
], AddContextualCommComponent);
exports.AddContextualCommComponent = AddContextualCommComponent;
//# sourceMappingURL=add-contextualComm.component.js.map