import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Models
import { User } from './models/models';

// Services
import { RethinkService, ConnectorService, ChatService, ContactService } from './services/services';

@Component({
  moduleId: module.id,
  selector: 'rethink-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  private status: String;

  private myIdentity: User;
  private contextOpened = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private rethinkService: RethinkService,
    private connectorService: ConnectorService,
    private chatService: ChatService) {

    this.rethinkService.progress.subscribe({
      next: (v) => this.status = v
    });

  }

  ngOnInit() {

    this.rethinkService.progress.next('Loading runtime');
    return this.rethinkService.loadRuntime()
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
