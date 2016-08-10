import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'activity-list',
  templateUrl: 'app/components/contextualCommActivity/contextualCommActivity.component.html'
})
export class contextualCommActivityComponent implements OnInit {

  @Input() activities:Observable<any>;

  constructor() {}

  // Load data ones componet is ready
  ngOnInit() {

  }

}
