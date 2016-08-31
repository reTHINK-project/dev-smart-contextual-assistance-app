import { Routes, RouterModule }  from '@angular/router'

// Services
import { ContextualCommResolve, UserResolve } from '../../services/resolves/resolves';

// Components
import { ContextualCommComponent } from './contextualComm.component'
import { ActivityComponent } from '../activity/activity.component';

import { userRoutes } from '../user/user.routing';

// TODO: Optimize the Resolve Context
export const context: Routes = [
  {
    path: ':context',
    component: ContextualCommComponent,
    resolve: {
      context: ContextualCommResolve
    },
    children: [
      {
        path: '',
        component: ActivityComponent,
      },
      {
        path: ':id',
        component: ActivityComponent,
      },
      ...userRoutes
    ]
  },
  {
    path: ':context/:id',
    component: ContextualCommComponent,
    resolve: {
      context: ContextualCommResolve
    },
    children:[
      {
        path: '',
        component: ActivityComponent
      },
      ...userRoutes
    ]
  }
];

export const contextRoutes = RouterModule.forChild(context);
