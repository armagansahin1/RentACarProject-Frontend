import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';

import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder, private authService:AuthService,private router:Router,private customerService:CustomerService,private userService:UserService,
    private localStorageService:LocalStorageService) { }
  registerForm:FormGroup
  ngOnInit(): void {
    this.createRegisterForm()
  }
createRegisterForm(){
  this.registerForm=this.formBuilder.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    email:["",Validators.required],
    password:["",Validators.required]
  })
}
register(){
  
  if(this.registerForm.valid){
    
    let registerModel=Object.assign({},this.registerForm.value)
    this.authService.register(registerModel).subscribe(response=>{
    this.toastrService.success("Başarılı bir şekilde kayıt oldunuz");
     localStorage.setItem("token",response.data.token)
    
     this.userService.getUser(registerModel.email).subscribe(userResponse=>{
       this.localStorageService.sendObjectToLocalStroge("user",userResponse.data)
       let customer:Customer={userId:userResponse.data.id}
       this.customerService.add(customer).subscribe(response=>{
         this.customerService.getByUser(userResponse.data.id).subscribe(response=>{
            this.localStorageService.sendObjectToLocalStroge("customer",response.data)
            setTimeout(() => {
              this.router.navigate([""])
            }, 1500);
            
         })
       })
     })
    },errorResponse=>{
      this.toastrService.info(errorResponse.error)
    })
  }
}
}
