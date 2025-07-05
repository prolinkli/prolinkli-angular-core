import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractNavComponent } from '../abstract-nav';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav-default',
  imports: [],
})
export class DefaultNavComponent extends AbstractNavComponent {

}
