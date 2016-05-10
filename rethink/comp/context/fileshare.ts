import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[context-file-share]',
  templateUrl: 'comp/context/fileshare.html'
})
export class ContextFileShareComponent {
  @HostBinding('class') hostClass = 'all-25 large-35 xlarge-35 hide-medium hide-small hide-tiny'
}
