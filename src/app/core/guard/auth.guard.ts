import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@pli-shared/data-access';
import { map, skipWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);

  constructor() {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isUserLoggedIn().pipe(
      skipWhile((isLoggedIn) => isLoggedIn === null), // Skip until we have a valid login state
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          // If the user is not logged in, redirect to the login page
          this.authService.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      }),
      map((isLoggedIn) => isLoggedIn ?? false),
    );
  }
}
