import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Claim } from 'src/app/models/claim';
import { Customer } from 'src/app/models/customer';
import { User} from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:User
  loginForm:FormGroup
  customerId?:number
  constructor(private userService:UserService,private toastrService:ToastrService,private formBuilder:FormBuilder,private authService:AuthService,
    private localStorageService:LocalStorageService,private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    
    this.IsUserSignIn()
    this.createLoginForm()
    this.user=this.localStorageService.getObjectFromLocalStorage("user")
    this.getCustomerId()
  
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  IsUserSignIn() {
    if(localStorage.getItem("user")){
      return true
    }else{
      return false
      
    }
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
          window.location.reload()
        })
         
       })
        
      },errorResponse=>{
        this.toastrService.info(errorResponse.error)
      })
    }
  }
  signOut(){
    localStorage.clear()
    this.router.navigate([""])
  }

   getCustomerId(){
    let customer:Customer=this.localStorageService.getObjectFromLocalStorage("customer")
    this.customerId=customer.customerId
   }

  
}
