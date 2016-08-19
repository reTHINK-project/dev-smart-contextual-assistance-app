import { Routes, RouterModule }  from '@angular/router'

// Services
import { ContextualCommResolve } from '../../services/contextualComm.resolve';

// Components
import { ContextualCommComponent } from './contextualComm.component'
import { ActivityComponent } from '../activity/activity.component';


// TODO Configure the Resolve
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
        component: ActivityComponent
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
        component: ActivityComponent
      }
    ]
  }
];

export const contextRoutes = RouterModule.forChild(context);
