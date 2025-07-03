import { Directive, inject, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[pli-container]',
  standalone: true,
})
export class PliContainer implements OnInit {

  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  constructor() { }

  public ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'pli-container');
  }

}
