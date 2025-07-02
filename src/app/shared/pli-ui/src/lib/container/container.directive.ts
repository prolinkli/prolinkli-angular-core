import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[pli-container]',
})
export class ContainerDirective {

  @HostBinding('class')
  elementClass = 'pli-container';


  constructor() { }

}
