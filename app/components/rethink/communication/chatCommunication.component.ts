import { Component, OnInit, Input, Output, OnDestroy, HostBinding, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NativeNotificationsService } from '../../notification/native-notifications/services/native-notifications.service';
import { NotificationTag, NotificationVibrate } from '../../notification/native-notifications.module'

import { config } from '../../../config';

import { Message } from '../../../models/models';
import { ChatService } from '../../../services/services';
import { ContextualCommDataService } from '../../../services/contextualCommData.service';

@Component({
  moduleId: module.id,
  selector: 'chat-view',
  templateUrl: './chatCommunication.component.html'
})
export class ChatCommunicationComponent implements OnInit, OnDestroy {

  @HostBinding('class') hostClass = 'message-sender';

  @Input() active = false;
  @Output() onMessage = new EventEmitter();

  model = <any>{message: ''};

  private messages: Subscription;

  constructor(
    private chatService: ChatService,
    private natNotificationsService: NativeNotificationsService,
    private contextualCommDataService: ContextualCommDataService) {

    this.messages = this.chatService.onMessageEvent.subscribe((message: Message) => {

      this.natNotificationsService.create('New Message', {
        icon: message.user.avatar,
        body: message.message,
        tag: NotificationTag.NEW_MESSAGE,
        vibrate: NotificationVibrate.NEW_MESSAGE,
        sound: config.sounds + '/solemn.mp3',
        persistent: true
      }).subscribe((n: any) => {
        console.log('Native:', n, n.notification, n.event);

        n.notification.onclick = function(x: any) {
          console.log('Native:', x);
          window.focus();
          this.close();
        };

      });

    });

    }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.messages.unsubscribe();
  }

  onSubmit() {
    const message = this.model.message;

    if (message) {
      console.log('[Chat Communication View - onMessage] - Message:', message, this.chatService.chatControllerActive);
      this.chatService.send(message).then((sentMessage: any) => {
        console.log('[Activity View - onMessage] - message sent', sentMessage);
      });

      this.clean();
    }

  }

  onInvitation(event: any) {

    console.log('[Chat Communication View - onInvitation] - ', event);

    this.chatService.join(event).then((discoveredDataObject: any) => {

    }).catch((reason: any) => {
      console.log(reason);
    });

  }

  clean() {
    this.model.message = '';
  }

}
