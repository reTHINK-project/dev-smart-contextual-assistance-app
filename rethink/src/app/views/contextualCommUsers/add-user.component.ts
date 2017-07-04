import { Component, Output, Input, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// config
import { config } from '../../config';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Utils
import { isALegacyUser, normalizeName, normalizeFromURL } from '../../utils/utils';

// Models
import { ContextualComm } from '../../models/models';

// Services
import { NotificationsService } from '../../components/notification/notifications.module';
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { ContactService, ChatService } from '../../services/services';
import { User } from '../../models/models';

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

  @Input() busy = false;

  ready = false;

  private closeResult: string;

  contactList: Observable<User[]>;

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

  submitEvent() {
    // this.inviteEvent.emit( JSON.parse(JSON.stringify(this.model)) );

    this.busy = true;
    const path = this.router.url;
    const normalizedName = normalizeName(path);
    let parentNameId = '';

    console.log('[Add User Component] - parent: ', normalizedName, this.chatService.activeDataObjectURL);

    parentNameId = normalizedName.parent;

    if (!parentNameId) {
      parentNameId = normalizedName.id;
    }

    this.contextualCommDataService.getContextById(parentNameId).subscribe((context: ContextualComm) => {

      const parentURL = context.url;
      const currentURL = this.chatService.activeDataObjectURL;

      const parentChat = this.chatService.invite(parentURL, [this.model.email], [this.model.domain || config.domain]);
      let currentChat: any;

      if (parentURL !== currentURL || !isALegacyUser(this.model.email)) {
        currentChat = this.chatService.invite(currentURL, [this.model.email], [this.model.domain || config.domain]);
      }

      console.log('[Add User Component] - invite: ', this.model);
      console.log('[Add User Component] - invite: ', parentURL, currentURL);
      console.log('[Add User Component] - invite: ', parentChat, currentChat);

      parentChat.then((parentController: any) => {
        console.log('[Add User Component] - parent controller:', parentController);
        console.log('[Add User Component] - check controllers: ', parentController, currentURL, parentController.url === currentURL);

        if (!currentChat) {
          return parentController;
        }

        return currentChat;
      }).then((currentController: any) => {

        if (isALegacyUser(this.model.email)) {
          throw new Error('Is a legacy user');
        }

        console.log('[Add User Component] - current controller', currentController);
        const normalizedPath = normalizeFromURL(path + '/user/' + this.model.email, this.contactService.sessionUser.username);
        const normalizedName = normalizeName(normalizedPath);

        console.log('[Add User Component] - normalized name: ', normalizedName);

        return this.contextualCommDataService.createAtomicContext(
            this.model.email,
            normalizedName.name,
            normalizedName.id,
            normalizedName.parent);
      }).then((childController: any) => {

        console.log('[Add User Component] - one to one controller', childController);

        this.busy = false;
        this.clean();
      }).catch((reason: any) => { this.errorNotificateSystem(reason); });

    }, (reason: any) => {
      this.errorNotificateSystem(reason);
    });
  }

  errorNotificateSystem(error: any) {
    console.log('ERROR:', error);

    this.notificationsService.error('Error', error, {
      showProgressBar: false,
      timeOut: 3000,
      pauseOnHover: false,
      haveActions: false
    });

    this.busy = false;
    this.clean();
  }

  clean() {
    this.model.email = '';
    this.model.domain = '';
  }

}

