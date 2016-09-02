import { Routes, RouterModule }  from '@angular/router';

// Services
import { UserResolve, ContextualCommResolve } from '../../services/resolves/resolves';

// Components
import { UserComponent } from '../user/user.component';

export const userRoutes: Routes = [
  {
    path: 'user/:user',
    component: UserComponent,
    resolve: {
      user: UserResolve
    }
  },
];
