import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './component/add-car/add-car.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';

import { CarComponent } from './component/car/car.component';

import { CustomerComponent } from './component/customer/customer.component';
import { CustomizeCarComponent } from './component/customize-car/customize-car.component';
import { CustomizeUserComponent } from './component/customize-user/customize-user.component';

import { EditBrandComponent } from './component/edit-brand/edit-brand.component';
import { EditColorComponent } from './component/edit-color/edit-color.component';
import { IncomingRentComponent } from './component/incoming-rent/incoming-rent.component';
import { LoginComponent } from './component/login/login.component';
import { PastRentalsComponent } from './component/past-rentals/past-rentals.component';

import { PaymentComponent } from './component/payment/payment.component';
import { RegisterComponent } from './component/register/register.component';
import { RentalComponent } from './component/rental/rental.component';
import { UpdateCarComponent } from './component/update-car/update-car.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  
   {path:"rentals",component:RentalComponent,canActivate:[LoginGuard]},
   {path:"customers",component:CustomerComponent,canActivate:[LoginGuard]},
   {path:"adminPage/editBrands", component:EditBrandComponent,canActivate:[LoginGuard]},
   {path:"adminPage/editColors",component:EditColorComponent,canActivate:[LoginGuard]},
   {path:"register",component:RegisterComponent},
   {path:"login",component:LoginComponent},
   {path:"userInfo",component:UserInfoComponent,canActivate:[LoginGuard]},

   {path:"adminPage",component:AdminPageComponent},
   {path:"adminPage/customizeCar",component:CustomizeCarComponent},
   {path:"adminPage/editBrands", component:EditBrandComponent,canActivate:[LoginGuard]},
   {path:"adminPage/editColors",component:EditColorComponent,canActivate:[LoginGuard]},
   {path:"adminPage/customizeUser", component:CustomizeUserComponent},
   {path:"inComingRentals/:customerId",component:IncomingRentComponent,canActivate:[LoginGuard]},
   {path:"pastRentals/:customerId",component:PastRentalsComponent,canActivate:[LoginGuard]},
   {path:"cars",component:CarComponent},
   {path:"updateCar/:carId",component:UpdateCarComponent,canActivate:[LoginGuard]},
   {path:"cars/brand/:brandId",component:CarComponent},
   {path:"cars/color/:colorId",component:CarComponent},
   {path:"cars/filter/:brandId/:colorId",component:CarComponent},
    
    {path:"cars/car-details/:carId", component:CarDetailComponent,canActivate:[LoginGuard]},
    {path:"payment",component:PaymentComponent,canActivate:[LoginGuard]}
  
  
  
  
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
