import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

// Components
import { ContextualCommComponent } from './contextualComm.component';
import { ActivityComponent } from '../activity/activity.component';
import { UserComponent } from '../user/user.component';

// Routes
import { contextRoutes } from './contextualComm.routing';

// Services
import { AuthGuard } from '../../services/services'
import { resolvesInjectables } from '../../services/resolves/resolves';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    contextRoutes
  ],
  declarations: [
    ContextualCommComponent,
    ActivityComponent,
    UserComponent
  ],
  providers: [
    AuthGuard,
    resolvesInjectables
  ]
})
export class ContextualCommModule {}
