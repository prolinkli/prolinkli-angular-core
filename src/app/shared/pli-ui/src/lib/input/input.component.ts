import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pli-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [],
})
export class PliInputComponent {

}
