import { Component, HostBinding, Input, ViewChild, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';

// Services
import { ChatService, MessageService, ContextService } from '../../services/services';

// Models
import { Message, ContextualComm } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'activity-view',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnInit {

  @HostBinding('class') hostClass = ''

  @ViewChild(ContextualCommActivityComponent)
  private contextualCommActivityComponent: ContextualCommActivityComponent;

  private context: any;
  private messages:Subject<Message[]> = new BehaviorSubject([]);

  private chatActive: boolean = false;

  constructor(
    private chatService: ChatService,
    private contextService: ContextService) {

  }

  // Load data ones componet is ready
  ngOnInit() {

    this.contextService.contextualComm().subscribe((contextualComm:ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.contextualCommActivityComponent.updateView();
    })

  }

  onMessage(message:string) {

    this.chatService.send(message).then((message:any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    })
    
  }

/*  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);

    this.updateView();
  }

  updateView(): void {

    let scrollPane: any = this.el.nativeElement;
    let parentEl: any = scrollPane.offsetParent;
    let top = scrollPane.offsetTop;
    let parentElHeight = parentEl.offsetHeight;

    console.log('scrollPane: ', scrollPane);
    console.log('parentElHeigh:', parentElHeight);

    // TODO: replace the number for the sender box height;
    let height = parentElHeight - (top + 62);
    scrollPane.style.height = height + 'px';

    // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
    setTimeout(() => {
      this.scrollToBottom();
    })
    
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement;

    console.log('scrollPane: ', scrollPane);
    console.log('parentElHeigh:', scrollPane.scrollHeight, scrollPane.offsetHeight);

    scrollPane.scrollTop = scrollPane.scrollHeight;
  }*/

}