import { Routes, RouterModule }  from '@angular/router'

// Services
import { ContextualCommResolve, UserResolve } from '../../services/resolves/resolves';

// Components
import { ContextualCommComponent } from './contextualComm.component'
import { ActivityComponent } from '../activity/activity.component';
import { UserComponent } from '../user/user.component';

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
        resolve: {
          context: ContextualCommResolve
        },
      },
      {
        path: 'user/:user',
        component: UserComponent,
        resolve: {
          user: UserResolve,
          // context: ContextualCommResolve
        }
      }
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
        component: ActivityComponent,
        resolve: {
          context: ContextualCommResolve
        },
      },
      {
        path: 'user/:user',
        component: UserComponent,
        resolve: {
          user: UserResolve,
          context: ContextualCommResolve
        }
      }
    ]
  }
];

export const contextRoutes = RouterModule.forChild(context);
