import { NgModule, ModuleWithProviders, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaModalComponent } from './components/mediaModal.component';
import { MediaModalService } from './services/mediaModal.service';
import { PipesModule } from '../../pipes/pipes';

export * from './components/mediaModal.component';
export * from './services/mediaModal.service';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: [
    MediaModalComponent,
  ],
  exports: [MediaModalComponent]
})
export class MediaModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MediaModalModule,
      providers: [MediaModalService]
    };
  }
}
