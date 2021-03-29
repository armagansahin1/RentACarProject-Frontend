import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { RegisterModel } from 'src/app/models/registerModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { CreditCardService } from 'src/app/service/creditCard.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private userService:UserService,
    private authService:AuthService,
    private creditCardService:CreditCardService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private router:Router) { }

   passwordForm:FormGroup
   userForm:FormGroup
   creditCardForm:FormGroup
   customer:Customer
   user:User
   creditCards:CreditCard[]
   registerModel:RegisterModel
   
   ngOnInit(): void {
     this.customer=this.localStorageService.getObjectFromLocalStorage("customer")
     this.user=this.localStorageService.getObjectFromLocalStorage("user")
     this.getCreditCards();
     this.createPasswordForm();
     this.createUserForm();
     this.createCreditCardForm(); 

  }

  createPasswordForm(){
    this.passwordForm=this.formBuilder.group({
      password:["",Validators.required],
      validPassword:["",Validators.required]
    })
  }

  createUserForm(){
    this.userForm=this.formBuilder.group({
      
      firstName:[this.user.firstName],
      lastName:[this.user.lastName],
      email:[this.user.email]
    })
  }
  createCreditCardForm(){
    this.creditCardForm=this.formBuilder.group({
      cardName:[""],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      cardNumber:["",Validators.required],
      expMonth:["",Validators.required],
      expYear:["",Validators.required],
      cvv:["",Validators.required],

    })
  }
  
  getCreditCards(){
    this.creditCardService.getCustomerCards(this.customer.customerId).subscribe(response=>{
      this.creditCards=response.data
    })
  }

  updatePassword(){
    if(this.passwordForm.valid){
      if(this.passwordForm.controls["password"].value==this.passwordForm.controls["validPassword"].value){
        this.registerModel={password:this.passwordForm.controls["password"].value,email:this.user.email,firstName:this.user.firstName,lastName:this.user.lastName}
        this.authService.updatePassword(this.registerModel,this.user.id).subscribe(response=>{
          this.toastrService.success("Parolanız Başarıyla Güncellendi")
        })
    
    
      }else{
        this.toastrService.error("Parolanız eşleşmedi")
      }
    }else{
      this.toastrService.info("Lütfen Formu eksiksiz giriniz")
    }
   
}
updateUser(){
  let userModel:User=Object.assign({},this.userForm.value)
  userModel.id=this.user.id
  userModel.passwordHash=this.user.passwordHash
  userModel.passwordSalt=this.user.passwordSalt
  this.userService.update(userModel).subscribe(response=>{
    this.toastrService.success("Kullanıcı Bilgileriniz Güncellendi")
    localStorage.clear()
    
    this.router.navigate([""])
  })
}

addCard(){
    if(this.creditCardForm.valid){
    let cardModel:CreditCard=Object.assign({},this.creditCardForm.value)
    cardModel.customerId=this.customer.customerId
    this.creditCardService.add(cardModel).subscribe(response=>{
      this.toastrService.success("Kredi Kartınız Başarıyla Kaydedildi")
      window.location.reload()
    },errorResponse=>{
      if(errorResponse.error.Errors.length>0){
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage);
          
        }
      }
    })}else{
      this.toastrService.error("Kredi Kartı Bilgilernizi Eksik Girdiniz")
    }
  
}

deleteCard(creditCardId?:number){
  this.creditCardService.getById(creditCardId).subscribe(response=>{
    this.creditCardService.delete(response.data).subscribe(deleteResponse=>{
      this.toastrService.warning("Kart Bilgileriniz Silindi")
      this.router.navigate(["/userInfo"])
      window.location.reload()
    })
  })
}

}
