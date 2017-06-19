import { Component, Output, Input, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// config
import { config } from '../../config';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Utils
import { normalizeName, normalizeFromURL } from '../../utils/utils';

// Models
import { ContextualComm } from '../../models/models';

// Services
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
    let path = this.router.url;
    let normalizedName = normalizeName(path);

     console.log('[Add User Component] - parent: ', normalizedName, this.chatService.activeDataObjectURL);

    this.contextualCommDataService.getContextById(normalizedName.parent)
    .subscribe((context: ContextualComm) => {

      let parentURL = context.url;
      let currentURL = this.chatService.activeDataObjectURL;

      let parentChat = this.chatService.invite(parentURL, [this.model.email], [this.model.domain || config.domain]);
      let currentChat = this.chatService.invite(currentURL, [this.model.email], [this.model.domain || config.domain]);

      console.log('[Add User Component] - invite: ', parentChat, currentChat);

      parentChat
        .then((parentController: any) => {
          console.log('[Add User Component] - parent controller', parentController);
          return currentChat;
        })
        .then((currentController: any) => {

          console.log('[Add User Component] - current controller', currentController);
          let normalizedPath = normalizeFromURL(path + '/' + this.model.email, this.contactService.sessionUser.username);
          let normalizedName = normalizeName(normalizedPath);
          let parentURL = currentController.url;

          return this.contextualCommDataService.createAtomicContext(this.model.email, normalizedName.id, parentURL);
        })
        .then((childController: any) => {

          console.log('[Add User Component] - one to one controller', childController);

          this.busy = false;
          this.clean();
        })
        .catch((error) => {
          console.log('Error Inviting', error);

          this.busy = false;
          this.clean();

        });

    }, (error: any) => {
      this.busy = false;
      this.clean();
      console.log('Error getting the context:', error);
    });

  }

  clean() {
    this.model.email = '';
    this.model.domain = '';
  }

}

