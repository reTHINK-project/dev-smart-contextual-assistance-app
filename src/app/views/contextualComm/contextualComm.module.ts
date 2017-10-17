import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MomentModule } from 'angular2-moment';

import { ContextualCommRoutingModule } from './contextualComm.routing';

// Generic Components
import { ContextNameValidatorDirective } from '../../shared/rethink.directive';
import { DirectiveModules } from '../../shared/directive.module';

import { MediaCommunicationComponent } from '../../components/rethink/communication/mediaCommunication.component';
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component';

import { ChatEventComponent } from '../../components/rethink/hypertyResource/chat/chatEvent.component';
import { FileEventComponent } from '../../components/rethink/hypertyResource/file/fileEvent.component';

// Components views
import { ContactBoxComponent } from '../userView/contact-box.component';
import { UserViewComponent } from '../userView/user-view.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';
import { SharedResourcesComponent } from '../sharedResources/sharedResources.component';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';

// Custom Pipes
import { PipesModule } from '../../pipes/pipes';

// Services
import {
  AuthGuard,
  UserResolver,
  ContextualCommService,
  ContextualCommDataResolver,
  ContextualCommDataService } from '../../services/services';

@NgModule({
  imports: [
    PipesModule,
    MomentModule,
    CommonModule,
    FormsModule,
    DirectiveModules,
    ContextualCommRoutingModule
  ],
  declarations: [
    ContextNameValidatorDirective,

    ContextualCommActivityComponent,
    SharedResourcesComponent,
    ActivityViewComponent,
    UserViewComponent,

    ChatCommunicationComponent,
    MediaCommunicationComponent,

    ContactBoxComponent,
    ChatEventComponent,
    FileEventComponent
  ],
  providers: [
    AuthGuard,
    UserResolver,
    ContextualCommService,
    ContextualCommDataService,
    ContextualCommDataResolver
  ]
})
export class ContextualCommModule {}
