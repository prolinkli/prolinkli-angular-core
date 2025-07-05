import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import {
  LkUserAuthenticationMethod,
  LkUserAuthenticationMethods,
  User,
} from '@pli-shared/types';
import { OAuthLoginComponent } from './components/login-oauth-component/login-oauth-component';
import {
  ErrorMessageComponent,
  PliContainer,
  PliTextInputComponent,
} from '@pli-shared/pli-ui';
import { AuthService } from '@pli-shared/data-access';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { LoadingService } from 'src/app/shared/data-access/src/loading/loading.service';

@Component({
  selector: 'pli-login',
  imports: [
    OAuthLoginComponent,
    PliTextInputComponent,
    PliContainer,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  readonly loadingStatus = inject(LoadingService);
  readonly authService = inject(AuthService);
  readonly formBuilder = inject(FormBuilder);

  // form
  readonly form = this.formBuilder.group({
    username: [''],
    specialToken: [''],
  });

  readonly validOAuthMethods = computed<LkUserAuthenticationMethod[]>(
    () =>
      [
        LkUserAuthenticationMethods.GOOGLE,
        LkUserAuthenticationMethods.MICROSOFT,
      ] as LkUserAuthenticationMethod[],
  );

  //state
  readonly returnUrl = input<string>();

  readonly errorMessage = signal<string>('');
  readonly shouldShowError: Signal<boolean> = computed(
    () => this.errorMessage()?.length > 0,
  );

  readonly loading = computed(() => this.loadingStatus.loading());

  onOAuthLoginClick(oAuthType: LkUserAuthenticationMethod): void {
    this.authService.oauthLogin(oAuthType);
  }

  onInternalLoginClick(): void {
    this.authService
      .internalLogin({
        ...(this.form.value as Record<string, string>),
        authenticationMethodLk: LkUserAuthenticationMethods.PASSWORD,
      })
      .pipe(
        catchError((error, _) => {
          if (error.status === 401) {
            this.errorMessage.set('Invalid credentials. Please try again.');
          } else if (error.status === 404) {
            this.errorMessage.set(
              'User not found. Please check your username or register.',
            );
          }
          return of(error);
        }),
      )
      .subscribe((data: User | Error) => {
        if ('id' in data && data.id) {
          this.authService.router.navigate([this.returnUrl() || '/app']);
        }
      });
  }
}
