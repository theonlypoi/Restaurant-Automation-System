import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginData: Login;

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private fb:FormBuilder) { }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }
}
