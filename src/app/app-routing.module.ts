import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './component/add-car/add-car.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';

import { CarComponent } from './component/car/car.component';

import { CustomerComponent } from './component/customer/customer.component';
import { EditBrandComponent } from './component/edit-brand/edit-brand.component';
import { EditColorComponent } from './component/edit-color/edit-color.component';
import { PaymentComponent } from './component/payment/payment.component';
import { RentalComponent } from './component/rental/rental.component';
import { UpdateCarComponent } from './component/update-car/update-car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  
   {path:"rentals",component:RentalComponent},
   {path:"customers",component:CustomerComponent},
   {path:"editBrands", component:EditBrandComponent},
   {path:"editColors",component:EditColorComponent},
    {path:"updateCar/:carId",component:UpdateCarComponent},
    {path:"cars",component:CarComponent},
    
    {path:"cars/brand/:brandId",component:CarComponent},
    {path:"cars/color/:colorId",component:CarComponent},
    {path:"cars/filter/:brandId/:colorId",component:CarComponent},
    
    {path:"cars/car-details/:carId", component:CarDetailComponent},
    {path:"payment/:rental",component:PaymentComponent}
  
  
  
  
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
