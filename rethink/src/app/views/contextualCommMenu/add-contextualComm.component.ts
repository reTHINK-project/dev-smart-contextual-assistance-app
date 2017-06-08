import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/defaultIfEmpty';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// App Model
import { TriggerActions } from '../../models/app.models';

// Validator
import { RethinkValidators } from '../../shared/rethink.validator';

// Serives
import { TriggerActionService } from '../../services/services';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { ContextualComm } from '../../models/models';

@Component({
    moduleId: module.id,
    selector: 'add-contextualComm-view',
    templateUrl: './add-contextualComm.component.html',
    styleUrls: ['./add-contextualComm.component.css']
})

export class AddContextualCommComponent implements OnInit, AfterViewInit {

  private closeResult: string;

  model: any = {};

  icons: string[] = [
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

  contextualComms: Observable<ContextualComm[]>;

  title = 'Add New context';

  @ViewChild('content') el: ElementRef;

  private contexts: ContextualComm[] = [];

  complexForm: FormGroup;

  constructor(
    private rd: Renderer2,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService) {

      this.contextualComms = this.contextualCommDataService.getContexts();

      this.contextualComms.subscribe((contexts: ContextualComm[]) => {
        this.contexts = contexts;
      });

  }


  ngOnInit() {

    this.triggerActionService.action().subscribe((action: TriggerActions) => {

      if (action === TriggerActions.OpenContextMenuCreator) {
        this.open(this.el);
      }

    });

  }

  ngAfterViewInit() {
    this.buildForm();
  }

  buildForm() {

    this.model.name = '';
    this.model.icon = this.icons[0];

    console.log('Is empty:', this.contexts.length);

    if (this.complexForm) { this.complexForm.reset(); }

    this.complexForm = this.fb.group({
      'name': [this.model.name, Validators.compose([
        Validators.required,
        RethinkValidators.contextName(this.contextualCommDataService),
        Validators.pattern('[a-zA-Z1-9- ]*'),
        Validators.minLength(4),
        Validators.maxLength(22)]
      )],
      'parent' : [{value: null, disabled: this.contexts.length === 0 } ],
      'icon' : [this.model.icon]
    });

  }

  open(content: any) {

    console.log('[AddContextualComm] - ', content);

    this.modalService.open(content, {windowClass: 'custom-modal'}).result.then((result) => {
      console.log('AQUI:', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  submitForm(value: any) {
    console.log('Submit:', value);
    this.contextualCommDataService.createContext(value.name, value.parent, value).then((result) => {

      this.buildForm();

    }).catch((reason) => {

    });

  }
}
