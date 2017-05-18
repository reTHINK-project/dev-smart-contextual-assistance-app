import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthGuard } from '../../services/services';

import { ContextualCommDataResolver } from '../../services/contextualCommData.resolver';
import { UserResolver } from '../../services/user.resolver';

import { ContextualCommComponent } from './contextualComm.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';
import { UserViewComponent } from '../userView/user-view.component';

// TODO: Optimize the Resolve Context
const contextualCommRoutes: Routes = [
  {
    path: ':context',
    component: ContextualCommComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      context: ContextualCommDataResolver
    },
    children: [
      {
        path: '',
        component: ActivityViewComponent,
        resolve: {
          context: ContextualCommDataResolver
        }
      },
      {
        path: ':task',
        component: ActivityViewComponent,
        resolve: {
          context: ContextualCommDataResolver
        },
        children: [
          {
            path: ':user',
            component: UserViewComponent,
            resolve: {
              user: UserResolver
              // context: UserContextualCommResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(contextualCommRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContextualCommRoutingModule {}
