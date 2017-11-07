import { Component, OnInit, HostBinding, HostListener, OnDestroy, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Bootstrap
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

// Services
import { ContactService, RethinkService, ContextualCommDataService, ChatService } from '../../services/services';

// Models
import { User, ContextualComm } from '../../models/models';

// Utils
import { isAnUser, normalizeFromURL, normalizeName } from '../../utils/utils';

// Components
import { AddUserComponent } from '../contextualCommUsers/add-user.component';

// Directives
import { SidebarDirective } from '../../shared/directive.module';
import { ProgressEventType, ProgressEvent } from '../../models/app.models';

@Component({
  moduleId: module.id,
  selector: 'context-view',
  templateUrl: './contextualComm.component.html',
})
export class ContextualCommComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'context-view row no-gutters';
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;
  @ViewChild('sidebar', {read: ViewContainerRef}) sidebar: ViewContainerRef;

  @ViewChild(AddUserComponent) addUserComponent: AddUserComponent;

  allowAddUser = false;
  userList: Subject<User[]> = new BehaviorSubject([]);

  showProgressEvent = false;
  progressEvent = 1;

  private resourceProgressEvent: Subscription;
  private routeData: Subscription;
  private currentContext: Subscription;

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.updateView();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private appService: RethinkService,
    private config: NgbProgressbarConfig,
    private contextualCommDataService: ContextualCommDataService,
    private contactService: ContactService) {

      config.max = 100;
      config.animated = true;
      config.striped = true;
      config.type = 'info';
  }

  // Load data ones componet is ready
  ngOnInit() {
    console.log('[ContextualComm View - onInit]', this.content);

    this.routeData = this.route.data.subscribe((data: { context: ContextualComm, users: User[] }) => {
      this.updateCurrentContext(data.context);
    });

    this.currentContext = this.contextualCommDataService.currentContext().subscribe((context: ContextualComm) => {
      console.log('[ContextualComm View - active context change]:', context);
      this.updateCurrentContext(context);
    });

    this.resourceProgressEvent = this.chatService.onResourceProgress.subscribe((event: ProgressEvent) => {
      if (event.type === ProgressEventType.START) {
        this.showProgressEvent = true;
      }

      if (event.type === ProgressEventType.UPDATE) {
        this.progressEvent = event.value;
      }

      if (event.type === ProgressEventType.END) {
        this.progressEvent = 1;
        this.showProgressEvent = false;
      }

    });

  }

  ngAfterViewInit() {
    this.updateView();
  }

  ngOnDestroy() {
    this.currentContext.unsubscribe();
    this.routeData.unsubscribe();
  }

  updateView() {

    // TODO: try to put this code in Sidebar Directive
    // TODO: i tried but i can't do it;
    const element: HTMLElement = document.getElementById('sidebar');

    if (element.classList.contains('opened')) {
      element.classList.remove('opened');
    }

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

  onInviteEvent(value: any) {
    console.log('Invite some one: ', value);
  }

  onCloseEvent() {

  }

  onContactClick() {

  }

}
