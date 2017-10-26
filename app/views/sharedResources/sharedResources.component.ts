import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';

import { Resource } from './../../models/models';
import { Subject } from 'rxjs/Subject';

import { ChatService } from '../../services/rethink/chat.service';
import { ContactService } from '../../services/contact.service';
import { User } from '../../models/models';
import { MediaModalType } from '../../components/modal/interfaces/mediaModal.type';
import { MediaModalService } from '../../components/modal/services/mediaModal.service';

@Component({
  selector: 'shared-resources',
  templateUrl: './sharedResources.component.html',
  styleUrls: ['./sharedResources.component.scss']
})
export class SharedResourcesComponent implements OnInit, AfterViewInit {

  @Input() resources: Subject<Resource>;

  previewOpen = true;

  @ViewChild('filetransfer', { read: ViewContainerRef }) fileTranfer: ViewContainerRef;

  constructor(
    private chatService: ChatService,
    private contactService: ContactService,
    private mediaModalService: MediaModalService) { }

  ngOnInit() { }

  ngAfterViewInit() {

    if (this.fileTranfer) {
      const el: HTMLElement = this.fileTranfer.element.nativeElement;
      el.classList.add('open');
      this.previewOpen = true;
    }

  }

  onOpenResource(event: MouseEvent) {
    event.preventDefault();

    const el: HTMLElement = this.fileTranfer.element.nativeElement;

    if (el.classList.contains('open')) {
      el.classList.remove('open');
      this.previewOpen = false;
    } else {
      el.classList.add('open');
      this.previewOpen = true;
    }

  }


  onViewImageEvent(event: any): void {

    event.preventDefault();

    const el: HTMLElement = event.currentTarget as HTMLElement;
    const url = el.getAttribute('data-url')

    const resource: any = this.chatService.resourceList.get(url);

    // TODO: check why sometimes the identity comes empty;
    const identity: User = JSON.parse(JSON.stringify(resource.identity.userProfile));
    const user = this.contactService.getUser(identity.userURL);

    resource.read().then((result: any) => {

      const media: MediaModalType = {
        title: result.metadata.name,
        size: result.metadata.size,
        type: result.metadata.mimetype,
        user: user,
        mimetype: result.metadata.mimetype,
        mediaContentURL: result.content
      }

      this.mediaModalService.open(media);

    }).catch((reason: any) => {
      console.log('ERROR READING FILE:', reason);
    })

  }


}
