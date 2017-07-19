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
import { Message, User, ContextualComm } from '../../models/models';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';
import { MediaCommunicationComponent } from '../../components/rethink/communication/mediaCommunication.component';

@Component({
  moduleId: module.id,
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  providers: [MediaCommunicationComponent]
})
export class UserViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') hostClass = 'view-content d-flex flex-column';

  @ViewChild(MediaCommunicationComponent) mediaComponent: MediaCommunicationComponent;
  @ViewChild(ContextualCommActivityComponent) contextualCommActivityComponent: ContextualCommActivityComponent;

  private paramsSubscription: Subscription;
  private currentContextSub: Subscription;

  action: string;
  user: User;
  messages: Subject<Message[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    });

    this.currentContextSub = this.contextualCommService.currentContext().subscribe((contextualComm: ContextualComm) => {
      console.log('[User View - ContextualCommActivity Component - update] - ', contextualComm);
      this.messages.next(contextualComm.messages);

      this.contextualCommActivityComponent.updateView();
    });

  }

  ngAfterViewInit(): void {
    // console.log('[User View] - ViewInit: ', this.fullscreenDirective)
  }

  ngOnDestroy() {
    console.log('[User View] - OnDestroy', this.messages);
    this.currentContextSub.unsubscribe();
  }

  onCallEvent(event: any) {
    this.mediaComponent.onFullscreen();
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
