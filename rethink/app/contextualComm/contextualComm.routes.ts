import { provideRouter, RouterConfig }  from '@angular/router'

import { ContextualCommComponent } from './contextualComm.component'
import { ActivityComponent } from '../activity/activity.component';

// Services
import { CanActivateRoute } from '../../services/services';

export const contextRoutes: RouterConfig = [{ 
  path: '',
  component: ContextualCommComponent,
  canActivate: [CanActivateRoute],
  children: [
    { path: ':context', component: ActivityComponent },
    { path: ':context/:context', component: ActivityComponent }
  ]},
  
];