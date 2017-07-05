import { Component, OnInit, HostBinding, HostListener, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, RethinkService, ContextualCommDataService } from '../../services/services';

// Models
import { User, ContextualComm } from '../../models/models';

// Utils
import { isAnUser, normalizeFromURL, normalizeName } from '../../utils/utils';

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
    // TODO: we should check for an instance of Atomic and Composite Context;
    if (!context.id.includes('@')) {
      console.log('[ContextualComm View - is not an Atomic Context]:', context);
      this.userList.next(context.users);
    } else {

      const normalizedPath = normalizeFromURL(this.router.url, this.contactService.sessionUser.username);
      const normalizedName = normalizeName(normalizedPath);

      console.log('[ContextualComm View - get parent active context]:', normalizedPath);
      console.log('[ContextualComm View - get parent active context]:', normalizedName);

      let result: Observable<ContextualComm>;
      result = this.contextualCommDataService.getContextById(normalizedName.id);

      result.subscribe((parentContext: ContextualComm) => {
        console.log('[ContextualComm View - get parent context]:', parentContext);
        this.userList.next(parentContext.users);
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
    const parentEl = this.content.element.nativeElement.parentElement;
    const currentEl = this.content.element.nativeElement;
    const parentHeight = parentEl.offsetHeight;
    const topMargin = 60;
    const bottomPadding = 45;
    const height = parentHeight - (topMargin + bottomPadding) + 'px';
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
