import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

// Services
import { AppService } from '../../services/app.service';

// Model
import { Contact } from './contact';

@Component({
  selector: 'ul[contact-me]',
  templateUrl: 'comp/contact/me.comp.html'
})
export class ContactMeComponent {
  @HostBinding('class') hostClass = 'push-right contactlist'

  constructor(private appService:AppService ) {}

  @Input() model:Contact;

}
