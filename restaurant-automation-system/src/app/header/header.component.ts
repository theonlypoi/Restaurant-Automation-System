import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isManager: boolean = true;
  isNormalUser: boolean = true;
  isSClerk: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return (this.isNormalUser && this.isManager);
  }

  isSalesClerk(): boolean {
    return (this.isNormalUser && this.isSClerk);
  }

  openLoginForm() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '400px';

    this.dialog.open(LoginComponent,dialogConfig);
  }
}
