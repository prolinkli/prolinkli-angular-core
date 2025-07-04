import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pli-error-message',
  styleUrl: './error-message.component.scss',
  template: `
    @if (shouldShowError()) {
      <div class="error-message">
        <p>{{ errorMessage() }}</p>
      </div>
    }
  `,
  standalone: true,
})
export class ErrorMessageComponent {
  readonly errorMessage = input.required<string>();
  readonly shouldShowError = computed(() => this.errorMessage()?.length > 0);
}
