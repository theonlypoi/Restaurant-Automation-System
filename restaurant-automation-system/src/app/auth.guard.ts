import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ToastrService } from './services/toastr.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth:AuthService,private router:Router,private toastrService: ToastrService) {

  }

  canActivate(): boolean {
    if(this.auth.loggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/home']);
      this.toastrService.warn("You are not authenticated");
      return false;
    }
  }
}
