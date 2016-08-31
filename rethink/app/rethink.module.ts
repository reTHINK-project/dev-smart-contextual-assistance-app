import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { disableDeprecatedForms, provideForms, FormsModule } from '@angular/forms';

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
    servicesInjectables,
    disableDeprecatedForms,
    provideForms
  ],
  bootstrap: [ RethinkComponent ]
})
export class RethinkModule {

    constructor() {

    }
}
