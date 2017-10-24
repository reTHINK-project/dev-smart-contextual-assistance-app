import { Component, OnInit, Input,
  ViewEncapsulation, ViewChild, ViewContainerRef,
  ElementRef, AfterViewInit,
  EventEmitter, Output } from '@angular/core';

import { Message } from '../../../../models/models';

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'file-event',
  templateUrl: './fileEvent.component.html',
  styleUrls: ['./fileEvent.component.scss']
})
export class FileEventComponent implements OnInit, AfterViewInit {

  @Input() message: Message;
  @Input() isAnEvent = false;

  @Output() viewImageEvent: EventEmitter<any> = new EventEmitter();

  previewOpen = true;

  @ViewChild('filetransfer', { read: ViewContainerRef }) fileTranfer: ViewContainerRef;

  ngOnInit() {

  }

  ngAfterViewInit() {

    const el: HTMLElement = this.fileTranfer.element.nativeElement;
    el.classList.add('open');
    this.previewOpen = true;

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

  onViewImage(event: MouseEvent) {
    event.preventDefault();

    const el: HTMLElement = event.currentTarget as HTMLElement;

    this.viewImageEvent.emit({
      url: el.getAttribute('data-url')
    });

  }

}
