import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

// Utils
import { CustomUtils } from './utils/CustomUtils';

// TO ORGANIZE
import { ContextMenuComponent } from './views/contextualCommMenu/contextMenu.component';
import { AddContextualCommComponent } from './views/contextualCommMenu/add-contextualComm.component';

import { NativeNotificationsModule } from './components/notification/native-notifications.module';
import { NotificationsModule } from './components/notification/notifications.module';

// components
import { ContextBreadcrumbComponent } from './views/breadcrumb/breadcrumb.component';
import { MySelfComponent } from './components/mySelf/my-self.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SidebarDirective } from './views/contextualComm/sidebar.directive';
import { ContextualCommModule } from './views/contextualComm/contextualComm.module';
import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';

import { ContextualCommUsersComponent } from './views/contextualCommUsers/contextualCommUsers.component';
import { UserIdentityComponent } from './components/rethink/userIdentity/userIdentity.component';
import { AddUserComponent } from './views/contextualCommUsers/add-user.component';

// Services
import { servicesInjectables } from './services/services';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ContextualCommModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    NotificationsModule.forRoot(),
    NativeNotificationsModule,
    AppRoutingModule
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    MySelfComponent,
    AddUserComponent,
    SidebarDirective,
    ContextMenuComponent,
    UserIdentityComponent,
    ContextualCommComponent,
    AddContextualCommComponent,
    ContextBreadcrumbComponent,
    ContextualCommUsersComponent
  ],
  entryComponents: [
    UserIdentityComponent,
    ContextualCommComponent
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
