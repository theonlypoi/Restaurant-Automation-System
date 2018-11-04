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
    // console.log(this.loginData);
    this.loginForm.reset({
      username: '',
      password: ''
    });
    this.loginFormDirective.reset();
  }
}
