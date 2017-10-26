import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/defaultIfEmpty';

import { splitFromURL, normalizeName, normalizeFromURL } from '../../utils/utils';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// App Model
import { TriggerActions } from '../../models/app.models';
import { ContextualComm } from '../../models/models';

// Validator
import { RethinkValidators } from '../../shared/rethink.validator';

// Services
import { ContactService } from '../../services/contact.service';
import { TriggerActionService } from '../../services/services';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'add-contextualcomm-view',
    templateUrl: './add-contextualComm.component.html'
})

export class AddContextualCommComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = 'add-context-view';

  private routeEvents: Subscription;
  private triggerActions: Subscription;
  private routeParams: any;
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

  complexForm: FormGroup;

  pattern = '[a-zA-Z0-9- ]*';
  minLenght = 4;
  maxLenght = 22;
  required = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private contactService: ContactService,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService) {

    this.contextualComms = this.contextualCommDataService.getContexts();

    //  = this.router.events.subscribe((navigation: NavigationEnd) => {
    //   console.log('[AddContextualComm] - router events:', navigation);

    //   if (navigation instanceof NavigationEnd) {
    //     this.routeParams = splitFromURL(navigation.url);
    //     console.log('[AddContextualComm] - route params:', this.routeParams);
    //   }

    // });

    this.routeEvents = this.route.params.subscribe((event: any) => {
      console.log('[AddContextualComm] - route events:', event);
      this.routeParams = event;
    })

  }


  ngOnInit() {

    this.triggerActions = this.triggerActionService.action().subscribe((action: TriggerActions) => {

      if (action === TriggerActions.OpenContextMenuCreator) {
        this.open(this.el);
      }

    });

  }

  ngOnDestroy() {
    this.routeEvents.unsubscribe();
    this.triggerActions.unsubscribe();

    console.log('[AddContextualComm] - destroy component');
  }

  buildForm() {

    console.log('[AddContextualComm] - build form: ', this.routeParams);

    const mainContext: string = this.routeParams.context || '';
    const normalizedName = normalizeName(mainContext);

    const contextNameId = normalizedName.parent ? normalizedName.parent : normalizedName.id;

    this.contextualCommDataService
      .getContextById(contextNameId)
      .subscribe((context: ContextualComm) => {
        this.fillForm(context);
      }, (error: any) => {
        this.fillForm();
      });

  }

  fillForm(context?: ContextualComm) {
    this.model.name = '';
    this.model.icon = this.icons[0];
    this.model.parent = context ? context.id : null;
    this.model.reporter = true;

    if (this.complexForm) { this.complexForm.reset(); }

    this.complexForm = this.fb.group({
      'name': [this.model.name,
      Validators.compose([
        Validators.required,
        Validators.pattern(this.pattern),
        Validators.minLength(this.minLenght),
        Validators.maxLength(this.maxLenght)]
      ),
      Validators.composeAsync([
        RethinkValidators.contextName(this.contextualCommDataService)
      ])],
      'parent' : [{value: this.model.parent, disabled: true }],
      'icon' : [this.model.icon]
    });

    // console.log('[AddContextualComm] - controls: ', this.complexForm.controls);
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

  onTextChange(event: KeyboardEvent) {
    console.log(event);

    const nameEl: HTMLInputElement = (<HTMLInputElement>event.target);
    const value = nameEl.value.replace(/\s+/g, '-');
    nameEl.value = value;
  }

  onLostFocus(event: FocusEvent) {
    const nameEl: HTMLInputElement = (<HTMLInputElement>event.target);
    const value = nameEl.value.replace(/\s+/g, '-');
    nameEl.value = value;
  }

  submitForm(value: any) {
    console.log('Submit:', value);
    const name = value.name.trim();
    const parent = value.parent || this.model.parent;

    const info = value;
    info['reporter'] = true;

    this.contextualCommDataService.createContext(name, parent, info).then((result) => {

      this.buildForm();

    }).catch((reason) => {

    });

  }
}
