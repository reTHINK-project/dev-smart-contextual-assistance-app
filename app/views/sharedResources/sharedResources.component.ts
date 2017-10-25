import { Component, OnInit, Input } from '@angular/core';

import { Resource } from './../../models/models';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'shared-resources',
  templateUrl: './sharedResources.component.html',
  styleUrls: ['./sharedResources.component.scss']
})
export class SharedResourcesComponent implements OnInit {

  @Input() resources: Subject<Resource>;

  constructor() { }

  ngOnInit() { }


}
