import {Injectable, Injector}                                              from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable()
export class AllGuard implements CanActivate {

    constructor(private router: Router,private injector: Injector) {

    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        let guards = route.data.guards || [];
        for (let guard of guards) {
            let instance: CanActivate = this.injector.get(guard);
            let result = await instance.canActivate(route, state);
            if (result === true || result instanceof UrlTree) {
                
                return result;
            }
        }
        alert('You are not allowed to view this page');
        this.router.navigateByUrl('/pages/dashboard');
        return false;
    }

}