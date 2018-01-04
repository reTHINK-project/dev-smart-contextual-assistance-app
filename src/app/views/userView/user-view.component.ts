import { Component, OnInit, OnDestroy, HostBinding,
  ContentChild,
  ViewChild, ViewChildren, AfterViewInit, HostListener
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

// Services
import { ContactService, ChatService, ContextualCommDataService } from '../../services/services';

// Models
import { Message, User, ContextualComm, Resource } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';
import { MediaCommunicationComponent } from '../../components/rethink/communication/mediaCommunication.component';

import { ScreenDirective } from '../../shared/directive.module';
import { ParamMap } from '@angular/router/src/shared';
import { normalizeName, normalizeFromURL, splitFromURL } from 'app/utils/utils';

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
    private contextualCommDataService: ContextualCommDataService ,
    private chatService: ChatService) {

    this.paramsSubscription = this.route.queryParams.subscribe((event: any) => {

      console.log('[User View] - router event change:', event, event['action']);
      this.action = event['action'];

    });

  }

  ngOnInit() {

    const path = this.router.url;
    const name = normalizeFromURL(path, this.contactService.sessionUser.email);
    const normalizedName: any = normalizeName(name);

    this.contextualCommDataService.getWhenReady(normalizedName.id).then((current) => {
      console.log('[User View] - ContextualCommData - Resolve - ', current);
      this.messages.next(current.messages);
      this.resources.next(current.resources);

      this.activateContext(current);

      this.isReady = true;

    }).catch((reason: any) => {
      console.log('[User View] - ContextualCommData - Resolve - user:', reason);
      this.goParent(normalizedName.parent);
    })

    this.route.data.forEach((data: { user: User, context: ContextualComm }) => {
      console.log('[User View] - Resolve data User: ', data.user);
      this.user = data.user;
    });

    this.currentContextSub = this.contextualCommDataService.getCurrentContext().subscribe((contextualComm: ContextualComm) => {
      console.log('[User View] - ContextualCommActivity Component - update - ', contextualComm);
      this.messages.next(contextualComm.messages);
      this.resources.next(contextualComm.resources);
    });

    console.log('[User View] - onInit: ', this.isReady);

  }

  mediaComponentReady(event: any) {

    console.log('[User View] - media component: ', this.screen)

    if (this.screen.getEnvironment().name === 'xs') {
      const a = event.component as MediaCommunicationComponent;
      a.onFullscreen();
    }

  }

  ngAfterViewInit(): void {

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

  private activateContext(context: ContextualComm) {
    console.log('[User View] - Set current context - ', context.url);
    this.chatService.activeDataObjectURL = context.url;
    this.contextualCommDataService.setCurrentContext(context);
  }

  private goParent(parent: string) {

    const pathObject = splitFromURL(parent, this.contactService.sessionUser.email);

    let path = pathObject.context || '/';
    if (pathObject.task) { path += pathObject.task; }

    console.log('[User View] - Something went wrong: ', pathObject, path);

    this.router.navigate([path]);
  }

  onAcceptCall() {
    console.log('[User View] - onAcceptCall');
  }

  onRejectCall() {
    console.log('[User View] - onRejectCall');
  }

  onCloseEvent() {
    const user: string = this.user.email;
    const url = this.router.url.replace('user/' + user, '');
    this.router.navigate([url], {relativeTo: this.route});
  }

}
