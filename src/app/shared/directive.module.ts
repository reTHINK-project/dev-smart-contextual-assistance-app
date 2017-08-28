import { NgModule, ModuleWithProviders } from '@angular/core';

import { ScreenDirective } from './screen.directive';
import { SidebarDirective } from './sidebar.directive';
import { FullscreenDirective } from './fullscreen.directive';

// Type
export * from './screen.directive';
export * from './sidebar.directive';
export * from './fullscreen.directive';

@NgModule({
  declarations: [
    ScreenDirective,
    SidebarDirective,
    FullscreenDirective
  ],
  imports: [],
  exports: [
    ScreenDirective,
    SidebarDirective,
    FullscreenDirective
  ]
})
export class DirectiveModules {

}
