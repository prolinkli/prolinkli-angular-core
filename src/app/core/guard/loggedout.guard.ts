import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@pli-shared/data-access';
import { map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isUserLoggedIn().pipe(
      take(1), // Complete the observable after first emission
      map((isLoggedIn) => {
        if (isLoggedIn) {
          // Return a UrlTree for redirect instead of navigating directly
          return this.router.createUrlTree(['/app']);
        } else {
          return true;
        }
      }),
    );
  }
}
