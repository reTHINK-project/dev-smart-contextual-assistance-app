import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './CustomURLSerializer';

// @NgModule({
//   declarations: [ TimeElapsedPipe ],
//   imports: [ CommonModule],
//   exports: [ TimeElapsedPipe ]
// })

export const CustomUtils = [{ provide: UrlSerializer, useClass: CustomUrlSerializer }];

