import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

// Components
import { ContextualCommComponent } from './contextualComm.component';
import { ActivityComponent } from '../activity/activity.component';

// Routes
import { contextRoutes } from './contextualComm.routing';

// Services
import { AuthGuard } from '../../services/services'
import { ContextualCommResolve } from '../../services/contextualComm.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    contextRoutes
  ],
  declarations: [
    ContextualCommComponent,
    ActivityComponent
  ],
  providers: [
    AuthGuard,
    ContextualCommResolve
  ]
})
export class ContextualCommModule {}
