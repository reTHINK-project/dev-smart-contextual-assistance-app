import { Component, Output, Input, OnInit, HostBinding, EventEmitter } from '@angular/core';
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
import { InviteUser } from '../../models/app.models';

// Services
import { NotificationsService } from '../../components/notification/notifications.module';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { ContactService, ChatService } from '../../services/services';

let searchResult: any[];

@Component({
  moduleId: module.id,
  selector: 'add-user-view',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  @HostBinding('class') hostClass = 'add-user-action';

  @Output() closeEvent = new EventEmitter();
  @Output() inviteEvent = new EventEmitter();
  @Output() contactClick = new EventEmitter();

  model = <any>{email: '', domain: ''};

  searchResultModel: User;

  @Input() busy = false;

  ready = false;

  private closeResult: string;

  contactList: Observable<User[]>;

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


    this.contactList.subscribe((contacts: any) => {
      console.log('Contacts:', contacts);
      searchResult = contacts;
    });

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
      if (contexts[0] === key) {
        first = config.appPrefix + '/' + key;
        second = config.appPrefix + '/' + key + '/' + data.email + '-' + this.contactService.sessionUser.username;
      } else {
        first = config.appPrefix + '/' + contexts[0] + '/' + key;
        second = config.appPrefix + '/' + contexts[0] + '/' + key + '/' + data.email + '-' + this.contactService.sessionUser.username;
      }

      acc.push(first);
      acc.push(second);
      return acc;
    }, []);

    console.log('[Add User Component] - contexts', contexts);

    this._recursiveCreateContext(contexts, data);

  }

  _recursiveCreateContext(contexts: string[], data: any, index: number = 0) {

    const path = this.router.url;
    const nameID: string = contexts[index];
    const parentID: string = contexts[index - 1];

    console.log('[Add User Component] - check: ', nameID);
    let interval: any;

    this.contextualCommDataService.getContextById(nameID).toPromise().then((contextualComm: ContextualComm) => {

      console.log('[Add User Component] - found contextualComm: ', contextualComm);
      const existingUser = contextualComm.users.find(user => user.username === data.email);
      console.log('[Add user component] - search for current user: ', existingUser);

      if (existingUser) {

        if (index <= contexts.length) {
          index++;
          console.log('[Add User Component] - the context already have the user: ', contexts.length, index);
          this._recursiveCreateContext(contexts, data, index);
          return;
        }

      }

      const users: any[] = [];

      users.push({
        user: data.email,
        domain: data.domain || config.domain
      })

      this.chatService.invite(contextualComm.url, users).then((controller: any) => {

        interval = setTimeout(() => {
          this.busy = false;
          this.clean();
          this.errorNotificateSystem('The user ' + data.email + ' is not reachable.');
        }, 5000);

        controller.onUserAdded((userAdded: any) => {
          console.log('[Add User Component] - user added: ', userAdded);

          clearInterval(interval);

          const normalizedName = normalizeName(contexts[index + 1]);

          console.log('[Add User Component] - data: ', normalizedName);

          this.chatService.controllerUserAdded(controller, userAdded);
          const user: any[] = [{
            user: userAdded.identity.userProfile.username,
            domain: userAdded.domain
          }];

          if (!isALegacyUser(data.email)) {
            this.contextualCommDataService.createAtomicContext(
                user,
                normalizedName.name,
                normalizedName.id,
                normalizedName.parent
              )
              .then((childController: any) => {
                console.log( '[Add User Component] - one to one controller', childController );
                this.busy = false;
                this.clean();

                if (index <= contexts.length) {
                  index++;
                  console.log('[Add User Component] - user added: ', contexts.length, index);
                  this._recursiveCreateContext(contexts, data, index);
                }
              }).catch(console.error);
          }

        });

      }).catch((reason) => {
        console.error('[Add User Component] - error:', reason);
        this.errorNotificateSystem(reason)
      });

    }).catch((reason) => {
      console.log('[Add User Component] - Context Not Found: ', reason);
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

