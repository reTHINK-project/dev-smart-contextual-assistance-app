import { provideRouter, RouterConfig }  from '@angular/router'

import { HomeComponent } from './home/home.component';
import { contextRoutes } from './contextualComm/contextualComm.routes'
import { ContextualCommComponent } from './contextualComm/contextualComm.component'

const routes: RouterConfig = [
  {path: '', component: HomeComponent },
  ...contextRoutes,
];

export const appRouterProviders = [
  provideRouter(routes)
];