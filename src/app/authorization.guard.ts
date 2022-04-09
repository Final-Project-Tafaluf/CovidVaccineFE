import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private toaster: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //true -->if there is a token
    const token = localStorage.getItem('token');
    if (token) {
      console.log(state);
      // /admin/dashboard
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.role == 'admin') {
            this.toaster.success('welcome');
            return true;
          }
          //acc , customer
          else {
            this.toaster.warning('this page for admin');
            return false;
          }
          //
        }

        else {
          this.toaster.warning('role name is undfined ');
          return false;
        }
      }

      return true;
    }

    else {
      this.router.navigate(['security/login']);
      this.toaster.warning('Please login !!')
      return false;
    }

  }

}
