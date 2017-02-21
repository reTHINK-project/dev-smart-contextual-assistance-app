import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

import { User } from '../../models/models';

@Component({
  selector: 'div[notification-box]',
  templateUrl: 'comp/user/notification.comp.html'
})
export class NotificationBox implements OnInit {
  @HostBinding('class') hostClass = 'alert alert-info'

  @Input() model:User

  @Output('accept-call') acceptCall = new EventEmitter()
  @Output('reject-call') rejectCall = new EventEmitter()

  ngOnInit() {

  }
}
