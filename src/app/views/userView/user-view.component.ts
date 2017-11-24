import { Component, OnInit, OnDestroy, HostBinding,
  ContentChild,
  ViewChild, ViewChildren, AfterViewInit, HostListener
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, ChatService, ContextualCommService } from '../../services/services';

// Models
import { Message, User, ContextualComm, Resource } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';
import { MediaCommunicationComponent } from '../../components/rethink/communication/mediaCommunication.component';

import { ScreenDirective } from '../../shared/directive.module';

@Component({
  moduleId: module.id,
  selector: 'user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'view-content d-flex flex-column';

  @ViewChild(MediaCommunicationComponent) mediaComponent: MediaCommunicationComponent;
  @ViewChild(ContextualCommActivityComponent) contextualCommActivityComponent: ContextualCommActivityComponent;

  private paramsSubscription: Subscription;
  private currentContextSub: Subscription;

  action: string;
  user: User;
  isReady = false;

  messages: Subject<Message[]> = new BehaviorSubject([]);
  resources: Subject<Resource[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private screen: ScreenDirective,
    private contactService: ContactService,
    private contextualCommService: ContextualCommService,
    private chatService: ChatService) {

    this.paramsSubscription = this.route.queryParams.subscribe((event: any) => {

      console.log('[User View] - router event change:', event, event['action']);
      this.action = event['action'];

    });

  }

  ngOnInit() {

    this.route.data.forEach((data: { user: User, context: ContextualComm }) => {

      console.log('Resolve data User: ', data.user);
      console.log('Resolve data Context: ', data.context);
      this.user = data.user;

      this.messages.next(data.context.messages);
      this.resources.next(data.context.resources);
      this.isReady = true;
    });

    this.currentContextSub = this.contextualCommService.currentContext().subscribe((contextualComm: ContextualComm) => {
      console.log('[User View - ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);
      this.resources.next(contextualComm.resources);
    });
  }

  mediaComponentReady(event: any) {

    console.log('[User View] - media component: ', this.screen)

    if (this.screen.getEnvironment().name === 'xs') {
      const a = event.component as MediaCommunicationComponent;
      a.onFullscreen();
    }

  }

  ngAfterViewInit(): void {
    // console.log('[User View] - ViewInit: ', this.fullscreenDirective)
  }

  ngOnDestroy() {
    console.log('[User View] - OnDestroy', this.messages);

    if (this.currentContextSub) { this.currentContextSub.unsubscribe(); }
    if (this.paramsSubscription) { this.paramsSubscription.unsubscribe(); }

    this.isReady = false;
  }

  onCallEvent(event: any) {
    // this.mediaComponent.onFullscreen();
  }

  onAcceptCall() {
    console.log('[User View] - onAcceptCall');
  }

  onRejectCall() {
    console.log('[User View] - onRejectCall');
  }

  onCloseEvent() {
    const user: string = this.user.username;
    const url = this.router.url.replace('user/' + user, '');
    this.router.navigate([url], {relativeTo: this.route});
  }

}
