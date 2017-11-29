import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './CustomURLSerializer';

// @NgModule({
//   declarations: [ TimeElapsedPipe ],
//   imports: [ CommonModule],
//   exports: [ TimeElapsedPipe ]
// })

export const CustomUtils = [{ provide: UrlSerializer, useClass: CustomUrlSerializer }];


export function getBaseLocation() {
  const paths: string[] = location.pathname.split('/').splice(1, 1);
  const basePath: string = (paths && paths[0]) || '';
  return '/' + basePath;
}
