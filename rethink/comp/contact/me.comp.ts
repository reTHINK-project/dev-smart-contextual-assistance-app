import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'ul[contact-me]',
  templateUrl: 'comp/contact/me.comp.html'
})
export class ContactMeComponent {
  @HostBinding('class') hostClass = 'push-right contactlist'

}
