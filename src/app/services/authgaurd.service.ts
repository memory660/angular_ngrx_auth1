import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { isAuthenticated } from '../auth/state/auth.selector';
import { AppState } from '../Store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurd implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if (!authenticate) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    );
  }
}
