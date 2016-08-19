import { Routes, RouterModule }  from '@angular/router'

import { HomeComponent } from './home/home.component';
import { context } from './contextualComm/contextualComm.routing';

// Services
import { AuthGuard } from '../services/services';

// Components
import { ContextualCommComponent } from './contextualComm/contextualComm.component'

// TODO: Solve the problem of get the module to the Dist folder;
const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    loadChildren: 'dist/app/contextualComm/contextualComm.module#ContextualCommModule',
    canActivate: [
      AuthGuard
    ]
  }
];

export const routing = RouterModule.forRoot(routes)