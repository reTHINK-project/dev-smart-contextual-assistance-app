import { Component, OnInit, Input,
  ViewEncapsulation, ViewChild, ViewContainerRef,
  ElementRef, AfterViewInit,
  EventEmitter, Output } from '@angular/core';

import { Resource } from '../../../../models/models';
import { ProgressEvent, DownloadFileEvent, ProgressEventType } from '../../../../models/app.models';

@Component({
  moduleId: module.id,
  selector: 'resource-event',
  templateUrl: './resourceEvent.component.html',
  styleUrls: ['./resourceEvent.component.scss']
})
export class ResourceEventComponent implements OnInit, AfterViewInit {

  @Input() resource: Resource;
  @Input() isAnEvent = false;
  @Input() progress = 1;

  @Output() viewImageEvent: EventEmitter<DownloadFileEvent> = new EventEmitter();
  @Output() downloadEvent: EventEmitter<DownloadFileEvent> = new EventEmitter();

  progressEvent: EventEmitter<ProgressEvent> = new EventEmitter();

  showProgressEvent = false;

  previewOpen = true;

  @ViewChild('filetransfer', { read: ViewContainerRef }) fileTranfer: ViewContainerRef;

  ngOnInit() {

  }

  ngAfterViewInit() {

    if (this.fileTranfer) {

      const el: HTMLElement = this.fileTranfer.element.nativeElement;
      el.classList.add('open');
      this.previewOpen = true;

    }

    this.progressEvent.subscribe((progress: ProgressEvent) => {
      console.log('Progress Event: ', progress);

      if (progress.type === ProgressEventType.START) {
        this.showProgressEvent = true;
      }

      if (progress.type === ProgressEventType.UPDATE) {
        this.progress = progress.value;
      }

      if (progress.type === ProgressEventType.END) {
        this.showProgressEvent = false;
      }

    })

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

  onViewImage(event: MouseEvent) {
    event.preventDefault();

    const el: HTMLElement = event.currentTarget as HTMLElement;

    this.viewImageEvent.emit({
      url: el.getAttribute('data-url'),
      callback: this.progressEvent
    });

  }

  onDownloadFile(event: MouseEvent) {
    event.preventDefault();

    const el: HTMLElement = event.currentTarget as HTMLElement;

    this.downloadEvent.emit({
      url: el.getAttribute('data-url'),
      callback: this.progressEvent
    });
  }

}
