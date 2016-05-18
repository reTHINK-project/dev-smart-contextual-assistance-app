import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[contact-box]',
  templateUrl: 'comp/user/contact-box.html'
})
export class ContactBox implements OnInit {
  @HostBinding('class') hostClass = 'contactbox padding all-100 small'

  ngOnInit() {

  }
}
