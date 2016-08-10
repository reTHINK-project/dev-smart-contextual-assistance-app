import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

// Application Components
import { ContextBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MySelfComponent } from './mySelf/my-self.component';

// Models
import { User } from '../models/models';

// Services
import { AppService, ChatService, ContextService } from '../services/services';

@Component({
  selector: 'rethink-app',
  templateUrl: 'app/rethink.component.html',
  directives: [
    ROUTER_DIRECTIVES,
    ContextBreadcrumbComponent,
    MySelfComponent
  ]
})
export class RethinkComponent implements OnInit {

  private status:string;
  private ready:boolean = false;

  private myIdentity:User;

  constructor(
    private appService: AppService,
    private chatService: ChatService) {

    this.status = 'Loading runtime;';
    this.appService.loadRuntime().then((runtime) => {
      this.status = 'Loading hyperty chat service;';
      return this.chatService.getHyperty()
    })
    .then((hyperty) => {
      this.status = 'Getting your identity';
      return this.appService.getIdentity(hyperty)
    })
    .then((user: any) => {
      this.appService.setCurrentUser = user;
      this.myIdentity = user;
      this.status = 'The app is ready to be used';
      this.ready = true;
    })

  }

  // Load data ones componet is ready
  ngOnInit() {
    
  }

  onOpenContext() {

  }

  onClickOutside() {

  }

}
