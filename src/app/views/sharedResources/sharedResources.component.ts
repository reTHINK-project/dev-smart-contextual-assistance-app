import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

import { Resource } from './../../models/models';
import { Subscription } from 'rxjs/Subscription';
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
export class SharedResourcesComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() resources: Subject<Resource>;

  private resourcesSubscription: Subscription;

  previewOpen = true;

  @ViewChild('filetransfer', { read: ViewContainerRef }) fileTranfer: ViewContainerRef;

  constructor(
    private el: ElementRef,
    private chatService: ChatService,
    private contactService: ContactService,
    private mediaModalService: MediaModalService) { }

  ngOnInit() {

    this.resourcesSubscription = this.resources.subscribe(resource => this.scrollToBottom());

  }

  ngAfterViewInit() {

    if (this.fileTranfer) {
      const el: HTMLElement = this.fileTranfer.element.nativeElement;
      el.classList.add('open');
      this.previewOpen = true;
    }

    this.scrollToBottom();

  }

  ngOnDestroy() {
    this.resourcesSubscription.unsubscribe();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement;
    const parentEl: any = scrollPane.parentElement;
    if (parentEl) {
      parentEl.scrollTop = parentEl.scrollHeight;
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
