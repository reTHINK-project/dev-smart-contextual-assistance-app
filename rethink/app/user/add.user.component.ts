import { Component, HostBinding, Output, Input, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

// Services
import { ContactService, ChatService } from '../../services/services';

// Models
import { User } from '../../models/models';
  
@Component({
  selector: 'add-user-view',
  templateUrl: 'app/user/add.user.component.html',
  styleUrls: ['app/user/add.user.component.css']
})
export class AddUserComponent implements OnInit {
  @HostBinding('class') hostClass = 'add-user-view fade';
  @HostBinding('class.visible') status:boolean = false ;

  @Output() closeEvent = new EventEmitter();
  @Output() inviteEvent = new EventEmitter();

  model = <any>{email: '', domain: 'hybroker.rethink.ptinovacao.pt'};

  @Input() busy: boolean = false;

  private contactList:Observable<User[]>;

  constructor(
    private chatService: ChatService,
    private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactList = this.contactService.getAllContacts();
  }


  submitEvent() {
    this.inviteEvent.emit( JSON.parse(JSON.stringify(this.model)) );

    this.busy = true;
    this.chatService.invite([this.model.email], [this.model.domain])
    .then((chatController: any) => {
      console.log('[Users as joined with success]', chatController);
      setTimeout(() => {
        this.busy = false;
      }, 200);
      
    }).catch((error) => {
      console.log('Error Inviting');
    })
  }
  
  clean() {
    this.model.email = '';
  }

  show() {
    this.status = true;
  }

  hide() {
    this.status = false;
  }
  
  toogle() {
    this.status = !this.status;
  }

  close() {
    this.status = false;
  }

}

