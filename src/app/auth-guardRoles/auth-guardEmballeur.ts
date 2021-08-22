import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../pages/auth/token-storage.service';


@Injectable()
export class AuthGuardEmballeur implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router,private auth:TokenStorageService) {
  }


    //canActivateChild : [AuthGuard],
    authority;
    canActivate(next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |
      boolean | UrlTree {
        let roles=this.auth.getAuthorities()
        roles.every(role => {
          this.authority=role;
          console.log(this.authority);
        });
        
      if (this.authority == 'ROLE_EMBALLEUR') {

      return true;
      }
     // alert('You are not allowed to view this page');
      //this.router.navigateByUrl('/pages/dashboard');
      return false;
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