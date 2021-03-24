import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';


import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental/rental';


import { CardetailService } from 'src/app/service/cardetail.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ImageService } from 'src/app/service/image.service';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetails[]
  customers: Customer[];
  currentCustomer: Customer;
  images: CarImage[];
  urlPath: string = 'https://localhost:44356';

  currentRentDay: Date;
  currentReturnDay: Date;

  constructor(
    
    private activatedRoot: ActivatedRoute,
    private router: Router,
    private carDetailService: CardetailService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private imageService:ImageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoot.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.getCutomers();
      }
    });
  }

  getCarDetail(carId: number) {
    this.carDetailService.getCarByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarImagesByCarId(carId: number) {
    this.imageService.getCarImagesByCarId(carId).subscribe((response) => {
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

  getCutomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  getRentMinDate() {
    var today = new Date();

    today.setDate(today.getDate());
    return today.toISOString().slice(0, 10);
  }

  getReturnMinDate() {
    var today = new Date();

    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }

  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
  }

  addRental() {
    let rentalToAdd: Rental = {
      returnDate: this.currentReturnDay,
      rentDate: this.currentRentDay,
      carId: this.carDetails[0].carId,
      customerId: this.currentCustomer.customerId.valueOf(),
    };
     
    this.rentalService.checkRentabilty(rentalToAdd).subscribe(response=>{
      if(response.success){
        
        this.toastrService.success("Ödeme sayfasına yönlendiriliyorsunuz","Başarılı")
        this.router.navigate(["payment/",JSON.stringify(rentalToAdd)])
      }else{
        this.toastrService.error("Bu tarhiler arasında kiralanamaz","Üzgünüz")
      }
      

    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i <responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage
            ,"Doğrulama hatası")
        }       
      } 
    })
      
      
    
  }
}
