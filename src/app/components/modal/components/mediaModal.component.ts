import { Component,
  OnInit,
  Input, ElementRef, AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef } from '@angular/core';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MediaModalService } from '../services/mediaModal.service';
import { MediaModalType } from '../interfaces/mediaModal.type';
import { deepClone } from '../../../utils/utils';

// TODO: should be used like a user with avatar, name, etc;
// At this moment, we are using the UserIdentity
import { User } from '../../../models/models';

@Component({
  selector: 'media-modal-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mediaModal.component.html',
  styleUrls: ['./mediaModal.component.scss']
})
export class MediaModalComponent implements OnInit, AfterViewInit {

  @ViewChild('content') content: ElementRef;

  @Input() title: string;
  @Input() description: string;
  @Input() mediaContentURL: string;
  @Input() size: string;
  @Input() type: string;
  @Input() user: User;

  modalData: MediaModalType = <MediaModalType>{};

  closeResult: string;
  status: string;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private mediaModalService: MediaModalService) { }

  open() {

    console.log('This Content: ', this.content);

    this.modalService.open(this.content, { windowClass: 'media-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  ngOnInit() {

    this.mediaModalService.openEvent.subscribe((data: MediaModalType) => {

      this.modalData = deepClone(data);

      const mimetype = data.type;
      let type;

      // TODO: improve the mimetype discovery
      if (mimetype.includes('image') ) {
        type = 'image';
      } else if (mimetype.includes('video')) {
        type = 'video';
      } else {
        type = 'file';
      }

      this.modalData.type = type;
      this.modalData.mimetype = mimetype;

      try {
        let blob;

        if (Array.isArray(data.mediaContentURL)) {
          blob = new Blob(data.mediaContentURL, { type: mimetype });
        } else {
          blob = new Blob([data.mediaContentURL], { type: mimetype });
        }

        const secureBlob = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        this.modalData.mediaContentURL = secureBlob;

        console.log('MODAL:', this.modalData);

        this.open();

      } catch (error) {
        console.error(error);
      }

    });

  }

  ngAfterViewInit() {

    if (this.title) { this.modalData.title = this.title; }
    if (this.description) { this.modalData.description = this.description; }
    if (this.mediaContentURL) { this.modalData.mediaContentURL = this.mediaContentURL; }
    /* if (this.user) { this.modalData.user = this.user; } */
    if (this.size) { this.modalData.size = this.size; }
    if (this.type) { this.modalData.type = this.type; }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

