import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizePipe } from './sizePipe';

@NgModule({
  declarations: [SizePipe],
  imports: [CommonModule],
  exports: [SizePipe]
})

export class PipesModule { };
