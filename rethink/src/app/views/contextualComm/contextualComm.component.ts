import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Services
import { RethinkService, ChatService, ContextService, ContactService } from '../../services/services';

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

  @ViewChild(AddUserComponent) addView:AddUserComponent;

  private users:Subject<User[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private appService: RethinkService,
    private contextService: ContextService,
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

    this.contextService.contextualComm().subscribe((contextualComm:ContextualComm) => {
      console.log('[ContextualComm Component - update] - ', contextualComm, contextualComm.users);
      this.users.next(contextualComm.users);
    })

  }

/*  onContactClick(user: User) {
    console.log('(contact-click)', user, this.router);

    this.router.navigate([this.router.url, user.username]);
  }*/

  onContactAdd() {
    this.addView.toogle();
  }

  onCloseEvent() {
    this.addView.toogle();
  }

  onInviteEvent(value:any) {
    console.log('Invite some one: ', value);
  }


}