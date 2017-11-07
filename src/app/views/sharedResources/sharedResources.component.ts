import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit, ElementRef, OnDestroy, HostBinding } from '@angular/core';

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

  @HostBinding('class') hostClass = 'resources-wrapper col-12 col-md-5 col-lg-4 mb-0 pt-3 pt-md-0 float-left h-100 d-flex flex-column';

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

    if (this.fileTranfer) {

      const el: HTMLElement = this.fileTranfer.element.nativeElement;

      if (el.classList.contains('open')) {
        el.classList.remove('open');
        this.previewOpen = false;
      } else {
        el.classList.add('open');
        this.previewOpen = true;
      }

    }

  }


  onViewImageEvent(event: any): void {

    event.preventDefault();

    const el: HTMLElement = event.currentTarget as HTMLElement;
    const url = el.getAttribute('data-url')

    this.chatService.readResource({url: url})
      .then(resource => this.mediaModalService.open(resource))
      .catch(reason => console.error(reason));
  }

}
