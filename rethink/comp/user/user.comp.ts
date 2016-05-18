import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[user]',
  templateUrl: 'comp/user/user.comp.html'
})
export class UserComponent implements OnInit {
  @HostBinding('class') hostClass = 'content-panel all-75 large-65 xlarge-65 medium-100'

  ngOnInit() {

  }
}
