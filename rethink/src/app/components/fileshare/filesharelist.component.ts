import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'filesharelist-component',
  templateUrl: './filesharelist.component.html'
})
export class FileShareListComponent {
  @HostBinding('class') hostClass = 'all-25 large-35 xlarge-35 hide-medium hide-small hide-tiny'
}
