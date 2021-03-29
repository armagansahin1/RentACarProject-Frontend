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
   brands:Brand[]
   colors:Color[]
   updateCarId:number
   carDetails:CarDetails
  constructor(private formBuilder:FormBuilder,private carDetailsService:CardetailService,private toastrService:ToastrService,private carService:CarService,private activatedRoot:ActivatedRoute,private brandService:BrandService,
    private colorService:ColorService) { }
   
  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["carId"]){
        this.getBrands()
        this.getColors()
        this.createCarForm()
        this.getCarDetails(params["carId"])
        this.updateCarId=JSON.parse(params["carId"])
        
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
getCarDetails(carId:number){
  this.carDetailsService.getCarByCarId(carId).subscribe(response=>{
    this.carDetails=response.data
    console.log(this.carDetails)
  })
}
update(){
  this.carForm.patchValue({carId:this.updateCarId})
  if(this.carForm.valid){
    
    let carModel=Object.assign({},this.carForm.value)
    this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success("Araç güncellendi")
    },errorResponse=>{
      if(errorResponse.error.Errors.length>0){
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.info((errorResponse.error.Errors[i].ErrorMessage))
        
        }
      }
    })
  }else{
    this.toastrService.info("Eksik bilgi girdiniz")
  }
}

}
