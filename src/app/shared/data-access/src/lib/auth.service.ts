import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LkUserAuthenticationMethod,
  User,
  UserAuthenticationForm,
} from '@pli-shared/types';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  interval,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly destroyRef = inject(DestroyRef);

  readonly API_URL = '/api/user';
  readonly AUTH_URL = '/api/auth/oauth2';

  readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  readonly isLoggedInAsSignal = toSignal(this.isLoggedIn);

  // Remove the continuous session check that was causing interference
  // readonly sessionCheck$ = this.checkSession();

  public isUserLoggedIn() {
    console.log('AuthService: Checking user login status via API');
    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      map((user) => {
        console.log('AuthService: API response:', user);
        if (user && user.id) {
          // User is logged in
          console.log('AuthService: User is logged in');
          this.isLoggedIn.next(true);
          return true;
        } else {
          // User is not logged in
          console.log('AuthService: User is not logged in');
          this.isLoggedIn.next(false);
          return false;
        }
      }),
      catchError((error, _) => {
        console.log('AuthService: API error:', error);
        if (error.status === 419) {
          // Unauthorized, user is not logged in
          console.log('AuthService: 419 error - user not logged in');
          this.isLoggedIn.next(false);
          return of(false);
        }
        console.log('AuthService: Other error - assuming not logged in');
        this.isLoggedIn.next(false);
        return of(false);
      }),
    );
  }

  // Optional: Call this method manually when you want to start session checking
  public startSessionCheck() {
    return interval(30 * 1000) // Check every 30 seconds instead of 5
      .pipe(
        startWith(0),
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.isUserLoggedIn()),
      )
      .subscribe((isLoggedIn) => {
        this.isLoggedIn.next(isLoggedIn);
      });
  }

  internalLogin(form: UserAuthenticationForm): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/login`, form, {
      withCredentials: true,
    });
  }

  oauthLogin(oAuthType: Omit<LkUserAuthenticationMethod, 'INTERNAL'>) {
    if (!oAuthType || typeof oAuthType !== 'string') {
      console.error('Invalid OAuth type:', oAuthType);
      return;
    }

    // Build the full OAuth URL (this should redirect to external OAuth provider)
    const oauthUrl = `${this.AUTH_URL}/${oAuthType.toLowerCase()}`;

    // For OAuth, we need a full page redirect, not Angular routing
    window.location.href = oauthUrl;
  }
}
