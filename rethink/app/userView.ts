import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { RouteSegment } from '@angular/router';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/userView.html'
})
export class UserView implements OnInit {
  @HostBinding('class') hostClass = 'content-panel'

  ngOnInit() {

  }

  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('id');
    console.log('id: ', id);
  }

}
