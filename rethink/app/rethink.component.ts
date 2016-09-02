import { Component, OnInit, ComponentResolver, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

// Application Components
import { ContextBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MySelfComponent } from './mySelf/my-self.component';

// Models
import { User } from '../models/models';

// Services
import { RethinkService, ChatService, ContextService } from '../services/services';

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
    private router: Router,
    private route: ActivatedRoute,
    private rethinkService: RethinkService,
    private chatService: ChatService,
    private compiler: ComponentResolver,
    private viewContainerRef: ViewContainerRef) {

    this.compiler.clearCache();
    this.viewContainerRef = viewContainerRef;

    this.rethinkService.loadRuntime()
    .then((runtime) => {
      this.status = 'Loading stubs service;';
      return this.rethinkService.loadStubs()
    }).then((result) => {
      console.log('Loading protostubs: ', result);
      return this.chatService.getHyperty()
    }, (error) => {
      console.log('Error: ', error);
    })
    .then((hyperty) => {
      this.status = 'Getting your identity';
      return this.rethinkService.getIdentity(hyperty)
    }, (error) => {
      this.status = error;
    })
    .then((user: any) => {
      this.rethinkService.setCurrentUser = user;
      this.myIdentity = user;
      this.status = 'The app is ready to be used';
    })

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.rethinkService.isAuthenticated().subscribe((logged) => {
      console.log('logged: ', logged);
      if (logged) {
        console.log('Redirect:', this.rethinkService.redirectUrl);

        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true,
          skipLocationChange: true
        };

        this.ready = true;

        this.router.navigate([decodeURIComponent(this.rethinkService.redirectUrl)], navigationExtras);

        console.log('REDIRECT: ', this.router.url );
      }
    })

  }

  onOpenContext() {

  }

  onClickOutside() {

  }

}
