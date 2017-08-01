import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeElapsedPipe } from './timeElapsedPipe';

@NgModule({
  declarations: [ TimeElapsedPipe ],
  imports: [ CommonModule],
  exports: [ TimeElapsedPipe ]
})

export class PipesModule {};
