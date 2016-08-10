import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

// Routes
import { appRouterProviders } from './app/rethink.routes';

// App Component
import { RethinkComponent } from './app/rethink.component';

// Services
import { servicesInjectables } from './services/services';

// enableProdMode();

bootstrap(RethinkComponent, [appRouterProviders, servicesInjectables])
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));

/*import { enableProdMode, provide } from '@angular/core';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { Application }    from './app/app';

import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { User } from './models/models';

import { AppService }     from './services/app.service';
import { ChatService }    from './services/chat.service';
import { VideoService }   from './services/video.service';
import { MessageService } from './services/message.service';
import { ContactService } from './services/contact.service';
import { LocalStorage }   from './services/storage.service';
import { servicesInjectables }   from './services/services';

import { ContextService }     from './services/context.service';

let localStorage = new LocalStorage();
let appService = new AppService();
let contactService = new ContactService(localStorage);
let messageService = new MessageService(appService, localStorage, contactService);
let contextService = new ContextService(localStorage, contactService, messageService);
let chatService = new ChatService(appService, contextService, contactService, messageService);
let videoService = new VideoService(appService);

appService.loadRuntime()
.then((runtime) => {
  return chatService.getHyperty()
})
// .catch((reason) => {
//   console.log('error Loading hyperty chat', reason);
// })
// .then((hypertyChat) => {
//   return videoService.getHyperty()
// }).catch((reason) => {
//   console.log('error Loading hyperty video', reason);
// })
.then((hypertyVideo) => {
  return appService.getIdentity(hypertyVideo)
}).then((user: User) => {
  console.log('READY');

  // enableProdMode();
  bootstrap(Application, [APP_ROUTER_PROVIDERS,
    provide(AppService, {useValue: appService}),
    provide(ChatService, {useValue: chatService}),
    provide(MessageService, {useValue: messageService}),
    provide(VideoService, {useValue: videoService}),
    provide(ContextService, {useValue: contextService}),
    provide(ContactService, {useValue: contactService})
  ]).catch(err => console.error(err));

});*/