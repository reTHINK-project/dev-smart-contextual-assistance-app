import { Title } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { NotificationsService } from './components/notification/notifications.module';

import { config } from './config';

// Models
import { User, ContextualComm } from './models/models';
import { TriggerActions } from './models/app.models';

// Utils
import { normalizeName, splitFromURL, isAnUser, clearMyUsername } from './utils/utils';

// Services
import { ContextualCommDataService } from './services/contextualCommData.service';
import { TriggerActionService, RethinkService, ConnectorService, ChatService, ContactService } from './services/services';
import { NotificationActionEvent, ActionType } from "./components/notification/notifications/interfaces/notification.action-event";

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  ready = false;
  myIdentity: User;
  status: string;

  private actionResult = new EventEmitter<{}>();
  private contextOpened = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService,
    private connectorService: ConnectorService,
    private chatService: ChatService) {

    this.rethinkService.progress.subscribe({
      next: (v: string) => { this.status = v; this.titleService.setTitle(config.pageTitlePrefix + v); }
    });

    this.triggerActionService.action().subscribe((action: TriggerActions) => {

      console.log('[App Component - TriggerActionService] - action: ', action);

      if (action === TriggerActions.OpenContextMenu) {
        this.onOpenContext();
      }

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
    this.chatService.onInvitation((event: any) => {
      console.log('[Chat Communication View - onInvitation] - event:', event);

      this.processEvent(event).then((result: any) => {
        console.log('[Chat Communication View - onInvitation] - event processed:', result);
      }).catch((reason) => {
        console.error('[Chat Communication View - onInvitation] - event not processed:', reason);
      });

    });

    this.connectorService.onInvitation.subscribe((event: any) => {

      console.log('[Media Communication Component] - event', event);

      let title = 'Incoming call';
      let content = 'A ' + event.mode + ' call is Incoming from ' + event.user.username;

      this.notificationsService.create(title, content, 'info',
      {
        showProgressBar: false,
        pauseOnHover: false,
        haveActions: true,
        metadata: event
      }, event.user.avatar, this.actionResult);

    });

    this.actionResult.subscribe((a: any) => {
      console.log('[Media Communication Component] - Params Action:', a);

      this.actionEvent(a);
    });
  }

  private processEvent(event: any) {

    return new Promise((resolve, reject) => {

      let url = event.url;
      let metadata = event.value;
      let name = metadata.name;

      this.chatService.join(url).then((dataObject: any) => {

        let normalizedName = normalizeName(name);
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

    if (actionEvent.action === ActionType.ACCEPT) {

      let metadata = actionEvent.metadata;
      let mode = metadata.mode;
      let currentUser = this.contactService.sessionUser.username;
      let paths: any = splitFromURL(metadata.metadata.name, currentUser);

      let navigationExtras: NavigationExtras = {
        queryParams: { 'action': mode }
      };

      console.log('[Media Communication Component] -  navigate to: ', paths);
      console.log('[Media Communication Component] -  navigate to: ', paths.context, paths.task, paths.user);

      let navigationArgs = [paths.context];
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

      console.log('[Media Communication Component] -  navigate to path: ');
      // controller.decline();
    }
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
