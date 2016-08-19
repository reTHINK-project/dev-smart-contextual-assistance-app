import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'file-event',
  templateUrl: 'components/rethink/hypertyResource/file/fileEvent.component.html'
})
export class FileEventComponent implements OnInit {

  @Input() activity:any;

  ngOnInit() {
    
  }

}