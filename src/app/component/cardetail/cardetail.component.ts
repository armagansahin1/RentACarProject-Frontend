import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/service/car.service';
import { CardetailService } from 'src/app/service/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
   
  cars:Car[]
  images:CarImage[];
  urlPath:string="https://localhost:44356"
  constructor(private carService:CarService,private activatedRoot:ActivatedRoute,private carDetailService:CardetailService) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImagesByCarId(params["carId"])
      }
      })
    
  }
  getCarDetail(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response=>{
     this.cars=response.data
    })
     
  }
  getCarImagesByCarId(carId:number){
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data
    })
     
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
  
}
