import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './views/home/home.component';
import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';

// Services
import { AuthGuard } from './services/authGuard.service';
import { ContextualCommResolver } from './services/contextualComm.resolver';
import { ContextualCommModule } from './views/contextualComm/contextualComm.module';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}