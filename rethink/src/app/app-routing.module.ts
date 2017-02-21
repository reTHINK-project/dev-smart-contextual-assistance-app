import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { ContextualCommComponent } from './pages/contextualComm/contextualComm.component';

// Services
import { ContextualCommResolver } from './services/contextualComm.resolver';
import { ContextualCommModule } from './pages/contextualComm/contextualComm.module';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full'},
  { 
    path: 'home',
    component: HomeComponent
  }// ,
  // { 
    // path: 'context',
    // component: ContextualCommComponent
    /*resolve: {
      data: ContextualCommResolver
    },
    children: [
      ...ContextualCommRouting
    ]*/
  // }
  // { path: 'detail/:id', component: HeroDetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}