import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'div[file-share-list]',
  templateUrl: 'comp/fileshare/filesharelist.html'
})
export class FileShareListComponent {
  @HostBinding('class') hostClass = 'all-25 large-35 xlarge-35 hide-medium hide-small hide-tiny'
}
