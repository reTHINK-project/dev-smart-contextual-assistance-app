import { Resource } from './../../models/models';
import { Component, HostBinding, AfterViewInit, ElementRef, OnChanges, SimpleChange, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../../models/models';
import { HypertyResourceType } from '../../models/rethink/HypertyResource';

import 'rxjs/add/operator/merge';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'context-activity-list',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnChanges, OnInit, AfterViewInit {

  @HostBinding('class') hostClass = 'activity-list w-100 h-100';

  @Input() messages: Subject<Message[]>;
  @Input() eventMode = false;

  resources: Subject<any[]> = new Subject();

  hypertyResourceType = HypertyResourceType;

  messageSubscription: Subscription;
  resourcesSubscription: Subscription;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.resources.merge(this.messages);

  }

  ngAfterViewInit() {

    this.resourcesSubscription = this.resources.subscribe((resources: Message[] | Resource[]) => {


      console.log('RESOURCEs: ', resources);

      // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
      setTimeout(() => { this.scrollToBottom(); });

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
