import { Component, computed, effect, inject, Signal } from '@angular/core';
import {
  LkUserAuthenticationMethod,
  LkUserAuthenticationMethods,
} from '@pli-shared/types';
import { OAuthLoginComponent } from './components/login-oauth-component/login-oauth-component';
import { PliContainer, PliTextInputComponent } from '@pli-shared/pli-ui';
import { AuthService } from '@pli-shared/data-access';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pli-login',
  imports: [OAuthLoginComponent, PliTextInputComponent, PliContainer, ReactiveFormsModule],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {

  readonly authService = inject(AuthService);
  readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    username: [''],
    password: [''],
  })

  //TODO: remove these signals when the form is reactive
  //@ts-ignore
  readonly username: Signal<string> = toSignal(this.form?.get('username')?.valueChanges, { initialValue: '' });
  //@ts-ignore
  readonly password: Signal<string> = toSignal(this.form?.get('password')?.valueChanges, { initialValue: '' });

  // TODO: pull in valid auth methods from the backend
  readonly validOAuthMethods = computed<LkUserAuthenticationMethod[]>(
    () =>
      [
        LkUserAuthenticationMethods.GOOGLE,
        LkUserAuthenticationMethods.MICROSOFT,
      ] as LkUserAuthenticationMethod[],
  );

  onOAuthLoginClick(oAuthType: LkUserAuthenticationMethod): void {
    this.authService.oauthLogin(oAuthType);
  }

  onInternalLoginClick(): void {
    if (!this.username() || !this.password()) {
      console.warn('Username and password are required for internal login');
      return;
    }
    this.authService.internalLogin(
      {
        username: this.username(),
        specialToken: this.password(),
        authenticationMethodLk: LkUserAuthenticationMethods.PASSWORD,
      }
    );
  }
}
