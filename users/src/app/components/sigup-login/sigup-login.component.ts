import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigup-login',
  templateUrl: './sigup-login.component.html',
  styleUrls: ['./sigup-login.component.css']
})
export class SigupLoginComponent{

  logInForm:FormGroup;
  errorMessage = '';
  loading = false;

  constructor(private loginService:LoginService, private fb:FormBuilder, private routes:Router) {
    this.logInForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  OnSubmit():void {
    if (this.logInForm.invalid) return;

    this.loading = true;

    this.loginService.login(this.logInForm.value).subscribe({
      next:(response) => {
        console.log(response);
        this.loading = false;
        localStorage.setItem('token', response.token);
        this.routes.navigate(['/dashboard']);
      },
      error:(error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    })
  }

}
