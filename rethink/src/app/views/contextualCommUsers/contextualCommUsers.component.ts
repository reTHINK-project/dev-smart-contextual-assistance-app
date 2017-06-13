import { Component, OnInit, AfterViewInit, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { RethinkService } from '../../services/services';

// Models
import { User } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'context-user-view',
  templateUrl: './contextualCommUsers.component.html'
})
export class ContextualCommUsersComponent implements OnInit, AfterViewInit {

  @HostBinding('class') hostClass = 'context-user-view contactlist all-100';

  @Output() contactClick = new EventEmitter();
  @Output() contactAdd = new EventEmitter();
  @Input() users: Observable<User[]>;

  // users: Subject<User[]> = new BehaviorSubject([]);

  contactsFilter: Observable<User[]>;

  basePath: string;
  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: RethinkService) {

      this.basePath = this.router.url;

      this.router.events.subscribe((navigation: NavigationEnd) => {
        console.log('[ContextualCommUsers] - ', navigation);

        if (navigation instanceof NavigationEnd) {
          let url = navigation.url;

          if (url.includes('@')) {
            url = url.substr(0, url.lastIndexOf('/'));
          }

          this.basePath = url;
        }

      });

      console.log('[ContextualCommUsers - constructor]', this.router, this.router.url);
    }

  // Load data ones componet is ready
  ngOnInit() {
    console.log('[contextualCommUsers - ngOnInit]', this.users);

    this.users.subscribe((users: User[]) => {
      this.filter('');
    });
  }

  ngAfterViewInit() {

    console.log('[contextualCommUsers - ngAfterViewInit]', this.users);

  }

  onFilterKey(event: any) {
    this.filter(event.target.value);
  }

  filter(value: string) {

    this.contactsFilter = this.users.map((users: User[]) => {
      return users.filter((user: User) => {
        console.log(user);
        return user.cn.includes(value);
      });
    });

  }

}
