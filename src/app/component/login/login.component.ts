import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm:FormGroup
  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router,private userService:UserService,private localStorageService:LocalStorageService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
         this.toastrService.info("Başarılı bir şekilde giriş yapıldı")
         
         localStorage.setItem("token",response.data.token)
         this.userService.getUser(loginModel.email).subscribe(userResponse=>{
         this.localStorageService.sendObjectToLocalStroge("user",userResponse.data)
        this.customerService.getByUser(userResponse.data.id).subscribe(customerResponse=>{
          this.localStorageService.sendObjectToLocalStroge("customer",customerResponse.data)
          this.userService.getClaims(userResponse.data).subscribe(response=>{
            this.localStorageService.sendObjectToLocalStroge("claims",response.data)
            this.router.navigate([""])
          })
          
         
          
        })
         
       })
        
      },errorResponse=>{
        this.toastrService.info(errorResponse.error)
      })
    }
  }
}
