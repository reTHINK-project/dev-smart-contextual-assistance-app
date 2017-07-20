import { Directive, AfterViewInit, ElementRef, Renderer2, AfterContentInit, HostListener } from '@angular/core';

@Directive({
  selector: '[screen]'
})
export class ScreenDirective implements AfterViewInit, AfterContentInit {

  private envs = ['xs', 'sm', 'md', 'lg', 'xl'];
  private breakpoints = {
    xs: { name: 'xs', max: 575 },
    sm: { name: 'sm', min: 576, max: 767},
    md: { name: 'md', min: 768, max: 991},
    lg: { name: 'lg', min: 992, max: 1199},
    xl: { name: 'xl', min: 1200 }
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.update();
  }

  constructor(
    public el: ElementRef,
    public renderer: Renderer2) {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    console.log('Screen Directive:', this.getEnvironment());
  }

  getEnvironment() {
    return this.update();
  }

  private update() {
    const current: HTMLElement = this.el.nativeElement as HTMLElement;

    const _width = current.offsetWidth;

    if ( this.breakpoints.xl.min <= _width ) {
      return this.breakpoints.xl;
    } else if ( this.breakpoints.lg.max >= _width && this.breakpoints.lg.min <= _width ) {
      return this.breakpoints.lg;
    } else if ( this.breakpoints.md.max >= _width && this.breakpoints.md.min <= _width ) {
      return this.breakpoints.md;
    } else if ( this.breakpoints.sm.max >= _width && this.breakpoints.sm.min <= _width ) {
      return this.breakpoints.sm;
    } else if ( this.breakpoints.xs.max >= _width ) {
      return this.breakpoints.xs;
    }

  }

}
