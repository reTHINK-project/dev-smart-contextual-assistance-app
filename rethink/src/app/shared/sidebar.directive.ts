import { Directive, ElementRef, Renderer, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[showSidebar]',
})
export class SidebarDirective implements AfterViewInit  {

  private open = false;

  @Output() statusEmitter = new EventEmitter();

  constructor(public el: ElementRef, public renderer: Renderer) {
    console.log('DIRECTIVE:', el, renderer);
  }

  ngAfterViewInit() {

    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this._removeClass('opened');

    console.log('DIRECTIVE:', this.el);
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

    this.statusEmitter.emit({status: this.open});
  }

  _addClass(className: string) {
    this.renderer.setElementClass(this.el.nativeElement, className, true);
  }

  _removeClass(className: string) {
    this.renderer.setElementClass(this.el.nativeElement, className, false);
  }

}
