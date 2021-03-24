import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/service/brand.service';

import { CarService } from 'src/app/service/car.service';
import { CardetailService } from 'src/app/service/cardetail.service';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
   carForm:FormGroup
   updateToCarId:number
   car:Car[]
   brands:Brand[]
   colors:Color[]
   carDetails:CarDetails[]
  constructor(private formBuilder:FormBuilder,private carDetailsService:CardetailService,private toastrService:ToastrService,private carService:CarService,private activatedRoot:ActivatedRoute,private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["carId"]){
        this.getCar(params["carId"])
        this.getCarDetails(params["carId"])
        this.getAllBrand()
        this.getAllColor()
        this.createCarForm()
      }
      
    }
    )}
  createCarForm(){
    this.carForm=this.formBuilder.group({
      carId:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
   }
   getCar(carId:number){
    this.carService.getById(carId).subscribe(response=>{
      this.car=response.data
   })

   }

   update(){
     this.carForm.patchValue({carId: this.carDetails[0].carId})
     let carModel=Object.assign({},this.carForm.value)
     if(this.carForm.valid){
       this.carService.update(carModel).subscribe(response=>{
         this.toastrService.success("Araba Güncellendi")
       },
       responseError=>{
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage)
          }
        }
       }
       )
     }else{
       this.toastrService.error("Eksik Bilgi Girdiniz")
     }
   }
getAllBrand(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
  })
}
getAllColor(){
  this.colorService.getColors().subscribe(response=>{
    this.colors=response.data
  })
}
getCarDetails(carId:number){
  this.carDetailsService.getCarByCarId(carId).subscribe(response=>{
    this.carDetails=response.data
  })
}

}
