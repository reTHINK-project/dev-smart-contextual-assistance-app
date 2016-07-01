import { enableProdMode, provide } from '@angular/core';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { Application }    from './app/app';

import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { User } from './models/models';

import { AppService }     from './services/app.service';
import { ChatService }    from './services/chat.service';
import { VideoService }   from './services/video.service';
import { LocalStorage }   from './services/storage.service';

import { ContextService }     from './services/context.service';

let appService = new AppService();
let localStorage = new LocalStorage();
let contextService = new ContextService(localStorage);
let chatService = new ChatService(appService, contextService);
let videoService = new VideoService(appService)
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
  return appService.getMyIdentity(hypertyVideo)
}).then((user: User) => {
  contextService.setCurrentUser = user;
  console.log('READY');

  // enableProdMode();
  bootstrap(Application, [APP_ROUTER_PROVIDERS,
    provide(LocalStorage, {useValue: localStorage}),
    provide(ContextService, {useValue: contextService}),
    provide(AppService, {useValue: appService}),
    provide(ChatService, {useValue: chatService}),
    provide(VideoService, {useValue: videoService})
  ]).catch(err => console.error(err));

});
