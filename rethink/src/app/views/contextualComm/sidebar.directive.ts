import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[showSidebar]',
})
export class SidebarDirective {

  private open = false;

  constructor(public el: ElementRef, public renderer: Renderer) {
    console.log('DIRECTIVE:', el, renderer);
  }

  show() {
    console.log('DIRECTIVE - SHOW: ', this.open);
    if (!this.open) {
      this._addClass('opened');
      this.open = !this.open;
    } else {
      this._removeClass('opened');
      this.open = !this.open;
    }
  }

  _addClass(className: string) {
    this.renderer.setElementClass(this.el.nativeElement, className, true);
  }

  _removeClass(className: string) {
    this.renderer.setElementClass(this.el.nativeElement, className, false);
  }

}
