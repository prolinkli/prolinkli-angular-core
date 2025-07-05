import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pli-error-message',
  styleUrl: './error-message.component.scss',
  template: `
    @if (shouldShowError()) {
      <div class="error-message">
        <div class="error-content">
          <fa-icon [icon]="errorIcon" class="error-icon"></fa-icon>
          <p>{{ errorMessage() }}</p>
        </div>
      </div>
    }
  `,
  standalone: true,
  imports: [FontAwesomeModule],
})
export class ErrorMessageComponent {
  readonly errorMessage = input.required<string>();
  readonly shouldShowError = computed(() => this.errorMessage()?.length > 0);
  readonly errorIcon = faCircleXmark;
}
