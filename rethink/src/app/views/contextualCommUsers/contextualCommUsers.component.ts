import { Component, OnInit, OnDestroy, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// configs
import { config } from '../../config';

// Services
import { ContextualCommDataService } from '../../services/contextualCommData.service';

// Models
import { User, ContextualComm } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'context-user-view',
  templateUrl: './contextualCommUsers.component.html'
})
export class ContextualCommUsersComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = 'context-user-view d-flex flex-column justify-content-between';

  @Output() contactClick = new EventEmitter();
  @Output() contactAdd = new EventEmitter();

  @Input() users: Subject<User[]>;
  @Input() allowAddUser: boolean;

  contexts: Observable<ContextualComm[]>;

  contactsFilter: Observable<User[]> = new Observable();

  rootContext: string;
  basePath: string;
  hide = true;

  private events: Subscription;
  private currentUsers: Subscription;
  private paramsObserver: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contextualCommDataService: ContextualCommDataService
    ) {

      this.basePath = this.router.url;

      this.events = this.router.events.subscribe((navigation: NavigationEnd) => {
        console.log('[ContextualCommUsers] - ', navigation);

        if (navigation instanceof NavigationEnd) {
          let url = navigation.url;

          if (url.includes('@')) {
            url = url.substr(0, url.lastIndexOf('/'));
          }

          this.basePath = url;
        }

      });

      this.paramsObserver = this.route.params.subscribe((params: any) => {
        console.log('[ContextualCommUsers] - params:', params);

        let context = params['context'];
        let id = config.appPrefix + '/' + context;

        this.rootContext = context;
        this.contexts = this.contextualCommDataService.getContextTask(id);

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
      console.log('[contextualCommUsers - filter]:', users);
      return users.filter((user: User) => {
        console.log('[contextualCommUsers - filter]:', user);
        return user.cn.includes(value);
      });
    });

  }

}
