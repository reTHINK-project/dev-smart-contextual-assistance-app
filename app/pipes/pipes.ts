import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeElapsedPipe } from './timeElapsedPipe';
import { SizePipe } from './sizePipe';

@NgModule({
  declarations: [ TimeElapsedPipe, SizePipe ],
  imports: [ CommonModule],
  exports: [ TimeElapsedPipe, SizePipe]
})

export class PipesModule {};
