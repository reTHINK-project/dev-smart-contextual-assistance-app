import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';

@Component({
  selector: 'div[user]',
  templateUrl: 'comp/user/user.comp.html'
})
export class UserComponent implements OnActivate {
  @HostBinding('class') hostClass = 'content-panel all-75 large-65 xlarge-65 medium-100'

  constructor(private router: Router) {}

  routerOnActivate(curr: RouteSegment): void {
    let id = +curr.getParam('id');
    console.log('id: ', id);
  }

  ngOnInit() {

    // let id = this.router.get('id');

  }


}
