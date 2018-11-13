import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { DishaddComponent } from '../dishadd/dishadd.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,private auth:AuthService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return (this.auth.loggedIn());
  }

  isAdmin(): boolean {
    return (this.auth.getUserRole() === 'Manager') // || this.auth.getUserRole() === 'Sales Clerk');
  }

  isSalesClerk(): boolean {
    return (this.auth.getUserRole() === "Sales Clerk")
  }

  openLoginForm() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '400px';

    this.dialog.open(LoginComponent,dialogConfig);
  }

  openDishAddForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';

    this.dialog.open(DishaddComponent,dialogConfig);
  }

  logout() {
    this.auth.logout();
  }
}
