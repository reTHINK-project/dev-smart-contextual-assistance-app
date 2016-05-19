import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { Context } from '../context/context';

@Component({
  selector: 'div[content-box]',
  templateUrl: 'comp/user/content-box.comp.html'
})
export class ContentBox implements OnInit {
  @HostBinding('class') hostClass = 'content-box user'

  @Input() model:Context

  ngOnInit() {

  }
}
