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
import { RemoveContextEventType, RemoveContextEvent } from '../../models/app.models';

// Directives
import { SidebarDirective } from '../../shared/directive.module';
import { splitFromURL, normalizeName } from '../../utils/utils';

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
    private notificationsService: NotificationsService,
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

          this.notificationsService.error('Error', navigation.error, {
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
    this.contextSubscription.unsubscribe();

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

  removeContext(event: RemoveContextEvent, context: ContextualComm) {

    console.log('Context to be removed: ', event, context);

    const contextPathObj = normalizeName(context.id);

    if (event.type === RemoveContextEventType.Remove) {

      this.contextualCommDataService.removeContext(event.context)
        .subscribe((result: boolean) => {
          console.log('Success:', result);
          console.log('Context Remove Path:', this.basePath);

          const basePathObj = normalizeName(this.basePath);

          if (contextPathObj.id === basePathObj.id) {
            const parent = splitFromURL(basePathObj.id);
            console.log('Context Remove Path: ', parent);
            this.router.navigate([parent.context]);
          }

          console.log('Context Remove Path:', contextPathObj, basePathObj);

      },
        (error: any) => {
          this.notificationsService.error('Error removing context', error);
        })

    }

    if (event.type === RemoveContextEventType.Error) {
      this.notificationsService.error('Error removing context', event.reason);
    }

  }

}
