import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, RethinkService, ChatService, ContextualCommService } from '../../services/services';

// Models
import { User, ContextualComm } from '../../models/models';


// Components
import { AddUserComponent } from '../contextualCommUsers/add-user.component';

@Component({
  moduleId: module.id,
  selector: 'context-view',
  templateUrl: './contextualComm.component.html',
})
export class ContextualCommComponent implements OnInit {

  @HostBinding('class') hostClass = 'context-view';

  @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;

  private users: Subject<User[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private appService: RethinkService,
    private ContextualCommService: ContextualCommService,
    private contactService: ContactService) {}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualComm View - onInit]');

    this.route.data
      .subscribe((data: { context: ContextualComm, users: User[] }) => {
        console.log('Resolved context:', data.context);

        this.users.next(data.context.users);
        // console.log('Resolved users:', data.users);
      });

    this.ContextualCommService.contextualComm().subscribe((contextualComm: ContextualComm) => {
      console.log('[ContextualComm Component - update] - ', contextualComm, contextualComm.users);
      this.users.next(contextualComm.users);
    });

  }

  onInviteEvent(value: any) {
    console.log('Invite some one: ', value);
  }


}
