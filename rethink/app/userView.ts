import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import { UserComponent } from '../comp/user/user.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/userView.html',
  directives: [
    ROUTER_DIRECTIVES,
    FileShareListComponent, UserComponent,
    ContextMenuComponent, ContextSenderComponent
  ]
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
