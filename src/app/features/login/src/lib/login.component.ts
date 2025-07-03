import { Component, computed, inject } from '@angular/core';
import { LkUserAuthenticationMethod, LkUserAuthenticationMethods } from '@pli-shared/types';
import { OAuthLoginComponent } from './components/login-oauth-component/login-oauth-component';
import { PliContainer } from '@pli-shared/pli-ui';
import { AuthService } from '@pli-shared/data-access';

@Component({
  selector: 'pli-login',
  imports: [
    OAuthLoginComponent,
    PliContainer
  ],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {

  readonly authService = inject(AuthService);

  // TODO: pull in valid auth methods from the backend
  readonly validOAuthMethods = computed<LkUserAuthenticationMethod[]>(() => [LkUserAuthenticationMethods.GOOGLE, LkUserAuthenticationMethods.MICROSOFT] as LkUserAuthenticationMethod[]);

  onOAuthLoginClick(oAuthType: LkUserAuthenticationMethod): void {
    this.authService.oauthLogin(oAuthType);
  }



}
