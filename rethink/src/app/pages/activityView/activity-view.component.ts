import { Component, ElementRef, HostBinding, Input, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService, MessageService } from '../../services/services';

// Models
import { Message, ContextualComm } from '../../models/models';

@Component({
  moduleId: module.id,
  selector: 'ul[activity-view]',
  templateUrl: './activity-view.component.html'
})
export class ActivityViewComponent implements OnChanges {

  @HostBinding('class') hostClass = 'all-75 large-65 xlarge-65 medium-100 activity-list'

  private context: any;

  @Input()
  private messages:Observable<Message[]>;

  private chatActive: boolean = false;

  constructor(private el:ElementRef) {

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
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
  }

}