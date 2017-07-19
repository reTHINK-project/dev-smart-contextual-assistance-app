import { Directive, AfterViewInit, ViewChild, ElementRef, Renderer2, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[fullscreen]',
})
export class FullscreenDirective implements AfterViewInit {

  private fullScreen = false;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    console.log('DIRECTIVE:', this.el, this.renderer);

  }

  public exitFullScreen() {

    if (this.fullScreen) {
      this._exitFullScreen();
    }

  }

  public requestFullScreen() {

    if (!this.fullScreen) {
      this._requestFullScreen();
    }

  }

  public toogleFullscreen() {

    if (this.fullScreen) {
      this._exitFullScreen();
    } else {
      this._requestFullScreen();
    }

  }

  private _requestFullScreen() {

    const docElm: any = this.el.nativeElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
      this.fullScreen = true;
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
      this.fullScreen = true;
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
      this.fullScreen = true;
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
      this.fullScreen = true;
    }
  }

  private _exitFullScreen() {

    const docElm: any = document;

    if (docElm.exitFullscreen) {
      docElm.exitFullscreen();
      this.fullScreen = false;
    } else if (docElm.mozCancelFullScreen) {
      docElm.mozCancelFullScreen();
      this.fullScreen = false;
    } else if (docElm.webkitCancelFullScreen) {
      docElm.webkitCancelFullScreen();
      this.fullScreen = false;
    } else if (docElm.msExitFullscreen) {
      docElm.msExitFullscreen();
      this.fullScreen = false;
    }
  }


}
