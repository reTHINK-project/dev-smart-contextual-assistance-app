import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ContextualCommUsersComponent implements OnInit {

  @HostBinding('class') hostClass = 'context-user-view contactlist all-100';

  @Output() contactClick = new EventEmitter();
  @Output() contactAdd = new EventEmitter();
  @Input() model: Observable<User[]>;

  contactsFilter: Observable<User[]>;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private appService: RethinkService) {
    }

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[contextualCommUsers - ngOnInit]', this.model);

    this.model.subscribe((users: User[]) => {
      this.filter('');
    });

  }

  onContactClick(model: User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value);
  }

  filter(value: string) {

    this.contactsFilter = this.model.map((users: User[]) => {
      return users.filter((user: User) => {
        console.log(user);
        return user.cn.includes(value);
      });
    });

  }

}
