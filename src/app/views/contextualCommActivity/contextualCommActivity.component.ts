import { Resource } from './../../models/models';
import { Component, HostBinding, AfterViewInit, ElementRef, OnChanges, SimpleChange, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../../models/models';
import { HypertyResourceType } from '../../models/rethink/HypertyResource';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';

@Component({
  moduleId: module.id,
  selector: 'context-activity-list',
  templateUrl: './contextualCommActivity.component.html'
})
export class ContextualCommActivityComponent implements OnChanges, OnInit, AfterViewInit {

  @HostBinding('class') hostClass = 'activity-list w-100 h-100';

  @Input() messages: Subject<Message[]>;
  @Input() resources: Subject<Resource[]>;
  @Input() eventMode = false;

  mergedResources: Observable<Message[] | Resource[]>;

  hypertyResourceType = HypertyResourceType;

  mergedResourcesSubscription: Subscription;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.mergedResources = this.resources.mergeMap(v => this.messages, 1);

    this.mergedResourcesSubscription = this.mergedResources.subscribe((resources: Message[] | Resource[]) => {

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
