import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'ul[contact-me]',
  templateUrl: 'comp/contact/me.html'
})
export class ContextMeComponent {
  @HostBinding('class') hostClass = 'push-right contactlist'

}
