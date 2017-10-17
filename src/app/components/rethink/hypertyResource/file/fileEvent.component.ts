import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';

import { Message } from '../../../../models/models';
import { concat } from 'rxjs/operator/concat';
import { style } from '@angular/animations';

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
}
