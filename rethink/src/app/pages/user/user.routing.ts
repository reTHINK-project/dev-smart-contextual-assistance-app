import { Routes, RouterModule }  from '@angular/router';

// Components
import { UserComponent } from '../user/user.component';

export const userRoutes: Routes = [
  {
    path: 'user/:user',
    component: UserComponent,
    resolve: {
      user: {user: 'user'}
    }
  },
];
