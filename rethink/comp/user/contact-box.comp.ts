import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User } from '../../models/models';

@Component({
  selector: 'div[contact-box]',
  templateUrl: 'comp/user/contact-box.comp.html'
})
export class ContactBox implements OnInit {
  @HostBinding('class') hostClass = 'contactbox padding all-100 small'

  @Input() model:Observable<User>

  private user:User;

  @Output('video-call') videoClick = new EventEmitter()
  @Output('audio-call') audioClick = new EventEmitter()

  ngOnInit() {
    console.log('HERE:', this.model)

    this.model.subscribe((user:User) => {
      this.user = user;
    });

  }
}
