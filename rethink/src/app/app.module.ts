import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

import { ContextualCommModule } from './pages/contextualComm/contextualComm.module';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContextualCommComponent } from './pages/contextualComm/contextualComm.component';

import { ContextualCommUsersComponent } from './pages/contextualCommUsers/contextualCommUsers.component';
import { UserIdentityComponent } from './components/rethink/userIdentity/userIdentity.component'
import { ContextBreadcrumbComponent } from './pages/breadcrumb/breadcrumb.component';
import { MySelfComponent } from './components/mySelf/my-self.component';
import { AddUserComponent } from './pages/user/add-user.component';

// Services
import { servicesInjectables } from './services/services';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ContextualCommModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    MySelfComponent,
    AddUserComponent,
    UserIdentityComponent,
    ContextualCommComponent,
    ContextBreadcrumbComponent,
    ContextualCommUsersComponent
  ],

  providers: [
    servicesInjectables
  ],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
