import { Component, OnInit, Input, HostBinding, ElementRef, OnChanges, SimpleChange, AfterViewInit, AfterContentInit } from '@angular/core';
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
  selector: 'ul[context-activity-list]',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnChanges, AfterContentInit {
  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  @Input() private messages:Subject<Message[]>;

  constructor(private el:ElementRef){}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngAfterContentInit() {
    this.updateView();
  }

  updateView(): void {

    if (!this._canUpdateView()) return;

    console.log('Can Update the view:', this._canUpdateView())

    let scrollPane: any = this.el.nativeElement;
    let parentEl: any = scrollPane.offsetParent;
    let top = scrollPane.offsetTop;
    let parentElHeight = parentEl.offsetHeight;

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
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  private _canUpdateView(): boolean {
    let scrollPane: any = this.el.nativeElement;

    /* compares prev and current scrollHeight */
    let parentEl: any = scrollPane.offsetParent;

    console.log('scrollPane: ', scrollPane);
    console.log('parentElHeigh:', parentEl);

    return parentEl ? true : false;
  }

}
