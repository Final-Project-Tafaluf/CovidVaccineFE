import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutherizationGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService,private router: Router, private toaster: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var token = this.localStorageService.getToken();
      if (token) {
        console.log(state);
        // /admin/dashboard
        debugger
        if (state.url.indexOf('admin') >= 0) {
          let user: any = this.localStorageService.tokenDecode(token);
          if (user) {
            if (user.role == 'admin') {
              this.toaster.success(`Welcome ${user.unique_name} 🌸`);
              return true;
            }
            //acc , customer
            else {
              this.toaster.warning(`this page for admin get out ${user.unique_name} ( う-´)づ︻╦̵̵̿╤── \(˚☐˚”)/`);
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
