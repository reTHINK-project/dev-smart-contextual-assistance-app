import { Component, OnInit, AfterViewInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService, MessageService } from '../../services/services';

// Models
import { Message, ContextualComm } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'ul[activity-view]',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  private context: any;

  @Input()
  private messages:Observable<Message[]>;

  private chatActive: boolean = false;

  constructor( 
    private router: Router,
    private route: ActivatedRoute) {

  }

  // Load data ones componet is ready
  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('[Activity View  - AfterViewInit]');
  }

  ngOnDestroy() {
    
  }

}