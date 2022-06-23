import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if (this.auth.isAuthenticated()) {
        return true
      } else {
        this.auth.logout()
        this.router.navigate(['/admin', 'login'], {
          queryParams: {
            loginAgain: true
          }
        })
        return false
      }
  }
}
