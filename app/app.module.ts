import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_BASE_HREF, Location } from '@angular/common';

// Service Worker Service
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgbModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

// routing
import { AppRoutingModule } from './app-routing.module';

// Utils
import { CustomUtils, getBaseLocation } from './utils/CustomUtils';

// Directives
import { DirectiveModules } from './shared/directive.module';

// components
import { AppComponent } from './app.component';
import { MySelfComponent } from './components/mySelf/my-self.component';
import { MediaModalModule } from './components/modal/mediaModal.module';
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
import { RemoveContextualCommComponent } from './views/contextualCommMenu/remove-contextualComm.component';

// Services
import { servicesInjectables } from './services/services';
import { MediaModalComponent } from './components/modal/components/mediaModal.component';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    DirectiveModules,
    ReactiveFormsModule,
    ContextualCommModule,
    BrowserAnimationsModule,
    environment.production ? ServiceWorkerModule.register('./ngsw-worker.js') : [],
    NgbModule.forRoot(),
    MediaModalModule.forRoot(),
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
    ContextualCommUsersComponent,
    RemoveContextualCommComponent,
  ],
  entryComponents: [
    UserIdentityComponent,
    ContextualCommComponent
  ],

  providers: [
    CustomUtils,
    servicesInjectables,
    {provide: APP_BASE_HREF, useValue: environment.baseHref}
  ],

  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
