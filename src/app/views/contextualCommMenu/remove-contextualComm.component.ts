import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContextualComm } from '../../models/models';

import { RemoveContextEvent, RemoveContextEventType } from '../../models/app.models';

@Component({
  selector: 'remove-contextualcomm-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './remove-contextualComm.component.html'
})
export class RemoveContextualCommComponent implements OnInit {
  closeResult: string;

  @Input() modalTitle: string;
  @Input() context: ContextualComm

  @Output() removeEvent: EventEmitter<RemoveContextEvent> = new EventEmitter(true);

  constructor(private modalService: NgbModal) { }

  open(content: ElementRef) {

    const numOfAtomic = this.context.contexts.filter(context => context.id.includes('user')).length;
    const numOfComposite = this.context.contexts.length - numOfAtomic;
    const isMainContext = (this.context.parent.length === 0);

    console.log(numOfAtomic, numOfComposite, isMainContext)

    if (numOfComposite > 0 && isMainContext) {
      this.removeEvent.emit({
        type: RemoveContextEventType.Error,
        context: this.context,
        reason: 'You can\'t remove a context which contains sub contexts'
      })

      return false;
    }

    this.modalService.open(content).result.then((result) => {

      if (result === 'yes') {
        this.removeEvent.emit({
          type: RemoveContextEventType.Remove,
          context: this.context
        })
      } else {
        this.removeEvent.emit({
          type: RemoveContextEventType.Dismissed,
          reason: this.getDismissReason(result)
        })
      }

    }, (reason) => {
      this.removeEvent.emit({
        type: RemoveContextEventType.Dismissed,
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
