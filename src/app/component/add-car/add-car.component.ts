import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/service/car.service';
import {FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { ColorService } from 'src/app/service/color.service';
import { BrandService } from 'src/app/service/brand.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carForm:FormGroup
  brands:Brand[]
  colors:Color[]
  constructor(private carService:CarService,private toastrService:ToastrService,private formBuilder:FormBuilder,private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createCarForm()
    this.getBrands()
    this.getColors()
  }
  createCarForm(){
   this.carForm=this.formBuilder.group({
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required]
   })
  }
add(){
 if(this.carForm.valid){
   let carModel:Car=Object.assign({},this.carForm.value);
   this.carService.add(carModel).subscribe(response=>{
     this.toastrService.success("Araba Eklendi","Başarılı")
   },responseError=>{
     if(responseError.error.Errors.length>0){
       for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage
          ,"Doğrulama hatası")
         
       }
     }
     
   })
 }else{
   this.toastrService.error("Formunuz eksik")
 }
}

getBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
  })
}
getColors(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
  })
}

}
