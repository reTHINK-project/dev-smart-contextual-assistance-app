import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';
import { Contact } from '../../contact/contact';

export type ActivityType = 'message' | 'audio-call' | 'audio-call-failed' | 'video-call' | 'video-call-failed' | 'file-share'

export interface Activity {
  contact: Contact
  type: ActivityType
  date: string
  message?: string
  duration?: number
}

@Component({
  selector: 'li[context-activity]',
  templateUrl: 'comp/context/activity/activity.html'
})
export class ContextActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'half-padding'

  @Input() model: Activity

  ngOnInit() {
    if (this.model.contact.status === 'offline') {
      this.hostClass = 'half-padding offline'
    }
  }
}
