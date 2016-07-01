import { provideRouter, RouterConfig } from '@angular/router';

import { ActivityView } from './activityView';
import { UserView } from './userView';

export const ActivityRoutes:RouterConfig = [
  { path: ':context/:task', component: ActivityView }
]

export const routes:RouterConfig = [
  ...ActivityRoutes,
  {path: ':context/:task/:id', component: UserView}
]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
