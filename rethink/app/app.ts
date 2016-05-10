import { Component } from '@angular/core';
import { Contact, ContactComponent } from '../comp/contact';

@Component({
  selector: 'div[my-app]',
  directives: [ContactComponent],
  templateUrl: 'app/view/app.html'
})
export class Application {
  contacts: [Contact] = [
    { name: "Rita Coelho", status: "online", avatar: "img/avatar.jpg" },
    { name: "Diogo Reis", status: "away", avatar: "img/avatar-2.jpg" },
    { name: "Rodrigo Castro", status: "offline", avatar: "img/avatar-3.jpg" },
    { name: "Martim Almeida", status: "online", avatar: "img/avatar-4.jpg" }
  ]
}
