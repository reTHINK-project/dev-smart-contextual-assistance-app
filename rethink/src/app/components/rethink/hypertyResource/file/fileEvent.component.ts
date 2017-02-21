import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'file-event',
  templateUrl: './fileEvent.component.html'
})
export class FileEventComponent implements OnInit {

  @Input() activity:any;

  ngOnInit() {
    
  }

}