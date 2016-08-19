import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// App Component
import { RethinkComponent } from './rethink.component';
import { HomeComponent } from './home/home.component';

// Routes
import { routing } from './rethink.routing';

// Services
import { servicesInjectables } from '../services/services';

// enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    RethinkComponent,
    HomeComponent
  ],
  providers: [
    servicesInjectables
  ],
  bootstrap: [ RethinkComponent ]
})
export class RethinkModule {

    constructor() {

    }
}
