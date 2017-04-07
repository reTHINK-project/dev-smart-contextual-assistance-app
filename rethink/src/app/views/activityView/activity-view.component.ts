import { Component, HostBinding, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';

// Services
import { ChatService, ContextService } from '../../services/services';

// Models
import { Message, ContextualComm } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit {

  @HostBinding('class') hostClass = '';

  @ViewChild(ContextualCommActivityComponent)
  private contextualCommActivityComponent: ContextualCommActivityComponent;

  private messages: Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private contextService: ContextService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.route.data.forEach((data: { context: ContextualComm }) => {
      console.log('Resolve data Context: ', data.context);
      this.messages.next(data.context.messages);
    });

    this.contextService.contextualComm().subscribe((contextualComm: ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.contextualCommActivityComponent.updateView();
    });

  }

  onMessage(message: string) {

    console.log('[Activity View - onMessage] - Message:', message, this.chatService.chatControllerActive);
    this.chatService.send(message).then((message: any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    });

  }

}
