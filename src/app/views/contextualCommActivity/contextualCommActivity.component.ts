import { Component, HostBinding, AfterViewInit, ElementRef, OnChanges, SimpleChange, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'context-activity-list',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnChanges, AfterViewInit {

  @HostBinding('class') hostClass = 'activity-list w-100 h-100';

  @Input() messages: Subject<Message[]>;
  @Input() eventMode = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngAfterViewInit() {

    this.messages.subscribe((messages: Message[]) => {

      // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
      setTimeout(() => {this.scrollToBottom(); });

    });

  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement;
    const parentEl: any = scrollPane.offsetParent;
    if (parentEl) {
      parentEl.scrollTop = parentEl.scrollHeight;
    }

  }

}
