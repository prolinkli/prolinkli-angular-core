import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LkUserAuthenticationMethod } from '@pli-shared/types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pli-login-oauth-component',
  templateUrl: './login-oauth-component.html',
  styleUrl: './login-oauth-component.scss',
  standalone: true,
})
export class OAuthLoginComponent {

  // I/O
  oAuthType = input.required<LkUserAuthenticationMethod>();
  click = output<LkUserAuthenticationMethod>();

  private readonly displayNames: Partial<Record<LkUserAuthenticationMethod, string>> = {
    'PASSWORD': 'Password',
    'GOOGLE': 'Google',
    'MICROSOFT': 'Microsoft',
    'APPLE': 'Apple',
  };

  displayName(): string {
    return this.displayNames[this.oAuthType()] || 'Unknown';
  }

  onButtonClick(): void {
    this.click.emit(this.oAuthType());
  }

}
