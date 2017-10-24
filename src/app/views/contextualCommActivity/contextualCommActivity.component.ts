import { Component, HostBinding, AfterViewInit, ElementRef, OnChanges, SimpleChange, Input, OnInit, ViewChild } from '@angular/core';

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

  constructor(
    private el: ElementRef,
    private mediaModalService: MediaModalService,
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
    const parentEl: any = scrollPane.offsetParent;
    if (parentEl) {
      parentEl.scrollTop = parentEl.scrollHeight;
    }

  }

  onViewImageEvent(data: any): void {
    console.log('DATA:', data);

    const resource: any = this.chatService.resourceList.get(data.url);

    console.log('AQUI:', resource);
    // TODO: check why sometimes the identity comes empty;

    // const identity: User = JSON.parse(JSON.stringify(resource.identity.userProfile));

    resource.read().then((result: any) => {
      console.log('FILE READED:', result);

      const media: MediaModalType = {
        title: result.metadata.name,
        size: result.metadata.size,
        type: result.metadata.mimetype,
        // user: identity.userURL,
        mediaContentURL: result.content
      }

      console.log('MEDIA:', media, this.mediaModalService.open);
      this.mediaModalService.open(media);

    }).catch((reason: any) => {
      console.log('ERROR READING FILE:', reason);
    })

  }

}
