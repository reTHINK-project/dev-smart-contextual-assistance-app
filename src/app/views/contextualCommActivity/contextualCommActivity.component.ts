import { Component,
  HostBinding, AfterViewInit,
  ElementRef, OnChanges, SimpleChange,
  Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';

import { Message, User } from '../../models/models';
import { Resource } from './../../models/models';
import { HypertyResourceType } from '../../models/rethink/HypertyResource';

import { ChatService } from '../../services/rethink/chat.service';
import { MediaModalModule } from '../../components/modal/mediaModal.module';
import { MediaModalComponent } from '../../components/modal/components/mediaModal.component';
import { MediaModalService } from '../../components/modal/services/mediaModal.service';
import { MediaModalType } from '../../components/modal/interfaces/mediaModal.type';
import { ContactService } from '../../services/contact.service';

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

  @Output() progressEvent: EventEmitter<any> = new EventEmitter();

  mergedResources: Observable<Message[] | Resource[]>;

  hypertyResourceType = HypertyResourceType;

  mergedResourcesSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private mediaModalService: MediaModalService,
    private contactService: ContactService,
    private chatService: ChatService) {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('CHANGES:', changes);
  }

  ngOnInit() {
    this.mergedResources = this.resources.mergeMap(v => this.messages, 1);

    this.mergedResourcesSubscription = this.mergedResources.subscribe((resources: Message[] | Resource[]) => {

      console.log('RESOURCEs: ', resources);

      // TODO: Check if exits other way to wait the dom have the last item added and remove this setTimeout
      setTimeout(() => { this.scrollToBottom(); });

    });
  }

  ngAfterViewInit() {

  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement;
    const parentEl: any = scrollPane.parentElement;
    if (parentEl) {
      parentEl.scrollTop = parentEl.scrollHeight;
    }

  }

  onViewImageEvent(data: any): void {

    this.chatService.readResource(data)
      .then(resource => this.mediaModalService.open(resource))
      .catch(reason => console.error(reason));

  }

  onDownloadEvent(data: any) {

    this.chatService.readResource(data)
      .then(resource => this.mediaModalService.open(resource))
      .catch(reason => console.error(reason));

  }

}
