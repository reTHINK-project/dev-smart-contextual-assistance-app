import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule, AddPipe, DurationPipe } from 'angular2-moment';

// routing
import { AppRoutingModule } from './app-routing.module';

import { NotificationComponent } from './components/notification/notification.component';

import { ContextualCommModule } from './views/contextualComm/contextualComm.module';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';

import { ContextualCommUsersComponent } from './views/contextualCommUsers/contextualCommUsers.component';
import { UserIdentityComponent } from './components/rethink/userIdentity/userIdentity.component';
import { ContextBreadcrumbComponent } from './views/breadcrumb/breadcrumb.component';
import { MySelfComponent } from './components/mySelf/my-self.component';
import { AddUserComponent } from './views/contextualCommUsers/add-user.component';

// Services
import { servicesInjectables } from './services/services';

@NgModule({
  imports: [
    FormsModule,
    MomentModule,
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
    NotificationComponent,
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
