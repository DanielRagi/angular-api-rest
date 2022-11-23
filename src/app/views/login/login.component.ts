import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service'
import { LoginInterface } from '../../models/login.interface'
import { ResponseInterface } from '../../models/response.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router: Router) { 
  }

  errorStatus:boolean = false;
  errorMessage:any ="";

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
    }
  }

  onLogin(form:any){
    this.api.loginByEmail(form).subscribe(data => {
      let response:ResponseInterface = data;
      if(response.token){
        localStorage.setItem("token",response.token)
        this.router.navigate(['dashboard'])
      } else {
        this.errorStatus = true;
        this.errorMessage = response.message;
      }
    })
  }

}
