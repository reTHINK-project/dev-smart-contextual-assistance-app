import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

// Utils
import { CustomUtils } from './utils/CustomUtils';

// TO ORGANIZE
import { ContextMenuComponent } from './views/contextualCommMenu/contextMenu.component';
import { AddContextualCommComponent } from './views/contextualCommMenu/add-contextualComm.component';


// components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ContextualCommModule } from './views/contextualComm/contextualComm.module';
import { NotificationComponent } from './components/notification/notification.component';
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
    ContextMenuComponent,
    NotificationComponent,
    UserIdentityComponent,
    ContextualCommComponent,
    AddContextualCommComponent,
    ContextBreadcrumbComponent,
    ContextualCommUsersComponent
  ],

  providers: [
    CustomUtils,
    servicesInjectables
  ],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
