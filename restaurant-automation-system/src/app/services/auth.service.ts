import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    return localStorage.getItem('roletype');
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roletype");
    this.router.navigate(['/home']);
  }
}
