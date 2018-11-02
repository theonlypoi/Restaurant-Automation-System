import { Component, OnInit, ViewChild } from '@angular/core';
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
  
  @ViewChild('lform') loginFormDirective;

  constructor(private fb:FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm= this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  onSubmit() {
    this.loginData = this.loginForm.value;
    // console.log(this.loginData);
    this.loginForm.reset({
      username: '',
      password: ''
    });
    this.loginFormDirective.reset();
  }
}
