import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';

import { CarDetails } from 'src/app/models/carDetails';
import { CarService } from 'src/app/service/car.service';

import { CardetailService } from 'src/app/service/cardetail.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  carDetails:CarDetails[]
  filterText="";
  dataLoaded:boolean=false;
  carForm:FormGroup
  urlPath:string="https://localhost:44356"
  constructor(private carDetailService:CardetailService, private activatedRoot:ActivatedRoute,private carService:CarService,
    private toastrService:ToastrService,private formBuilder:FormBuilder) { }

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
    this.carDetailService.getCars().subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
    
  }
  getCarsByBrand(brandId:number){
    this.carDetailService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
  }
  getCarsByColor(colorId:number){
    this.carDetailService.getCarsByColor(colorId).subscribe(response=>{
      this.carDetails=response.data
      this.dataLoaded=true
    })
  }

  getFilteredCars(brandId:number,colorId:number){
    this.carDetailService.getFilteredCars(brandId,colorId).subscribe(response=>{
      this.carDetails=response.data
    })
  }

  deleteCar(carId:number){
    let deleteToCar:Car={carId:carId}
    this.carService.delete(deleteToCar).subscribe(response=>{
      this.toastrService.error("Araç Silindi")
    })
  }
 

   
}
