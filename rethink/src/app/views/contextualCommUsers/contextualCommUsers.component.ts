import { Component, OnInit, OnDestroy, HostBinding, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// configs
import { config } from '../../config';

// Services
import { NotificationsService } from '../../components/notification/notifications.module';
import { ContextualCommDataService } from '../../services/contextualCommData.service';

// Models
import { User, ContextualComm } from '../../models/models';

// Directives
import { SidebarDirective } from '../../shared/directive.module';

@Component({
  moduleId: module.id,
  selector: 'context-user-view',
  templateUrl: './contextualCommUsers.component.html'
})
export class ContextualCommUsersComponent implements OnInit, OnDestroy {

  @ViewChild(SidebarDirective) sidebar: SidebarDirective;

  @HostBinding('class') hostClass = 'context-user-view d-flex flex-column justify-content-between';
  @Output() contactClick = new EventEmitter();
  @Output() contactAdd = new EventEmitter();

  @Input() users: Observable<User[]>;
  @Input() allowAddUser: boolean;

  contexts: ContextualComm[];

  contactsFilter: Observable<User[]> = new Observable();

  rootContext: string;
  basePath: string;
  hide = true;

  private events: Subscription;
  private currentUsers: Subscription;
  private paramsObserver: Subscription;
  private contextSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private contextualCommDataService: ContextualCommDataService
    ) {

      this.basePath = this.router.url;

      this.events = this.router.events.subscribe((navigation: NavigationEnd | NavigationError) => {
        console.log('[ContextualCommUsers] - ', navigation);

        if (navigation instanceof NavigationEnd) {
          let url = navigation.url;

          if (url.includes('@')) {
            url = url.substr(0, url.lastIndexOf('/'));
          }

          this.basePath = url;
        }

        if (navigation instanceof NavigationError) {

          this.notificationService.error('Error', navigation.error, {
            showProgressBar: false,
            timeOut: 3000,
            pauseOnHover: false,
            haveActions: false
          });
        }

      });

      this.paramsObserver = this.route.params.subscribe((params: any) => {
        console.log('[ContextualCommUsers] - params:', params);

        const context = params['context'];
        const id = config.appPrefix + '/' + context;

        this.rootContext = context;
        this.contextSubscription = this.contextualCommDataService.getContextTask(id)
          .subscribe(contexts => {
            console.log('[ContextualCommUsers] - contexts: ', contexts);
            this.contexts = contexts
          });

      });

      console.log('[ContextualCommUsers - constructor]', this.router, this.router.url);
    }

  // Load data ones componet is ready
  ngOnInit() {

    this.currentUsers = this.users.subscribe((users: User[]) => {
      console.log('[contextualCommUsers - subscribe]', users);
      this.filter('');
    });

    console.log('[contextualCommUsers - ngOnInit]', this.currentUsers);
  }

  ngOnDestroy() {

    this.currentUsers.unsubscribe();
    this.events.unsubscribe();
    this.paramsObserver.unsubscribe();

    console.log('[contextualCommUsers - ngOnDestroy]', this.events, this.paramsObserver);

  }

  onFilterKey(event: any) {
    this.filter(event.target.value);
  }

  filter(value: string) {

    this.contactsFilter = this.users.map((users: User[]) => {
      console.log('[contextualCommUsers - filter]:', users, value);
      return users.filter((user: User) => {
        console.log('[contextualCommUsers - filter]:', user, value);
        return user.cn.includes(value);
      });
    });

  }

  onCloseSidebarEvent($event: Event) {

    // TODO: try to put this code in Sidebar Directive
    // TODO: i tried but i can't do it;
    const element: HTMLElement = document.getElementById('sidebar');

    if (element.classList.contains('opened')) {
      element.classList.remove('opened');
    } else {
      element.classList.add('opened');
    }

  }

  removeContext(event: any, context: ContextualComm) {

    console.log('Context to be removed: ', event, context);

    if (event.type === 'remove') {

      this.contextualCommDataService.removeContext(event.context)
        .subscribe((result: boolean) => { console.log('Success:', result); },
        (error: any) => { console.warn('Error:', error); })

    }

  }

}
