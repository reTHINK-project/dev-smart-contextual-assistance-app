import { NgModule, ModuleWithProviders } from '@angular/core';

import { SidebarDirective } from './sidebar.directive';
import { FullscreenDirective } from './fullscreen.directive';

// Type
export * from './sidebar.directive';
export * from './fullscreen.directive';

@NgModule({
  declarations: [
    SidebarDirective,
    FullscreenDirective
  ],
  imports: [],
  exports: [
    SidebarDirective,
    FullscreenDirective
  ]
})
export class DirectiveModules {

}
