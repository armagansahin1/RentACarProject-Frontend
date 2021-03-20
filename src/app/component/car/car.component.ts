import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]
  filterText="";
  dataLoaded:boolean=false;
  urlPath:string="https://localhost:44356"
  constructor(private carService:CarService, private activatedRoot:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getFilteredCars(params["brandId"],params["colorId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      
      else{
        this.getCars();
      }
    })
    
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
    
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  getFilteredCars(brandId:number,colorId:number){
    this.carService.getFilteredCars(brandId,colorId).subscribe(response=>{
      this.cars=response.data
    })
  }
}
