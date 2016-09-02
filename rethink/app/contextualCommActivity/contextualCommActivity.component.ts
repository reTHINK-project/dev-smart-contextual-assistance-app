import { Component, OnInit, Input, HostBinding, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Components
import { ChatEventComponent } from '../../components/rethink/hypertyResource/chat/chatEvent.component';
import { FileEventComponent } from '../../components/rethink/hypertyResource/file/fileEvent.component';

// Models
import { Message } from '../../models/models';

@Component({
  selector: 'ul[activity-list]',
  templateUrl: 'app/contextualCommActivity/contextualCommActivity.component.html',
  directives: [
    ChatEventComponent,
    FileEventComponent
  ]
})
export class ContextualCommActivityComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() messages:Observable<Message[]>;

  constructor(
    private el: ElementRef
  ){}

  // Load data ones componet is ready
  ngOnInit() {

    this.messages.subscribe((messages:Message[]) => {
      // TODO: Check if is really necessary use the timeout
      setTimeout(() => {
        this.updateView();
      })
    })

  }

  ngAfterViewInit() {
    this.updateView();
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

}
