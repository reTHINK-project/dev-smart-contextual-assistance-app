import { Component, HostBinding, AfterViewInit, ElementRef, OnChanges, SimpleChange, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'ul[context-activity-list]',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnChanges, AfterViewInit {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list';

  @Input() messages: Subject<Message[]>;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngAfterViewInit() {

    this.messages.subscribe((messages: Message[]) => {

      setTimeout(() => {this.scrollToBottom(); });

    });

  }

  updateView(): void {

    // if (!this._canUpdateView()) { return; }

    // console.log('Can Update the view:', this._canUpdateView());

    // let scrollPane: any = this.el.nativeElement;
    // let parentEl: any = scrollPane.offsetParent;
    // let top = scrollPane.offsetTop;
    // let parentElHeight = parentEl.offsetHeight;

    // // TODO: replace the number for the sender box height;
    // let height = parentElHeight - (top + 62);
    // scrollPane.style.height = height + 'px';

    // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
    // setTimeout(() => {
    //   this.scrollToBottom();
    // });

  }

  scrollToBottom(): void {
    let scrollPane: any = this.el.nativeElement;
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
