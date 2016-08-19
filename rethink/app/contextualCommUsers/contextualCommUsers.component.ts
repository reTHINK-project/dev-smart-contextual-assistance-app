import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

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
  @Input() model:Array<User>;

  private contactsFilter:Array<User>;

  constructor(private route: ActivatedRoute, private appService:AppService) {}

  // Load data ones componet is ready
  ngOnInit() {

    // Subscribe to route params
    this.route.params.subscribe(params => {
      console.log('Context:', params);
    });

  }

  onContactClick(model:User) {
    console.log('aaa', model);
  }

  onFilterKey(event: any) {
    this.filter(event.target.value)
  }

  filter(value: string) {

    console.log('Contacts: ', this.model);

    this.contactsFilter = this.model.filter((user:User) => {
      return user.cn.includes(value);
    });
  }

}