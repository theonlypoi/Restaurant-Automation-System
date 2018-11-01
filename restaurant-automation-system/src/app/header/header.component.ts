import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isManager: boolean = true;
  isNormalUser: boolean = true;
  isSClerk: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return (this.isNormalUser && this.isManager);
  }

  isSalesClerk(): boolean {
    return (this.isNormalUser && this.isSClerk);
  }
}
