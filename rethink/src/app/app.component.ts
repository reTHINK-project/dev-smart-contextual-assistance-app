import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { User, ContextualComm } from './models/models';
import { TriggerActions } from './models/app.models';

// Utils
import { normalizeName } from './utils/utils';

// Services
import { ContextualCommDataService } from './services/contextualCommData.service';
import { TriggerActionService, RethinkService, ConnectorService, ChatService, ContactService } from './services/services';

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  ready = false;
  myIdentity: User;
  status: string;

  private contextOpened = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private triggerActionService: TriggerActionService,
    private contextualCommDataService: ContextualCommDataService,
    private connectorService: ConnectorService,
    private chatService: ChatService) {

    this.rethinkService.progress.subscribe({
      next: (v: string) => this.status = v
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

      });

      // Prepare the chat service to recive invitations
      this.chatService.onInvitation((event: any) => {
        console.log('[Chat Communication View - onInvitation] - event:', event);

        let error = (reason: any) => {
          console.log('Error:', reason);
        };

        this.chatService.join(event.url)
        .then((dataObject: any) => {

          let metadata = event.value;
          let name = metadata.name;

          console.log('[App Component - Join the parent context: ', name, dataObject);

          let normalizedName = normalizeName(name);

          console.log('AQUI:', name, normalizedName);

          return this.contextualCommDataService.joinContext(normalizedName.name, dataObject, normalizedName.parent);
        }).then((currentContext: ContextualComm) => {
          console.log('[App Component] - current context created: ', currentContext);
        }).catch(error);
    });

  }

  onOpenContext(event?: Event) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: Event) {
    if (event.srcElement.id === 'mp-pusher') {
      this.contextOpened = false;
    }
  }

}
