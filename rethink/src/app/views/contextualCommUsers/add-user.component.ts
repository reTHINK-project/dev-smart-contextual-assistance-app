import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Services
import { ContactService, ChatService } from '../../services/services';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'add-user-view',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  @Output() inviteEvent = new EventEmitter();
  @Output() contactClick = new EventEmitter();

  model = <any>{email: '', domain: ''};

  @Input() busy = false;

  ready = false;

  private closeResult: string;

  contactList: Observable<User[]>;

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService,
    private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactList = this.contactService.getUsers();
  }

  open(content: any) {

    this.ready = true;

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
    this.chatService.invite([this.model.email], [this.model.domain])
    .then((chatController: any) => {
      console.log('[Users as joined with success]', chatController);
      setTimeout(() => {
        this.busy = false;
        this.clean();
      }, 200);

    }).catch((error) => {
      console.log('Error Inviting', error);
    });

  }

  clean() {
    this.model.email = '';
    this.model.domain = '';
  }

}

