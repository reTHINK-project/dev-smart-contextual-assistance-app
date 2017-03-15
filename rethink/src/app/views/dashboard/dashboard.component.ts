import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'dashboard-view',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private context:string;

  constructor(private route: ActivatedRoute) {}

  // Load data ones componet is ready
  ngOnInit() {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.context = params['context'];
      console.log('AQUI:', params);
    });
  }

}