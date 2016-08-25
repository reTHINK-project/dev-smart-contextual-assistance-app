import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// Services
import { AppService } from '../../services/services';

// Models
import { User } from '../../models/models';

// Components
import { UserIdentityComponent } from '../../components/rethink/userIdentity/userIdentity.component'

@Component({
  selector: 'ul[context-user-view]',
  templateUrl: 'app/contextualCommUsers/contextualCommUsers.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    UserIdentityComponent
  ]
})
export class ContextualCommUsersComponent implements OnInit {

  @HostBinding('class') hostClass = 'context-user-view contactlist all-100'

  @Output() contactClick = new EventEmitter()
  @Output() contactAdd = new EventEmitter()
  @Input() model:Observable<User[]>;

  private contactsFilter:Observable<User[]>;

  constructor(private route: ActivatedRoute, private appService:AppService) {}

  // Load data ones componet is ready
  ngOnInit() {

    this.model.subscribe((users:User[]) => {
      this.filter('');
    });

  }

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {

    this.contactsFilter = this.model.map((users:User[]) => {
      return users.filter((user:User) => {
        return user.cn.includes(value);
      })
    });

  }

}