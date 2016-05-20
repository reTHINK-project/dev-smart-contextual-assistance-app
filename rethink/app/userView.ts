import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { RouteSegment, ROUTER_DIRECTIVES, OnActivate } from '@angular/router';

// Services
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { ContextService } from '../services/context.service';

// Interfaces
import { Contact } from '../comp/contact/contact';
import { Context } from '../comp/context/context';

// Components
import { UserComponent } from '../comp/user/user.comp';
import { ContextMenuComponent } from '../comp/context/menu.comp';
import { ContextSenderComponent } from '../comp/context/sender.comp';
import { FileShareListComponent } from '../comp/fileshare/filesharelist.comp';

@Component({
  selector: 'div[user]',
  templateUrl: 'app/view/userView.html',
  directives: [
    ROUTER_DIRECTIVES,
    FileShareListComponent, UserComponent,
    ContextMenuComponent, ContextSenderComponent
  ],
  providers: [
    ChatService
  ]
})

export class UserView implements OnActivate {
  @HostBinding('class') hostClass = 'content-panel'
  @HostBinding('id') id = 'user-view'

  @Output() contact:Contact
  @Output() context:Context

  private chat: any
  private chatActive = false
  private current:string

  constructor(
    private appService: AppService,
    private contextService: ContextService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.hypertyReady.subscribe(() => {
      this.activateChat();

      this._updateView();
    })
  }

  routerOnActivate(curr: RouteSegment): void {
    let id = curr.getParam('id');
    console.log('id: ', id);
    this.current = id;
  }

  activateChat() {

    this.appService.getContact(this.current)
    .then((contact) => this._getContext(contact))
    .catch((reason) => this._createChat())
    .then((chat: any) => this._createNewContext(chat))
    .then((context:Context) => this._getChat(context))
    .then((chat) => {
      this.chat = chat
      this.chatActive = true
    }).catch((reason) => { console.error(reason); })
  }

  onMessage(message: string) {

    console.log('MESSAGE:', message);

    // resource:string, contact:Contact, type: ActivityType, status:string, message:string
    this.contextService.updateContextActivity(
      this.chat.dataObject.url,
      this.contact,
      'message',
      'ok',
      message
    ).then((context) => {

      console.log('Update the context:', context);
      this.chat.send(message)
      this.context = context;
    })

  }

  private _updateView() {
    // // TODO: Optimize this to on resize
    let $ele = $(document);
    let contentHeight = $ele.height();
    let profile = 127;
    let sender = 62;
    let margin = 60;
    let height = contentHeight - (profile + sender + margin);

    console.log('update View', height, $ele)

    let scrollable = $ele.find('div[content-box]').height(height);
  }

  private _getChat(context: Context) {
    console.log('Have this context: ', context);
    console.log('Get a chat resource or create a new one with ', this.contact.name);

    this.context = context;

    if (this.chatService.chat && context) {
      return this.chatService.join(context.resource);
    }

  }

  private _createChat() {
    return this.chatService.create(this.contact.name, [this.contact]);
  }

  private _getContext(contact: Contact) {
    console.log('Get Context for this contact: ', contact);
    this.contact = contact;
    return this.contextService.getContextByName(contact.name)
  }

  private _createNewContext(chat: any) {
    console.info('creating a new one', chat);
    // name: string, resource: string, contacts:Contact[], activities:Activity[], type: ContextType = 'private'
    return this.contextService.createContext(
      this.contact.name,
      chat.dataObject.url,
      chat.dataObject.participants,
      [],
      'private'
    );
  }

}
