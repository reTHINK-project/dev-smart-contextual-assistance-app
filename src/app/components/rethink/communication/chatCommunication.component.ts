import { Component,
        OnInit, Input, Output, OnDestroy,
        HostBinding, EventEmitter, ViewEncapsulation,
        ElementRef, ViewChildren, QueryList } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NativeNotificationsService } from '../../notification/native-notifications/services/native-notifications.service';
import { NotificationTag, NotificationVibrate } from '../../notification/native-notifications.module'

import { config } from '../../../config';

import { Message } from '../../../models/models';
import { ChatService } from '../../../services/services';
import { ContextualCommDataService } from '../../../services/contextualCommData.service';
import { AfterViewInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'chat-view',
  templateUrl: './chatCommunication.component.html'
})
export class ChatCommunicationComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'message-sender';

  @ViewChildren('formControlFile') formFile: QueryList<ElementRef>;

  @Input() active = false;
  @Output() onMessage = new EventEmitter();

  model = <any>{message: ''};

  private messages: Subscription;

  constructor(
    private chatService: ChatService,
    private natNotificationsService: NativeNotificationsService,
    private contextualCommDataService: ContextualCommDataService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    const inputFile: HTMLInputElement = this.formFile.first.nativeElement;

    inputFile.addEventListener('change', (event: Event) => {

      const currElem: HTMLInputElement = event.target as HTMLInputElement;
      let files: FileList

      if (currElem) {
        files = currElem.files;
        this.chatService.sendFile(files[0]).then((result) => {
          console.log('RESULT:', result);
        }).catch((reason) => {
          console.log('ERROR:', reason);
        });
      } else {
        return;
      }

    });

  }

  ngOnDestroy() {

  }

  onSubmit(event: any) {
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

  uploadFile(event: MouseEvent) {

    event.preventDefault();

    const inputFile: HTMLInputElement = this.formFile.first.nativeElement;

    const evt: MouseEvent = new MouseEvent('click');
    inputFile.dispatchEvent(evt);

  }

}
