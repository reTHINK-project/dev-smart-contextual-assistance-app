import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Serives
import { ContextualCommDataService } from '../../services/contextualCommData.service';
import { ContextualComm } from '../../models/models';

@Component({
    moduleId: module.id,
    selector: 'add-contextualComm-view',
    templateUrl: './add-contextualComm.component.html',
    styleUrls: ['./add-contextualComm.component.css']
})

export class AddContextualCommComponent implements OnInit {

  private closeResult: string;

  model: any = {};

  icons: string[] = [
    'comments',
    'briefcase',
    'heart',
    'heartbeat',
    'film',
    'camera',
    'futbol-o',
    'gamepad',
    'graduation-cap',
    'cogs',
    'users'
  ];

  contextualComms: Observable<ContextualComm[]>;

  title = 'Add New context';

  constructor(
    private modalService: NgbModal,
    private contextualCommDataService: ContextualCommDataService) {

      this.model.icon = this.icons[0];

      this.contextualComms = this.contextualCommDataService.getContexts();

    }

  ngOnInit() { }

  open(content: any) {

    this.modalService.open(content, {windowClass: 'custom-modal'}).result.then((result) => {
      console.log('AQUI:', result);
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

  submitForm(value: any) {
    console.log('Submit:', value);
    this.contextualCommDataService.createContext(value.name, value.parent, value);
    this.clean();
  }

  clean() {
    this.model = {};
  }
}
