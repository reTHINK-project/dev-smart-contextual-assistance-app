// import { enableProdMode } from '@angular/core';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';

import { Application }   from './app/app';

// enableProdMode();
bootstrap(Application, [
  ROUTER_PROVIDERS
]);
