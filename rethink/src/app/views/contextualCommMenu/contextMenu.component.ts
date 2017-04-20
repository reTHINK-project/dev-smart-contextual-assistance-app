import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'nav[context-menu]',
  templateUrl: './contextMenu.component.html'
})
export class ContextMenuComponent {
  @HostBinding('class') hostClass = 'mp-menu';
}
