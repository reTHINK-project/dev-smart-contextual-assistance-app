import { Title } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, HostListener, ViewChild, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from './components/notification/notifications.module';
import { NotificationActionEvent, ActionType } from './components/notification/notifications/interfaces/notification.action-event';

import { NotificationEvent } from './components/notification/notifications/interfaces/notification-event.type';
import { NativeNotificationsService, NotificationTag, NotificationVibrate } from './components/notification/native-notifications.module';

import { config } from './config';

// Models
import { ContextualCommEvent, User, ContextualComm, Message } from './models/models';
import { TriggerActions, PageSection, RemoveContextEventType } from './models/app.models';

// Utils
import { normalizeName, splitFromURL, isAnUser, clearMyUsername, objectToPath } from './utils/utils';

import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';

// Services
import { RoutingService } from './services/routing.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { ContextualCommDataService } from './services/contextualCommData.service';
import { UserAvailabilityService } from './services/rethink/userAvailability.service';
import { TriggerActionService, RethinkService, ConnectorService, ChatService, ContactService } from './services/services';
import { NativeNotification } from './components/notification/native-notifications/interfaces/native-notification.type';
import { SwPush } from '@angular/service-worker';

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit {

  private natNotFeedback: Subscription;
  private contextualCommEvent: Subscription;
  private actionService: Subscription;
  private connectorInvitation: Subscription;
  private chatInvitation: Subscription;
  private routeData: Subscription;
  private routerEvent: Subscription;
  private connectorCancel: Subscription;
  private chatMessages: Subscription;
  private closeEvent: Subscription;
  private messagesEvent: Subscription;
  private connectorError: Subscription;

  private actionResult = new EventEmitter<{}>();

  basePath: string;

  context: ContextualCommComponent;

  notificationStatus: any;
  showBreadcrumb = false;
  showAlert = false;

  contextOpened = false;
  ready = false;
  myIdentity: User;
  status: string;

  assetsConfig: any = config;

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
    private chatService: ChatService,
    private rethinkService: RethinkService,
    private contactService: ContactService,
    private routingService: RoutingService,
    private connectorService: ConnectorService,
    private breadcrumbService: BreadcrumbService,
    private notificationsService: NotificationsService,
    private triggerActionService: TriggerActionService,
    private userAvailabilityService: UserAvailabilityService,
    private natNotificationsService: NativeNotificationsService,
    private contextualCommDataService: ContextualCommDataService) {
  }

  ngOnInit() {

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

    this.contextualCommEvent = this.contextualCommDataService.contextualCommEvent.subscribe((event: ContextualCommEvent) => {

      const title = 'New communication channel';
      const content = 'You have a new communication channel ' + event.contextualComm.name;

      this.notificationsService.success(title, content, {
        showProgressBar: false,
        timeOut: 5000,
        pauseOnHover: false,
        haveActions: false,
      });

      this.natNotificationsService.create(title, {
        body: content,
        tag: NotificationTag.INCOMING_CALL,
        vibrate: NotificationVibrate.INCOMING_CALL,
        persistent: true,
        sound: config.sounds + '/successful.mp3',
      });

    });


    this.messagesEvent = this.chatService.onMessageEvent.subscribe((message: Message) => {

      console.log('MESSAGE:', message);

      let title = 'New Message';
      const not: NativeNotification = {
        icon: '',
        body: '',
        tag: NotificationTag.NEW_MESSAGE,
        vibrate: NotificationVibrate.NEW_MESSAGE,
        sound: config.sounds + '/solemn.mp3',
        persistent: true
      };

      if (message.type === 'chat') {
        not.icon = message.user.picture;
        not.body = message.message;
      } else {
        title = 'New ' + message.type.charAt(0).toUpperCase() + message.type.substr(1);
        not.icon = message.user.picture;
        not.body = message.message.name;
      }

      this.natNotificationsService.create(title, not).subscribe((n: any) => {
        console.log('Native:', n, n.notification, n.event);

        n.notification.onclick = function (x: any) {
          console.log('Native:', x);
          window.focus();
          this.close();
        };

      });

    });


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
        this.rethinkService.progress.next('Loading user status availability service');

        return this.userAvailabilityService.getHyperty();
      })
      .then((hyperty) => {

        this.rethinkService.progress.next('The app is ready to be used');
        this.rethinkService.progress.complete();
        this.rethinkService.status.next(true);
        this.ready = true;

        this.hypertiesReady();
      }, (error) => {
        console.log('Error: ', error);
        this.rethinkService.progress.error(error);
        return null;
      })

  }

  ngAfterViewInit() {

    this.routerEvent = this.router.events.subscribe((navigation: NavigationEnd) => {

      if (navigation instanceof NavigationEnd) {

        console.log('[App Component] - navigation: ', navigation);

        this.toggleSideBar();

        let url = navigation.url;

        if (url.includes('@')) {
          url = url.substr(0, url.lastIndexOf('/'));
        }

      }


    })

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

  hypertiesReady() {

    this.closeEvent = this.chatService.onCloseEvent.subscribe((event: any) => {

      console.log('Context to be removed: ', event, event.url);

      this.contextualCommDataService.getContextByResource(event.url).subscribe((context: ContextualComm) => {

        this.contextualCommDataService.removeContext(context)
          .subscribe((result: boolean) => {
            this.notificationsService.info(
              'Context Removed',
              'The context ' + context.name + ' was been removed',
              {
                showProgressBar: false,
                timeOut: 5000,
                pauseOnHover: false,
                haveActions: false
              });
          },
          (error: any) => {
            this.notificationsService.error('Error removing context', error, {
              showProgressBar: false,
              timeOut: 5000,
              pauseOnHover: false,
              haveActions: false
            });
          });

      }, (reason: any) => {
        console.log('Context already been removed');
      }).unsubscribe();

    })

    this.connectorInvitation = this.connectorService.onInvitation.subscribe((event: any) => {

      console.log('[Media Communication Component] - event', event);

      const title = 'Incoming call';
      const content = 'A ' + event.mode + ' call is Incoming from ' + event.user.username;
      const picture = event.user.picture;

      this.natNotificationsService.create(title, {
        body: content,
        icon: picture,
        sound: config.sounds + '/classic-ringer.mp3',
        tag: NotificationTag.INCOMING_CALL,
        vibrate: NotificationVibrate.INCOMING_CALL,
        persistent: true,
        data: {
          metadata: event
        }
      }).subscribe((notEvent: any) => {
        console.log('notification:', notEvent)
      }, (error: any) => {
        console.warn('warning:', error);
      });

      this.notificationsService.create(title, content, 'info',
      {
        showProgressBar: false,
        pauseOnHover: false,
        haveActions: true,
        metadata: event,
        sound: config.sounds + '/classic-ringer.mp3',
      }, picture, this.actionResult)

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

          console.log('Notification Service - onDisconnect: ', not.notification);
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


    this.connectorError = this.connectorService.onError.subscribe((event: any) => {

      console.log('AQUI:', event);

      setTimeout(() => {

        this.notificationsService.error(event.title, event.description, {
         showProgressBar: false,
         timeOut: 5000,
         pauseOnHover: false,
         haveActions: false
       });

      }, 200);

    });

  }

  // private processEvent(event: any) {

  //   return new Promise((resolve, reject) => {

  //     const url = event.url;
  //     const metadata = event.value;
  //     const name = metadata.name;

  //     this.chatService.join(url).then((dataObject: any) => {

  //       const normalizedName = normalizeName(name);
  //       console.log('[App Component - Join the to the context: ', name, dataObject, normalizedName);

  //       return this.contextualCommDataService.joinContext(normalizedName.name, normalizedName.id, dataObject, normalizedName.parent);
  //     }).then((currentContext: ContextualComm) => {
  //       console.log('[App Component] - current context created: ', currentContext);
  //       resolve(currentContext);
  //     }).catch((reason: any) => {
  //       console.log('Error:', reason);
  //       reject(reason);
  //     });

  //   });

  // }

  actionEvent(actionEvent: NotificationActionEvent) {

    console.log('[Media Communication Component] -  Action Event: ', actionEvent);
    console.log('[Media Communication Component] -  Action Event: ', actionEvent.metadata);

    const metadata = actionEvent.metadata;
    const mode = metadata.mode;
    const currentUser = this.contactService.sessionUser.email;
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
