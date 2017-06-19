import { Component, OnInit, HostBinding, HostListener, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, RethinkService, ContextualCommDataService } from '../../services/services';

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

  allowAddUser = false;
  userList: Subject<User[]> = new BehaviorSubject([]);

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.updateView();
  }

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private appService: RethinkService,
    private contextualCommDataService: ContextualCommDataService,
    private contactService: ContactService) {

    this.route.data.subscribe((data: { context: ContextualComm, users: User[] }) => {
      this.updateCurrentContext(data.context);
    });

    this.contextualCommDataService.currentContext().subscribe((context: ContextualComm) => {
      console.log('[ContextualComm View - active context change]:', context);
      this.updateCurrentContext(context);
    });

  }

  updateCurrentContext(context: ContextualComm) {

    console.log('[ContextualComm View - active context change]:', context);

    this.allowAddUser = context.reporter ? true : false;

    // Check if the context is not an atomicContext
    // TODO: we should create an instance of Atomic and Composite Context;
    if (!context.id.includes('@')) {
      console.log('[ContextualComm View - is not an Atomic Context]:', context);
      this.userList.next(context.users);
    } else {

      this.contextualCommDataService.getContextByResource(context.parent)
        .subscribe((context: ContextualComm) => {
          this.userList.next(context.users);
        });

      this.allowAddUser = false;
    }

  }

  // Load data ones componet is ready
  ngOnInit() {
    console.log('[ContextualComm View - onInit]', this.content);
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
