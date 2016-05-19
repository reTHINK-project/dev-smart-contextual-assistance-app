import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { RouteSegment, ROUTER_DIRECTIVES } from '@angular/router';

import { AppService } from '../services/app.service';

import { Contact } from '../comp/contact/contact';

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

  private contact:Contact

  constructor(private appService: AppService) {}

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('id');
    console.log('id: ', id);

    this.appService.getContact(id).then((contact) => {
      this.contact = contact;

      // TODO: Get the context to this contact
      // return this.appService.getContext()
    });
  }

}
