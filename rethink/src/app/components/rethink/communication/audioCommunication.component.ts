import { Component, Input, HostBinding } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User, Message } from '../../../models/models';

@Component({
  moduleId: module.id,
  selector: 'div[audio-view]',
  templateUrl: './audioCommunication.component.html'
})
export class AudioCommunicationComponent {
  @HostBinding('class') hostClass = 'audio-call all-100'

  @Input() user:User;

}
