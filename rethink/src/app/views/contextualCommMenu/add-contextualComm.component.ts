import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, ActivatedRoute,  Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/defaultIfEmpty';

import { normalizeName } from '../../utils/utils';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// App Model
import { TriggerActions } from '../../models/app.models';
import { ContextualComm } from '../../models/models';

// Validator
import { RethinkValidators } from '../../shared/rethink.validator';

// Services
import { TriggerActionService } from '../../services/services';
import { ContextualCommDataService } from '../../services/contextualCommData.service';

@Component({
    moduleId: module.id,
    selector: 'add-contextualComm-view',
    templateUrl: './add-contextualComm.component.html',
    styleUrls: ['./add-contextualComm.component.css']
})

export class AddContextualCommComponent implements OnInit {

  @HostBinding('class') hostClass = 'add-context-view';

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

  private contextRoot: string;

  complexForm: FormGroup;

  constructor(
    private rd: Renderer2,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService) {

    this.contextualComms = this.contextualCommDataService.getContexts()
      .map((contexts => contexts.filter(context => context.reporter)));

    this.contextualComms
      .subscribe((contexts: ContextualComm[]) => {
        this.contexts = contexts;
      });

    this.router.events.subscribe((navigation: NavigationEnd) => {
      console.log('[AddContextualComm] - ', navigation);
      if (navigation instanceof NavigationEnd) {
        let normalized = normalizeName(navigation.url);

        console.log('[AddContextualComm] - params:', normalized);

        this.contextRoot = normalized.parent;
      }
    });
  }


  ngOnInit() {

    this.triggerActionService.action().subscribe((action: TriggerActions) => {

      if (action === TriggerActions.OpenContextMenuCreator) {
        this.open(this.el);
      }

    });

  }

  buildForm() {

    this.model.name = '';
    this.model.icon = this.icons[0];
    this.model.parent = this.contextRoot || null;
    this.model.reporter = true;

    console.log('Is empty:', this.contexts.length);
    let disabled = this.contexts.length === 0 || this.contextRoot ? true : false;

    if (this.complexForm) { this.complexForm.reset(); }

    this.complexForm = this.fb.group({
      'name': [this.model.name,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z1-9- ]*'),
        Validators.minLength(4),
        Validators.maxLength(22)]
      ),
      Validators.composeAsync([
        RethinkValidators.contextName(this.contextualCommDataService)
      ])],
      'parent' : [{value: this.model.parent, disabled: disabled }],
      'icon' : [this.model.icon]
    });

  }

  open(content: any) {

    console.log('[AddContextualComm] - ', content);

    this.buildForm();

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

  onLostFocus(event: FocusEvent) {
    let nameEl: HTMLInputElement = (<HTMLInputElement>event.target);
    let value = nameEl.value.replace(/\s+/g, '-');
    nameEl.value = value;
  }

  submitForm(value: any) {
    console.log('Submit:', value);
    let name = value.name.trim();
    let parent = value.parent || this.model.parent;

    let info = value;
    info['reporter'] = true;

    this.contextualCommDataService.createContext(name, parent, info).then((result) => {

      this.buildForm();

    }).catch((reason) => {

    });

  }
}
