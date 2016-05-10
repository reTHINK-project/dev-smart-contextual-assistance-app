import { Component } from '@angular/core';
import { Contact, ContactComponent } from '../comp/contact';

@Component({
  selector: 'div[my-app]',
  directives: [ContactComponent],
  templateUrl: 'app/view/app.html'
})
export class Application {
  contact: Contact = {
    name: "Rita Coelho",
    status: "online",
    avatar: "img/avatar.jpg"
  }
}
