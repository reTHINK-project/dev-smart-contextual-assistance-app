import { Component, Input, Output, OnInit, AfterViewChecked, HostBinding, EventEmitter, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { User, Message } from '../../models/models';

@Component({
  selector: 'div[content-box]',
  templateUrl: 'comp/user/content-box.comp.html'
})
export class ContentBox implements OnInit {
  @HostBinding('class') hostClass = 'content-box user'

  @Input() messages: Observable<Message>

  constructor(private el: ElementRef){}

  ngOnInit() {
    
	  this.messages.subscribe((message:Message) => {

      setTimeout(() => {
        this.scrollToBottom();
      })

    });

    this.updateView();
    this.scrollToBottom();
  }

  updateView(): void {
    let scrollPane: any = this.el.nativeElement;
    let parentEl: any = scrollPane.offsetParent;
    let top = scrollPane.offsetTop;
    let parentElHeight = parentEl.offsetHeight;

    // TODO: replace the number for the sender box height;
    let height = parentElHeight - (top + 62);
    scrollPane.style.height = height + 'px';
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement;
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }


}
