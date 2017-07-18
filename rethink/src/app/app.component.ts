import { Title } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, HostListener, ViewChild, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from './components/notification/notifications.module';
import { NotificationActionEvent, ActionType } from './components/notification/notifications/interfaces/notification.action-event';

import { NativeNotificationsService } from './components/notification/native-notifications.module';

import { config } from './config';

// Models
import { ContextualCommEvent, User,  ContextualComm } from './models/models';
import { TriggerActions, PageSection } from './models/app.models';

// Utils
import { normalizeName, splitFromURL, isAnUser, clearMyUsername } from './utils/utils';

// Services
import { RoutingService } from './services/routing.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';
import { ContextualCommService } from './services/contextualComm.service';
import { ContextualCommDataService } from './services/contextualCommData.service';
import { TriggerActionService, RethinkService, ConnectorService, ChatService, ContactService } from './services/services';
import { NotificationEvent } from "./components/notification/notifications/interfaces/notification-event.type";

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {

  private natNotFeedback: Subscription;
  private contextualCommEvent: Subscription;
  private actionService: Subscription;
  private connectorInvitation: Subscription;
  private chatInvitation: Subscription;
  private routeData: Subscription;
  private routerEvent: Subscription;
  private connectorCancel: Subscription;

  private actionResult = new EventEmitter<{}>();

  context: ContextualCommComponent;

  notificationStatus;
  showBreadcrumb = false;
  showAlert = false;

  contextOpened = false;
  ready = false;
  myIdentity: User;
  status: string;

  @ViewChild('section') section: ElementRef;

  @HostListener('window:blur', ['$event']) onBlurEvent(event: any) {
    // console.log('[App Lost Focus] - blur:', event);
    this.natNotificationsService.haveFocus = false;
  }

  @HostListener('window:focus', ['$event']) onFocusEvent(event: any) {
    // console.log('[App Have Focus] - focus:', event);
    this.natNotificationsService.haveFocus = true;
  }

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private breadcrumbService: BreadcrumbService,
    private natNotificationsService: NativeNotificationsService,
    private notificationsService: NotificationsService,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private triggerActionService: TriggerActionService,
    private contextualCommService: ContextualCommService,
    private contextualCommDataService: ContextualCommDataService,
    private connectorService: ConnectorService,
    private chatService: ChatService) {

    this.natNotFeedback = this.natNotificationsService.requestPermission()
      .subscribe(
        success => {
          this.notificationStatus = success;
        },
        reason => {
          this.showAlert = true;
          this.notificationStatus = '<span class="font-weight-bold">Warning!</span> ' + reason;
        });

    this.rethinkService.progress.subscribe({
      next: (v: string) => { this.status = v; this.titleService.setTitle(config.pageTitlePrefix + v); }
    });

    this.actionService = this.triggerActionService.action().subscribe((action: TriggerActions) => {

      console.log('[App Component - TriggerActionService] - action: ', action);

      if (action === TriggerActions.OpenContextMenu) {
        this.onOpenContext();
      }

    });

    this.contextualCommEvent = this.contextualCommService.contextualCommEvent.subscribe((event: ContextualCommEvent) => {

      const title = 'New communication channel';
      const content = 'You have a new communication channel ' + event.contextualComm.name;

      this.notificationsService.success(title, content, {
        showProgressBar: true,
        timeOut: 5000,
        pauseOnHover: false,
        haveActions: false
      });

      this.natNotificationsService.create(title, {
        body: content,
        silent: false,
        sound: config.sounds + 'solemn.mp3',
      }).subscribe(this.nativeNotificationSubscription,
        (reason: any) => { console.log('Native Notification error:', reason); },
        () => { console.log('Native Notification Completed'); });

    });

  }

  ngOnInit() {

    this.rethinkService.progress.next('Loading runtime');

    this.rethinkService.loadRuntime()
      .then((runtime) => {
        this.rethinkService.progress.next('Loading chat service');
        return this.chatService.getHyperty();
      }, (error) => {
        console.log('Error: ', error);
        this.rethinkService.progress.error(error);
        return null;
      })
      .then((hyperty) => {
        this.rethinkService.progress.next('Loading connector service');
        return this.connectorService.getHyperty();
      }, (error) => {
        console.log('Error: ', error);
        this.rethinkService.progress.error(error);
        return null;
      })
      .then((hyperty) => {
        this.rethinkService.progress.next('Getting your identity');
        return this.rethinkService.getIdentity(hyperty);
      }, (error) => {
        this.rethinkService.progress.error(error);
      })
      .then((user: any) => {

        this.myIdentity = this.contactService.getUser(user.userURL);

        this.rethinkService.progress.next('The app is ready to be used');
        this.rethinkService.progress.complete();
        this.rethinkService.status.next(true);
        this.ready = true;

        this.hypertiesReady();

      });

  }

  ngAfterViewInit() {

    this.routeData = this.routingService.routingChanges.subscribe((pageSection: PageSection) => {
      console.log('[Routing Service Output] - ', pageSection);

      if (pageSection.section !== 'home') {
        this.showBreadcrumb = true;
      } else {
        this.showBreadcrumb = false;
      }

      this.section.nativeElement.setAttribute('data-section', pageSection.section );
    });

  }

  ngAfterContentInit() {

    this.routerEvent = this.router.events.subscribe((navigation: NavigationEnd) => {

      console.log('[App Component] - navigation: ', navigation);
      if (navigation instanceof NavigationEnd) {

        this.toggleSideBar();

      }

    })

  }

  hypertiesReady() {

    // Prepare the chat service to recive invitations
    this.chatInvitation = this.chatService.onInvitation.subscribe((event: any) => {
      console.log('[Chat Communication View - onInvitation] - event:', event);

      this.processEvent(event).then((result: any) => {
        console.log('[Chat Communication View - onInvitation] - event processed:', result);
      }).catch((reason) => {
        console.error('[Chat Communication View - onInvitation] - event not processed:', reason);
      });

    });

    this.connectorInvitation = this.connectorService.onInvitation.subscribe((event: any) => {

      console.log('[Media Communication Component] - event', event);

      const title = 'Incoming call';
      const content = 'A ' + event.mode + ' call is Incoming from ' + event.user.username;
      const avatar = event.user.avatar;

      this.notificationsService.create(title, content, 'info',
      {
        showProgressBar: false,
        pauseOnHover: false,
        haveActions: true,
        metadata: event
      }, avatar, this.actionResult);

      this.natNotificationsService.create(title, {
        icon: avatar,
        body: content,
        data: event,
        silent: false
      }).subscribe(
        this.nativeNotificationSubscription,
        (reason: any) => { console.log('Native Notification error:', reason); },
        () => { console.log('Native Notification Completed'); });

    }, (error: any) => {
      console.log('[Media Communication Component] - error', error);
    });

    this.actionResult.subscribe((a: any) => {
      console.log('[Media Communication Component] - Params Action:', a);

      this.actionEvent(a);
    });

    const currentNotifications: NotificationEvent[] = [];

    this.notificationsService.getChangeEmitter().subscribe((notification: NotificationEvent) => {
      console.log('NotificationService - notification', notification);

      if (notification.command === 'set') {
        currentNotifications.push(notification);
      }

    })

    this.connectorCancel = this.connectorService.onDisconnect.subscribe((event: any) => {

      console.log('Notification Service - onDisconnect', event);

      const currURL = event.url;
      let selected;

      if (currURL) {
        selected = currentNotifications.filter((not: NotificationEvent) => {

          if (not.notification.override.metadata.metadata.url === currURL) {
            return true
          }

          return false;
        })
      }

      if (selected.length === 1) {
        this.notificationsService.remove(selected[0].notification.id);
      } else {
        this.notificationsService.remove();
      }
    });

  }

  private processEvent(event: any) {

    return new Promise((resolve, reject) => {

      const url = event.url;
      const metadata = event.value;
      const name = metadata.name;

      this.chatService.join(url).then((dataObject: any) => {

        const normalizedName = normalizeName(name);
        console.log('[App Component - Join the to the context: ', name, dataObject, normalizedName);

        return this.contextualCommDataService.joinContext(normalizedName.name, normalizedName.id, dataObject, normalizedName.parent);
      }).then((currentContext: ContextualComm) => {
        console.log('[App Component] - current context created: ', currentContext);
        resolve(currentContext);
      }).catch((reason: any) => {
        console.log('Error:', reason);
        reject(reason);
      });

    });

  }

  actionEvent(actionEvent: NotificationActionEvent) {

    console.log('[Media Communication Component] -  Action Event: ', actionEvent);
    console.log('[Media Communication Component] -  Action Event: ', actionEvent.metadata);

    const metadata = actionEvent.metadata;
    const mode = metadata.mode;
    const currentUser = this.contactService.sessionUser.username;
    const paths: any = splitFromURL(metadata.metadata.name, currentUser);

    if (actionEvent.action === ActionType.ACCEPT) {

      const navigationExtras: NavigationExtras = {
        queryParams: { 'action': mode }
      };

      console.log('[Media Communication Component] -  navigate to: ', paths);
      console.log('[Media Communication Component] -  navigate to: ', paths.context, paths.task, paths.user);

      const navigationArgs = [paths.context];
      let userTo;

      if (isAnUser(paths.task)) {
        userTo = clearMyUsername(paths.task, currentUser);
      } else {
        navigationArgs.push(paths.task);
        userTo = clearMyUsername(paths.user, currentUser);
      }

      navigationArgs.push('user');
      navigationArgs.push(userTo);

      console.log('[Connector Service] -  navigate to path: ', navigationArgs);

      this.router.navigate(navigationArgs, navigationExtras);

    } else {

      console.log('[Media Communication Component] -  navigate to path: ', this.connectorService.getControllers);

      this.connectorService.getControllers['answer'].decline();

    }
  }

  nativeNotificationSubscription(n: any) {
    console.log('Native:', n, n.notification, n.event);

    n.notification.onclick = function(x: any) {
      console.log('Native:', x);
      window.focus();
      this.close();
    };

  }

  onOpenContext(event?: MouseEvent) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: any) {
    // console.log(event);
    if (event && ((event.srcElement && event.srcElement.id === 'mp-pusher') || (event.target && event.target.id === 'mp-pusher'))) {
      this.contextOpened = false;
    }
  }

  openSecondaryContext(event: MouseEvent) {

    const el: HTMLElement = event.currentTarget as HTMLElement;

    if (el) {
      if (el.classList.contains('opened')) {
        el.classList.remove('opened');
      } else {
        el.classList.add('opened');
      }
    }

    // TODO: try to put this code in Sidebar Directive
    // TODO: i tried but i can't do it;
    const element: HTMLElement = document.getElementById('sidebar');
    if (element) {
      if (element.classList.contains('opened')) {
        element.classList.remove('opened');
      } else {
        element.classList.add('opened');
      }
    }

  }


  toggleSideBar() {
    const element: HTMLElement = document.getElementsByClassName('menu-trigger')[0] as HTMLElement;
    const e: MouseEvent = new MouseEvent('click');

    console.log('[App Component] - navigation:', element, e);

    if (element && element.classList.contains('opened') ) {
      element.dispatchEvent(e);
    }

  }


  onActivate(event: any ) {

    if (event instanceof ContextualCommComponent) {
      this.context = event;
    }
  }

}
