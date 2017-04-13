import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthGuard } from '../../services/authGuard.service';

import { ContextualCommResolver } from '../../services/contextualComm.resolver';
import { UserResolver } from '../../services/user.resolver';

import { ContextualCommComponent } from './contextualComm.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';
import { UserViewComponent } from '../userView/user-view.component';

// TODO: Optimize the Resolve Context
const contextualCommRoutes: Routes = [
  {
    path: ':trigger',
    component: ContextualCommComponent,
    canActivate: [
      AuthGuard
    ],
    resolve: {
      context: ContextualCommResolver
    },
    children: [
      {
        path: '',
        component: ActivityViewComponent,
        resolve: {
          context: ContextualCommResolver
        },
      },
      {
        path: ':user',
        component: UserViewComponent,
        resolve: {
          user: UserResolver,
          context: ContextualCommResolver
        }
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
