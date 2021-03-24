import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './component/navi/navi.component';
import { RentalComponent } from './component/rental/rental.component';
import { CustomerComponent } from './component/customer/customer.component';
import { BrandComponent } from './component/brand/brand.component';
import { ColorComponent } from './component/color/color.component';
import { CarComponent } from './component/car/car.component';

import { ToastrModule } from 'ngx-toastr';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CarPipePipe } from './pipes/car-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { FilterComponent } from './component/filter/filter.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AddCarComponent } from './component/add-car/add-car.component';
import { UpdateCarComponent } from './component/update-car/update-car.component';
import { EditBrandComponent } from './component/edit-brand/edit-brand.component';
import { EditColorComponent } from './component/edit-color/edit-color.component';






@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    RentalComponent,
    CustomerComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
   
    
    BrandPipePipe,
    
    CarPipePipe,
    
    ColorPipePipe,
    
    FilterComponent,
    
    CarDetailComponent,
    
    PaymentComponent,
    
    AddCarComponent,
    
    UpdateCarComponent,
    
    EditBrandComponent,
    
    EditColorComponent,
    
    
    

    


  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
