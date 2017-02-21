import { Component, Input, Output, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Renderer, HostBinding, EventEmitter, ElementRef } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';

import { User, Message } from '../../models/models';

@Component({
  selector: 'div[content-box]',
  templateUrl: 'comp/user/content-box.comp.html'
})
export class ContentBox implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') hostClass = 'content-box user'

  @Input() messages:Observable<Array<Message>>

  private msgObs:Subscription;

  constructor(
    private cd:ChangeDetectorRef,
    private renderer: Renderer, 
    private el: ElementRef){}

  ngOnInit() {
    this.cd.detach();
  }

  ngAfterViewInit() {

 	  this.msgObs = this.messages.subscribe((messages: Array<Message>) => {

      setTimeout(() => {
        this.scrollToBottom();
      })

      this.cd.detectChanges();
      this.cd.markForCheck();
      this.cd.reattach();

    });

    this.updateView();
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.msgObs.unsubscribe();
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
