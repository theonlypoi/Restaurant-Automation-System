import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginData: Login;

  formErrors = {
    'username':'',
    'password':''
  }

  validationMessage = {
    'username':{
      'required':'Username field is required'
    },
    'password':{
      'required':'Password field is required'
    }
  }
  
  @ViewChild('lform') loginFormDirective;

  constructor(private fb:FormBuilder,private loginService: LoginService,private auth:AuthService,
              private router:Router,public dialogRef:MatDialogRef<LoginComponent>,
              private toastr:ToastrService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm= this.fb.group({
      username: ['',[Validators.required]],
      userpassword: ['',[Validators.required]]
    });

    this.loginForm.valueChanges
                  .subscribe(data => this.formValueChanged(data));
    this.formValueChanged();
  }

  formValueChanged(data?) {
    if(!this.loginForm){ return ;}
    const form = this.loginForm;

    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        let control = form.get(field);
        if(control && (control.dirty || control.touched) && !control.valid){
          let messages = this.validationMessage[field];
          for(let key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.loginData = this.loginForm.value;
    this.auth.logout();

    this.loginService.login(this.loginData)
                     .subscribe(response => {
                        localStorage.setItem("token",response['token']);
                        localStorage.setItem("roletype",response['roletype']);
                        this.dialogRef.close();
                        this.toastr.success("Logged in successfully");
                        this.router.navigate(['/home']);
                     },
                     err => {
                      this.toastr.error("Invalid UserName and/or Password.")
                     });
    this.loginForm.reset({
      username: '',
      userpassword: ''
    });
    this.loginFormDirective.reset();
  }
}
