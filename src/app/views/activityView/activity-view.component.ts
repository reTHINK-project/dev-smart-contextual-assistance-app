import { Component, HostBinding, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';

// Models
import { Message, ContextualComm, Resource } from '../../models/models';
import { ContextualCommService } from '../../services/contextualComm.service';
import { ChatService } from '../../services/rethink/chat.service';

@Component({
  moduleId: module.id,
  selector: 'activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit {

  @HostBinding('class') hostClass = 'view-content d-flex flex-column';

  @ViewChild(ContextualCommActivityComponent)
  private contextualCommActivityComponent: ContextualCommActivityComponent;

  messages: Subject<Message[]> = new BehaviorSubject([]);
  resources: Subject<Resource[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private contextualCommService: ContextualCommService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.route.data.forEach((data: { context: ContextualComm }) => {
      console.log('Resolve data Context: ', data.context);
      this.messages.next(data.context.messages);
      this.resources.next(data.context.resources);
    });

    this.contextualCommService.currentContext().subscribe((contextualComm: ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);
      this.resources.next(contextualComm.resources);
    });

  }

}
