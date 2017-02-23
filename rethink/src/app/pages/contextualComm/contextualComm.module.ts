import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

// Components
import { ContextualCommComponent } from './contextualComm.component';
import { UserComponent } from '../user/user.component';

import { ContextualCommRoutingModule } from './contextualComm.routing';

// Generic Components
import { ChatEventComponent } from '../../components/rethink/hypertyResource/chat/chatEvent.component';
import { FileEventComponent } from '../../components/rethink/hypertyResource/file/fileEvent.component';

// Components
import { ActivityComponent } from '../../components/activity/activity.component';
import { ActivityListComponent } from '../../components/activity/activitylist.component';
import { ActivityViewComponent } from '../activityView/activity-view.component';
import { ContextualCommActivityComponent } from '../contextualCommActivity/contextualCommActivity.component'
import { ChatCommunicationComponent } from '../../components/rethink/communication/chatCommunication.component'

// Services
import { AuthGuard } from '../../services/authGuard.service'
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
    UserComponent,

    ChatEventComponent,
    FileEventComponent
  ],
  providers: [
    AuthGuard,
    ContextualCommResolver
  ]
})
export class ContextualCommModule {}
