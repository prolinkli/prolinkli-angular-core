import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports: [],
})
export class NavComponent {

}
