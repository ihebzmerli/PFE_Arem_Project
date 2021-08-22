import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './pages/auth/token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router,private auth:TokenStorageService) {
  }
/*
  canActivate() {
    return this.authService.isAuthenticated() // canActive can return Observable<boolean>, which is exactly what isAuthenticated returns
    .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
  */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |
    boolean | UrlTree {
    const token = this.auth.getToken();
    console.log(token);
    if (token) {
    return true;
    }
    else {
    this.router.navigateByUrl('/auth/login');
    return false;
    }
    }
  /*  
    authority;
    canActivateRoleAdmin(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |
      boolean | UrlTree {
      const roles = this.auth.getAuthorities();
      console.log(roles);
      roles.every(role => {
        this.authority=role;
        ;})
      if (this.authority=='ROLE_ADMIN') {
      return true;
      }
      else {
      this.router.navigateByUrl('/pages/dashboard');
      return false;
      }
      }
      */
}