import { ChangeDetectionStrategy, Component, forwardRef, input, linkedSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pli-text-input',
  template: `
    <input
      class="text-input"
      [type]="type()"
      [disabled]="_disabled()"
      [value]="value"
      [placeholder]="placeholder()"
      (input)="onInput($event)"
    />
  `,
  styleUrls: ['./text-input.component.scss'],
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PliTextInputComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class PliTextInputComponent implements ControlValueAccessor {

  // This component can be extended in the future to include additional functionality

  //form stuff
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly type = input<'text' | 'password'>('text');

  protected readonly _disabled = linkedSignal(() => this.disabled());
  value = '';

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(obj: string): void {
    this.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }
}
