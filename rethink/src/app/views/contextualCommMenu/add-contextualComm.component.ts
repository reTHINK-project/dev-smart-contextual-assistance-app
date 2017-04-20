import { Component, OnInit } from '@angular/core';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'add-contextualComm-view',
    templateUrl: './add-contextualComm.component.html'
})

export class AddContextualCommComponent implements OnInit {

  private closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() { }

  open(content: any) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

}
