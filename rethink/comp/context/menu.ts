import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav[context-menu]',
  templateUrl: 'comp/context/menu.html'
})
export class ContextMenuComponent {
  @HostBinding('class') hostClass = 'mp-menu'
}
