import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { RethinkService } from '../../services/services';

@Component({
  moduleId: module.id,
  selector: 'home-view',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private context:string;
  private show:Boolean = false;
  private status: String;

  constructor(private route: ActivatedRoute, private rethinkService:RethinkService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

  }

}