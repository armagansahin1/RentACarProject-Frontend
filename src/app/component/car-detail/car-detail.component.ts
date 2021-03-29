import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';


import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';

import { Rental } from 'src/app/models/rental/rental';


import { CardetailService } from 'src/app/service/cardetail.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ImageService } from 'src/app/service/image.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { RentalService } from 'src/app/service/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetails
  dateForm:FormGroup
  images: CarImage[];
  urlPath: string = 'https://localhost:44356';

  currentRentDate:Date
  currentReturnDate:Date
  payment:number=0
  customer:Customer
  
  constructor(
    
    private activatedRoot: ActivatedRoute,
    private router: Router,
    private carDetailService: CardetailService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private imageService:ImageService,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoot.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.createDateForm();
        this.customer=this.localStorageService.getObjectFromLocalStorage("customer")
      }
    });
  }
createDateForm(){
  this.dateForm=this.formBuilder.group({
    rentDate:["",Validators.required],
    returnDate:["",Validators.required]
  })
}
  getCarDetail(carId: number) {
    this.carDetailService.getCarByCarId(carId).subscribe(response => {
      this.carDetails=response.data
    });
  }
  getCarImagesByCarId(carId: number) {
    this.imageService.getCarImagesByCarId(carId).subscribe(response => {
      this.images = response.data;
    });
  }
  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
 


  getRentMinDate() {
    var today = new Date();

    today.setDate(today.getDate());
    return today.toISOString().slice(0, 10);
  }


 calculatePayment(){
   
   var dateRent=new Date(this.currentRentDate.toString())
   var dateReturn=new Date(this.currentReturnDate.toString())
   let day=((dateReturn.getTime()-dateRent.getTime())/86400000)+1
   this.payment=day*this.carDetails.dailyPrice
 }
 checkRentability(){
   if(this.dateForm.valid){
    let rentalModel:Rental=Object.assign({},this.dateForm.value)
    rentalModel.carId=this.carDetails.carId
    rentalModel.customerId=this.customer.customerId
    rentalModel.payment=this.payment
   this.rentalService.checkRentabilty(rentalModel).subscribe(response=>{
     this.toastrService.success("Ödeme Sayfasına Yönlendiriliyorsunuz")
      this.localStorageService.sendObjectToLocalStroge("rental",rentalModel)
      this.localStorageService.sendObjectToLocalStroge("carDetail",this.carDetails)
      this.router.navigate(["/payment"])
     
     
   },errorResponse=>{
    if(errorResponse.error.Errors.length>0){
      for (let i = 0; i < errorResponse.error.Errors.length; i++) {
        this.toastrService.error(errorResponse.error.Errors[i].Message);
      }
        
      }
    })
   }else{
     this.toastrService.info("Lütfen bir tarih aralığı belirleyiniz")
   }
   
    }
    
   
 }

      
      
    


