import { Component, OnInit, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, CanActivate } from '@angular/router';

// Services
import { AppService } from '../../services/services';

@Component({
  selector: 'context-view',
  templateUrl: 'app/contextualComm/contextualComm.component.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class ContextualCommComponent implements OnInit {

  @HostBinding('class') hostClass = ''

  private context:string;

  constructor(private route: ActivatedRoute, private appService:AppService) {}

  // Load data ones componet is ready
  ngOnInit() {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.context = params['context'];
      console.log(params);
    });
  }

}