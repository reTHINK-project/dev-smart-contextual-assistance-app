import { Component } from '@angular/core';

@Component({
  selector: 'div[my-app]',
  template: `
    <button (click)="onClick()">
      <i class="home icon"></i>
      {{text}}
    </button>
  `
})
export class AppComponent {
  text = "Follow"

  ngOnInit() {
    console.log("init");
  }

  onClick() {
    this.text = "Following"
  }
}
