import { NgModule, ModuleWithProviders } from '@angular/core';

import { SidebarDirective } from './sidebar.directive';

// Type
export * from './sidebar.directive';

@NgModule({
  declarations: [
    SidebarDirective
  ],
  imports: [],
  exports: [
    SidebarDirective
  ]
})
export class DirectiveModules {}
