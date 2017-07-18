import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

// Utils
import { CustomUtils } from './utils/CustomUtils';

// Directives
// import { SidebarDirective } from './shared/sidebar.directive';
import { DirectiveModules  } from './shared/directive.module';

// components
import { AppComponent } from './app.component';
import { MySelfComponent } from './components/mySelf/my-self.component';
import { NotificationsModule } from './components/notification/notifications.module';
import { UserIdentityComponent } from './components/rethink/userIdentity/userIdentity.component';
import { NativeNotificationsModule } from './components/notification/native-notifications.module';

// View Components
import { HomeComponent } from './views/home/home.component';
import { LoadingComponent } from './views/loading/loading.component';
import { AddUserComponent } from './views/contextualCommUsers/add-user.component';
import { ContextualCommModule } from './views/contextualComm/contextualComm.module';
import { ContextBreadcrumbComponent } from './views/breadcrumb/breadcrumb.component';
import { ContextMenuComponent } from './views/contextualCommMenu/contextMenu.component';
import { ContextualCommComponent } from './views/contextualComm/contextualComm.component';
import { AddContextualCommComponent } from './views/contextualCommMenu/add-contextualComm.component';
import { ContextualCommUsersComponent } from './views/contextualCommUsers/contextualCommUsers.component';

// Services
import { servicesInjectables } from './services/services';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    DirectiveModules,
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
    LoadingComponent,

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
