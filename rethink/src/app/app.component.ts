import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { User, ContextualComm } from './models/models';

// Services
import { ContextualCommDataService } from './services/contextualCommData.service';
import { RethinkService, ConnectorService, ChatService, ContactService } from './services/services';

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
    private contextualCommDataService: ContextualCommDataService,
    private connectorService: ConnectorService,
    private chatService: ChatService) {

    this.rethinkService.progress.subscribe({
      next: (v: string) => this.status = v
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

        let metadata = event.value;
        let name = metadata.name;
        let names = name.split('-');
        let parentContext = names[0] + '-' + names[1];
        let currentContext = names[2];
        let foundDataObjects: any = [];

        let error = (reason: any) => {
          console.log('Error:', reason);
        };

        this.chatService.discovery().discoverDataObjectsPerName(parentContext).then((discoveredDataObject: any) => {

          let current: any = discoveredDataObject.sort((h1: any, h2: any) => {
            return h1.lastModified < h2.lastModified;
          })[0];

          return Promise.all([
            this.chatService.join(current.url),
            this.chatService.join(event.url)]);
        }, error)
        .then((dataObjects: any) => {
          foundDataObjects = dataObjects;
          console.log('[App Component] - ', dataObjects, parentContext, currentContext);

          if (parentContext.indexOf('-') !== -1) {
            parentContext = parentContext.substr(parentContext.indexOf('-') + 1);
          }

          // TODO: need to be more optimised, because we can have 3 levels
          // create the parent context;
          console.log('[App Component - Join the parent context: ', parentContext, dataObjects[0]);
          return this.contextualCommDataService.joinContext(parentContext, dataObjects[0]);
        }, error).then((parentContext: ContextualComm) => {
          console.log('[App Component] - parent context created: ', parentContext);
          return this.contextualCommDataService.joinContext(currentContext, foundDataObjects[1], parentContext.id);
        }, error).then((currentContext: ContextualComm) => {
          console.log('[App Component] - current context created: ', currentContext);
        });

      });
  }

  onOpenContext(event: Event) {
    this.contextOpened = !this.contextOpened;
  }

  onClickOutside(event: Event) {
    if (event.srcElement.id === 'mp-pusher') {
      this.contextOpened = false;
    }
  }

}
