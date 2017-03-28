import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { ContextualCommRoutingModule } from './contextualComm.routing';

// Generic Components
import { ContactBoxComponent } from '../../components/user/contact-box.component';

import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'
import { AudioCommunicationComponent } from '../../components/rethink/communication/audioCommunication.component';
import { VideoCommunicationComponent } from '../../components/rethink/communication/videoCommunication.component';

import { ChatEventComponent } from '../../components/rethink/hypertyResource/chat/chatEvent.component';
import { FileEventComponent } from '../../components/rethink/hypertyResource/file/fileEvent.component';

// Components views
import { UserViewComponent } from '../userView/user-view.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';

// Components
import { ContextualCommComponent } from './contextualComm.component';
import { ActivityComponent } from '../../components/activity/activity.component';
import { ActivityListComponent } from '../../components/activity/activitylist.component';
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'

// Services
import { AuthGuard } from '../../services/authGuard.service'
import { UserResolver } from '../../services/user.resolver';
import { ContextualCommResolver } from '../../services/contextualComm.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContextualCommRoutingModule
  ],
  declarations: [
    ContextualCommActivityComponent,
    ChatCommunicationComponent,
    ActivityViewComponent,
    ActivityListComponent,
    ActivityComponent,
    UserViewComponent,
    
    AudioCommunicationComponent,
    VideoCommunicationComponent,

    ContactBoxComponent,
    ChatEventComponent,
    FileEventComponent
  ],
  providers: [
    AuthGuard,
    UserResolver,
    ContextualCommResolver
  ]
})
export class ContextualCommModule {}
