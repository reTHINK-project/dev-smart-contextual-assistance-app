import { Component, Output, Input, OnInit, HostBinding, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

// config
import { config } from '../../config';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Utils
import { isALegacyUser, normalizeName, normalizeFromURL } from '../../utils/utils';

// Models
import { ContextualComm, User } from '../../models/models';
import { InviteUser, UserAdded } from '../../models/app.models';

// Services
import { NotificationsService } from '../../components/notification/notifications.module';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { ContactService, ChatService } from '../../services/services';
import { Subscription } from 'rxjs/Subscription';

let searchResult: any[];

@Component({
  moduleId: module.id,
  selector: 'add-user-view',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = 'add-user-action';

  @Output() closeEvent = new EventEmitter();
  @Output() inviteEvent = new EventEmitter();
  @Output() contactClick = new EventEmitter();

  model = <any>{email: '', domain: ''};

  searchResultModel: User;

  @Input() busy = false;

  ready = false;

  private closeResult: string;
  private countDown: any;

  contactList: Observable<User[]>;

  private contextToBeCreated: string[] = [];

  private contextualCommEvent: Subscription;
  private contactListSubscription: Subscription;
  private getContextByIDSubscription: Subscription;

  formatter = (user: User) => user.username;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private chatService: ChatService,
    private contactService: ContactService,
    private notificationsService: NotificationsService,
    private contextualCommDataService: ContextualCommDataService) {
  }

  ngOnInit() {
    this.contactList = this.contactService.getUsers();

    this.contactListSubscription = this.contactList.subscribe((contacts: any) => {
      console.log('Contacts:', contacts);
      searchResult = contacts;
    });

    this.contextualCommEvent = this.contextualCommDataService.contextualCommEvent.subscribe((contextualComm: ContextualComm) => {

      clearInterval(this.countDown);

      const contextID = contextualComm.id;

      const result = this.contextToBeCreated.findIndex(item => item === contextID);

      this._recursiveCreateContext(this.contextToBeCreated, result);

      this.busy = false;
      this.clean();

    });

  }

  ngOnDestroy() {

    if (this.contextualCommEvent) { this.contextualCommEvent.unsubscribe(); }
    if (this.contactListSubscription) { this.contactListSubscription.unsubscribe(); }
    if (this.getContextByIDSubscription) { this.getContextByIDSubscription.unsubscribe(); }

  }

  search(text$: Observable<string>) {
    return text$
      .distinctUntilChanged()
      .map(term => term.length < 2 ?
        [] :
        searchResult.filter(v => {
          console.log(v, term);
          return v.username.toLowerCase().indexOf(term.toLowerCase()) > -1
        }).slice(0, 10));
  }

  open(content: any) {

    this.ready = true;

    this.busy = false;

    this.modalService.open(content, {backdrop: false, windowClass: 'custom-modal'}).result.then((result) => {
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

  addUser() {

    this.busy = true;

    console.log('THIS:', this.searchResultModel);

    if (this.searchResultModel && this.searchResultModel.username) {

      this._invite({
        email: this.searchResultModel.username,
        domain: this.searchResultModel.domain
      });


      // this.searchResultModel
    }

  }

  submitEvent() {
    // this.inviteEvent.emit( JSON.parse(JSON.stringify(this.model)) );

    this.busy = true;

    this._invite({
      email: this.model.email,
      domain: this.model.domain
    });

  }

  _invite(data: InviteUser) {

    const path = this.router.url;
    const normalizedName = normalizeName(path);
    let parentNameId = '';
    let contexts: string[] = [];

    console.log('[Add User Component] - parent: ', normalizedName, this.chatService.activeDataObjectURL);

    parentNameId = normalizedName.parent;

    contexts = normalizedName.id.split('/').slice(1);
    contexts = contexts.reduce((acc, key) => {
      let first: string;
      let second: string;

      const legacyUser = isALegacyUser(data.email)

      if (contexts[0] === key) {
        first = config.appPrefix + '/' + key;
        second = !legacyUser ? config.appPrefix + '/' + key + '/' + data.email + '-' + this.contactService.sessionUser.username : undefined;
      } else {
        first = config.appPrefix + '/' + contexts[0] + '/' + key;
        second = !legacyUser ?
          config.appPrefix + '/' + contexts[0] + '/' + key + '/' + data.email + '-' + this.contactService.sessionUser.username :
          undefined
      }

      acc.push(first);
      if (second) { acc.push(second); }

      return acc;
    }, []);

    console.log('[Add User Component] - contexts', contexts);

    this.contextToBeCreated.concat(contexts);

    this._recursiveCreateContext(contexts);

  }

  _recursiveCreateContext(contexts: string[], index: number = 0) {

    const data = this.model;
    const path = this.router.url;
    const nameID: string = contexts[index];
    const parentID: string = contexts[index - 1];
    const legacyUser = isALegacyUser(data.email);

    let normalizedName: any;
    normalizedName = normalizeName(contexts[index]);

    console.log('[Add User Component] - check: ', nameID);

    this.getContextByIDSubscription = this.contextualCommDataService.getContextById(nameID).subscribe((contextualComm: ContextualComm) => {

      console.log('[Add User Component] - found contextualComm: ', contextualComm);
      const existingUser = contextualComm.users.find(user => user.username === data.email);
      console.log('[Add user component] - search for current user: ', existingUser);

      if (existingUser) {

        if (index <= contexts.length) {
          index++;
          console.log('[Add User Component] - the context already have the user: ', contexts.length, index);
          this._recursiveCreateContext(contexts, index);
          return;
        }

      }

      const users: any[] = [];

      users.push({
        user: data.email,
        domain: data.domain || config.domain
      })

      this.chatService.invite(contextualComm.url, users).then((controller: any) => {

        if (!legacyUser) {
          this.countDown = setTimeout(() => {
            this.busy = false;
            this.clean();
            this.errorNotificateSystem('The user ' + data.email + ' is not reachable.');
          }, 5000);
        }

      }).catch((reason) => {
        console.error('[Add User Component] - error:', reason);
        this.errorNotificateSystem(reason)
      });

    }, (reason: any) => {
      console.log('[Add User Component] - Context Not Found: ', reason);

      if (!legacyUser) {
      this.contextualCommDataService.createAtomicContext(
          data,
          normalizedName.name,
          normalizedName.id,
          normalizedName.parent
        )
        .then((childController: any) => {
          console.log( '[Add User Component] - one to one controller', childController );
          this.busy = false;
          this.clean();
        }).catch((error: any) => {
          console.error('REASON:', reason);
        });
      }

    });

  }

  errorNotificateSystem(error: any) {
    console.log('ERROR:', error);

    this.notificationsService.error('Error', error, {
      showProgressBar: false,
      timeOut: 5000,
      pauseOnHover: false,
      haveActions: false
    });

    this.busy = false;
    this.clean();
  }

  clean() {
    this.model.email = '';
    this.model.domain = '';

    if (this.searchResultModel) {
      this.searchResultModel = null;
    }
  }

}

