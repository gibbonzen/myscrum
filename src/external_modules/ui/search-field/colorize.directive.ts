import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';


@Directive({
  selector: '[colorize]'
})
export class ColorizeDirective implements OnInit {
  @Input() colorize: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background', this.colorize);
  }

}
