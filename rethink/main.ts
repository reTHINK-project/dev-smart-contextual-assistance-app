import { enableProdMode, provide } from '@angular/core';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { Application }    from './app/app';

import { ROUTER_PROVIDERS } from '@angular/router';

import { AppService }     from './services/app.service';
import { ChatService }    from './services/chat.service';
import { VideoService }   from './services/video.service';

import { ContextService }     from './services/context.service';

let appService = new AppService()
let chatService = new ChatService(appService)
let videoService = new VideoService(appService)
appService.loadRuntime().then((runtime) => {
  return chatService.getHyperty()
}).catch((reason) => {
  console.log('error Loading hyperty chat', reason);
}).then((hypertyChat) => {
  return videoService.getHyperty()
}).catch((reason) => {
  console.log('error Loading hyperty video', reason);
}).then((hypertyVideo) => {
  console.log('READY')
  // enableProdMode();
  bootstrap(Application, [ ROUTER_PROVIDERS, ContextService,
    provide(AppService, {useValue: appService}),
    provide(ChatService, {useValue: chatService}),
    provide(VideoService, {useValue: videoService})
  ])
})
