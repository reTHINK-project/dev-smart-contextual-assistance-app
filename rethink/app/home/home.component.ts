import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home-view',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {

  private context:string;

  constructor(private route: ActivatedRoute) {}

  // Load data ones componet is ready
  ngOnInit() {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.context = params['context'];
      console.log(params);
    });
  }

}