import { Directive, ElementRef, HostListener, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  private autoScroll: boolean = true
  private heightChangedEvent = new EventEmitter()

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.heightChangedEvent.subscribe(() => this.scrollToBottom())
    this.heightChangedLoop()
  }

  @HostListener('mousewheel', ['$event']) onMouseWheel(event) {
    let delta = event.wheelDelta
    let mouseDown = delta < 0
    let auto = false
    if(mouseDown) {
      if(this.isBottom()) {
        auto = true
      }
    }

    this.setAutoScroll(auto)
  }

  private scrollTop() {
    return this.el.nativeElement.scrollTop
  }

  private maxHeight() {
    return this.el.nativeElement.scrollHeight
  }

  public isBottom() {
    return this.maxHeight() - this.scrollTop() <= 800
  }

  public scrollToBottom() {
    if(this.maxHeight() - this.scrollTop() >= 900)
      this.setEnableSmooth(false)

    this.el.nativeElement.scrollTop = this.maxHeight()
    this.setAutoScroll(true)

    this.setEnableSmooth(true)
  }

  public isAutoScroll() {
    return this.autoScroll
  }

  public setAutoScroll(enable: boolean) {
    this.autoScroll = enable
  }

  private heightChangedLoop() {
    if(!this.isBottom() && this.autoScroll) {
      this.heightChangedEvent.emit('changed')
    }

    setTimeout(() => this.heightChangedLoop(), 100);
  }

  private setEnableSmooth(enable: boolean = true) {
    if(enable)
      this.renderer.removeStyle(this.el. nativeElement, 'scroll-behaviour')
    else
      this.renderer.setStyle(this.el.nativeElement, 'scroll-behaviour', 'smooth')
  }
}
