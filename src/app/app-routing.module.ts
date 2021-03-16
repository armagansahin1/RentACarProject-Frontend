import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './component/car/car.component';
import { CardetailComponent } from './component/cardetail/cardetail.component';
import { CustomerComponent } from './component/customer/customer.component';
import { RentalComponent } from './component/rental/rental.component';

const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"customers",component:CustomerComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carDetails/:carId",component:CardetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
