import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContextualComm } from '../../models/models';

@Component({
  selector: 'remove-contextualcomm-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './remove-contextualComm.component.html'
})
export class RemoveContextualCommComponent implements OnInit {
  closeResult: string;

  @Input() modalTitle: string;
  @Input() context: ContextualComm

  @Output() removeEvent: EventEmitter<any> = new EventEmitter(true);

  constructor(private modalService: NgbModal) { }

  open(content: ElementRef) {

    this.modalService.open(content).result.then((result) => {

      if (result === 'yes') {
        this.removeEvent.emit({
          type: 'remove',
          context: this.context
        })
      } else {
        this.removeEvent.emit({
          type: 'dismissed',
          reason: this.getDismissReason(result)
        })
      }

    }, (reason) => {
      this.removeEvent.emit({
        type: 'dismissed',
        reason: this.getDismissReason(reason)
      })
    });

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

  ngOnInit() {

  }
}
