import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'activity-view',
    templateUrl: 'app/activity/activity.component.html',
    directives: [ROUTER_DIRECTIVES] 
})
export class ActivityComponent implements OnInit {

  private context: any

  constructor(private route: ActivatedRoute, private router:Router) {}

  // Load data ones componet is ready
  ngOnInit() {

    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.context = params['context']
      console.log(params);
    });
  }

}