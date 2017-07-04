import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './views/home/home.component';

// Services
import { AuthGuard } from './services/services';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
