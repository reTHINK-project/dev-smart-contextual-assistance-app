import { Component } from '@angular/core';
import { Contact } from '../comp/contact/contact';
import { ContactListComponent } from '../comp/contact/contactlist';

@Component({
  selector: 'div[my-app]',
  directives: [ContactListComponent],
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
