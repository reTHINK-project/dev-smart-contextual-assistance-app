import { enableProdMode, provide } from '@angular/core';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { Application }    from './app/app';

import { ROUTER_PROVIDERS } from '@angular/router';

import { AppService }     from './services/app.service';
import { ContextService }     from './services/context.service';

let appService = new AppService()
appService.loadRuntime()

// enableProdMode();
bootstrap(Application, [ ROUTER_PROVIDERS, ContextService, provide(AppService, {useValue: appService}) ])
