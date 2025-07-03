import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LkUserAuthenticationMethod, UserAuthenticationForm } from '@pli-shared/types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly http = inject(HttpClient);
  readonly router = inject(Router);

  readonly API_URL = '/api/user';
  readonly AUTH_URL = '/api/auth/oauth2';

  internalLogin(form: UserAuthenticationForm) {
    return this.http.post<UserAuthenticationForm>(`${this.API_URL}/login`, form);
  }


  //TODO: make better implementation
  oauthLogin(oAuthType: Omit<LkUserAuthenticationMethod, 'INTERNAL'>) {

    if (!oAuthType || typeof oAuthType !== 'string') {
      console.error('Invalid OAuth type:', oAuthType);
      return;
    }

    // Build the full OAuth URL (this should redirect to external OAuth provider)
    const oauthUrl = `${this.AUTH_URL}/${oAuthType.toLowerCase()}`;
    console.log('Redirecting to OAuth URL:', oauthUrl);

    // For OAuth, we need a full page redirect, not Angular routing
    window.location.href = oauthUrl;
  }

}
