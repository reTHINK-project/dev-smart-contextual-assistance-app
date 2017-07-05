import { Title } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from './components/notification/notifications.module';
import { NotificationActionEvent, ActionType } from './components/notification/notifications/interfaces/notification.action-event';

import { NativeNotificationsService } from './components/notification/native-notifications.module';

import { config } from './config';

// Models
import { ContextualCommEvent, User,  ContextualComm } from './models/models';
import { TriggerActions } from './models/app.models';

// Utils
import { normalizeName, splitFromURL, isAnUser, clearMyUsername } from './utils/utils';

// Services
import { ContextualCommService } from './services/contextualComm.service';
import { ContextualCommDataService } from './services/contextualCommData.service';
import { TriggerActionService, RethinkService, ConnectorService, ChatService, ContactService } from './services/services';

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  private natNotFeedback: Subscription;
  private contextualCommEvent: Subscription;
  private actionService: Subscription;
  private connectorInvitation: Subscription;
  private chatInvitation: Subscription;

  private actionResult = new EventEmitter<{}>();

  notificationStatus;
  showAlert = false;

  contextOpened = false;
  ready = false;
  myIdentity: User;
  status: string;

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
    private natNotificationsService: NativeNotificationsService,
    private notificationsService: NotificationsService,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private triggerActionService: TriggerActionService,
    private contextualComm: ContextualCommService,
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

    this.contextualCommEvent = this.contextualComm.contextualCommEvent.subscribe((event: ContextualCommEvent) => {

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

  onClickClouse(event: any) {
    console.log('AQUI:', event);
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

  onOpenContext(event?: Event) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: any) {
    console.log(event);
    if (event && ((event.srcElement && event.srcElement.id === 'mp-pusher') || (event.target && event.target.id === 'mp-pusher'))) {
      this.contextOpened = false;
    }
  }

}
