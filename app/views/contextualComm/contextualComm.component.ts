import { Component, OnInit, HostBinding, HostListener, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, RethinkService, ContextualCommService } from '../../services/services';

// Models
import { User, ContextualComm } from '../../models/models';


// Components
import { AddUserComponent } from '../contextualCommUsers/add-user.component';

@Component({
  moduleId: module.id,
  selector: 'context-view',
  templateUrl: './contextualComm.component.html',
})
export class ContextualCommComponent implements OnInit, AfterViewInit {

  @HostBinding('class') hostClass = 'context-view row no-gutters';
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;
  @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;

  users: Subject<User[]> = new BehaviorSubject([]);

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.updateView();
  }

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private appService: RethinkService,
    private contextualCommService: ContextualCommService,
    private contactService: ContactService) {}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualComm View - onInit]', this.content);

    this.route.data
      .subscribe((data: { context: ContextualComm, users: User[] }) => {
        console.log('Resolved context:', data.context);

        this.users.next(data.context.users);
        // console.log('Resolved users:', data.users);
      });

    this.contextualCommService.contextualComm().subscribe((contextualComm: ContextualComm) => {
      console.log('[ContextualComm Component - update] - ', contextualComm, contextualComm.users);
      this.users.next(contextualComm.users);
    });

  }

  ngAfterViewInit() {
    this.updateView();
  }

  updateView() {
    let parentEl = this.content.element.nativeElement.parentElement;
    let currentEl = this.content.element.nativeElement;
    let parentHeight = parentEl.offsetHeight;
    let topMargin = 60;
    let bottomPadding = 60;
    let height = parentHeight - (topMargin + bottomPadding) + 'px';
    currentEl.style.height = height;
  }

  onInviteEvent(value: any) {
    console.log('Invite some one: ', value);
  }

  onCloseEvent() {

  }

  onContactClick() {

  }


}
