import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthGuard } from '../../services/authGuard.service';

import { ContextualCommResolver } from '../../services/contextualComm.resolver';

import { ContextualCommComponent } from './contextualComm.component'
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';

import { ContextUserResolver } from '../../services/contextUser.resolver';

import { userRoutes } from '../user/user.routing';

// TODO: Optimize the Resolve Context
const contextualCommRoutes: Routes = [
  {
    path: 'context/:context',
    component: ContextualCommComponent,
    canActivate: [
      AuthGuard
    ],
    resolve: {
      context: ContextualCommResolver
    }/*,
    children: [
      {
        path: ':context',
        component: ActivityViewComponent,
      }// ,
      // ...userRoutes
    ]*/
  }/*,
  {
    path: ':context/:id',
    component: ContextualCommComponent,
    children:[
      {
        path: '',
        component: ActivityViewComponent
      },
      ...userRoutes
    ]
  }*/
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
