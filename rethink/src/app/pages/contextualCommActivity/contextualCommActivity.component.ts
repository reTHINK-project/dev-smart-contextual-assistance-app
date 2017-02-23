import { Component, OnInit, Input, HostBinding, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Models
import { Message, ContextualComm } from '../../models/models';

// Services
import { ChatService } from '../../services/rethink/chat.service';
import { ContextService } from '../../services/rethink/context.service';

@Component({
  moduleId: module.id,
  selector: 'context-activity-list',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  private messages:Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private chatService: ChatService,
    private contextService: ContextService,
    private el: ElementRef
  ){}

  // Load data ones componet is ready
  ngOnInit() {

    console.log('[ContextualCommActivityComponent - ngOnInit]');

    this.contextService.contextualComm().subscribe((contextualComm:ContextualComm) => {
      console.log('[ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.updateView();
    })

  }

  updateView(): void {

    // TODO: Solve the problem of try to scroll and adjust height before the ngAfterViewInit
    try {
      let scrollPane: any = this.el.nativeElement;
      let parentEl: any = scrollPane.offsetParent;
      let top = scrollPane.offsetTop;
      let parentElHeight = parentEl.offsetHeight;

      // TODO: replace the number for the sender box height;
      let height = parentElHeight - (top + 62);
      scrollPane.style.height = height + 'px';

      this.scrollToBottom();
    } catch (error) {
      
    }
    
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement;
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  onMessage(message:string) {

    this.chatService.send(message).then((message:any) => {
      console.log('[Activity View - onMessage] - message sent', message);
    })
    
  }

}
