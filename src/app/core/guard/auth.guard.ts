import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@pli-shared/data-access';
import { map, skipWhile, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard: Checking authentication for:', state.url);
    return this.authService.isUserLoggedIn().pipe(
      take(1), // Complete the observable after first emission
      map((isLoggedIn) => {
        console.log('AuthGuard: User logged in status:', isLoggedIn);
        if (!isLoggedIn) {
          console.log('AuthGuard: Access denied - redirecting to login');
          // Store the attempted URL for after login
          localStorage.setItem('returnUrl', state.url);
          // Return a UrlTree for redirect instead of navigating directly
          return this.router.createUrlTree(['/login']);
        } else {
          console.log('AuthGuard: Access granted');
          return true;
        }
      }),
    );
  }
}
