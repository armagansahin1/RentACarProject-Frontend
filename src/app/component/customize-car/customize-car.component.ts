import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/service/car.service';
import {FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { ColorService } from 'src/app/service/color.service';
import { BrandService } from 'src/app/service/brand.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CardetailService } from 'src/app/service/cardetail.service';
import { CarDetails } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-customize-car',
  templateUrl: './customize-car.component.html',
  styleUrls: ['./customize-car.component.css']
})
export class CustomizeCarComponent implements OnInit {

  carForm:FormGroup
  
  brands:Brand[]
  colors:Color[]
  carDetails:CarDetails[]
  carImages:CarImage[]
  currentCarId?:number
  urlPath: string = 'https://localhost:44356';
  constructor(private carService:CarService,private toastrService:ToastrService,private formBuilder:FormBuilder,private colorService:ColorService,private brandService:BrandService,
    private carDetailService:CardetailService,private imageService:ImageService) { }

  ngOnInit(): void {
    this.createCarForm()
    this.getBrands()
    this.getColors()
    this.getCarDetails()
  }
  createCarForm(){
    this.carForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      findeks:["",Validators.required]
    })
   }
   setCurrentCarId(carId?:number){
     this.currentCarId=carId
   }
 add(){
  if(this.carForm.valid){
    let carModel:Car=Object.assign({},this.carForm.value);
    this.carService.add(carModel).subscribe(response=>{
      this.toastrService.success("Araç Eklendi","Başarılı")
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
 getCarDetails(){
   this.carDetailService.getCars().subscribe(response=>{
     this.carDetails=response.data
     
     
   })
 }

getCarImages(carId:number){
  this.imageService.getCarImagesByCarId(carId).subscribe(response=>{
    this.carImages=response.data
    
  })
}

deleteCar(car:Car){
  this.carService.delete(car).subscribe(response=>{
    this.toastrService.info("Araç Silindi")
  })
}

updateCar(){
 let carModel:Car=Object.assign({},this.carForm.value)
 carModel.carId=this.currentCarId
 this.carService.update(carModel).subscribe(response=>{
   this.toastrService.success("Araç Bilgileri Güncellendi")
 })
}




}
