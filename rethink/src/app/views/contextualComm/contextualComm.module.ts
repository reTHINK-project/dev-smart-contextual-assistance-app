import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { MomentModule } from 'angular2-moment';

import { ContextualCommRoutingModule } from './contextualComm.routing';

// Generic Components
import { ContextNameValidatorDirective } from '../../shared/rethink.directive';
import { ContactBoxComponent } from '../../components/user/contact-box.component';

import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component';
import { MediaCommunicationComponent } from '../../components/rethink/communication/mediaCommunication.component';

import { ChatEventComponent } from '../../components/rethink/hypertyResource/chat/chatEvent.component';
import { FileEventComponent } from '../../components/rethink/hypertyResource/file/fileEvent.component';

// Components views
import { UserViewComponent } from '../userView/user-view.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';

// Components
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component';

// Custom Pipes
import { PipesModule } from '../../pipes/pipes';

// reTHinK Services
import { UserAvailabilityService } from '../../services/rethink/userAvailability.service';

// Services
import {
  AuthGuard,
  UserResolver,
  ContextualCommService,
  ContextualCommDataResolver,
  ContextualCommDataService,
  ContextualCommActivateService } from '../../services/services';

@NgModule({
  imports: [
    PipesModule,
    MomentModule,
    CommonModule,
    FormsModule,
    ContextualCommRoutingModule
  ],
  declarations: [
    ContextNameValidatorDirective,

    ContextualCommActivityComponent,
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
    UserAvailabilityService,
    ContextualCommDataService,
    ContextualCommDataResolver,
    ContextualCommActivateService
  ]
})
export class ContextualCommModule {}
