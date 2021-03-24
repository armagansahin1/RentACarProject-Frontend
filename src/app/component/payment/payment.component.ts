import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental/rental';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/service/payment.service';
import { RentalService } from 'src/app/service/rental.service';

import { CreditCard } from 'src/app/models/creditCard';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  rental: Rental;
  years:number[]=[]
  months:number[]=[]
  selectedYear:number
  selectedMonth:number

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        
      }
      this.createPaymentForm();
      this.getDates();
    });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      
      ccv: ['', Validators.required],
      expYear:['', Validators.required],
      
      expMonth: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }
  
  makeThePayment() {
    if (this.paymentForm.valid) {
      let creditCardModel:CreditCard = Object.assign({}, this.paymentForm.value);
      this.paymentService.verify(creditCardModel).subscribe((response => {
        if(response.success){
          this.rentalService.addRent(this.rental).subscribe((response=>{
            if(!response.success){
              this.toastrService.error("Seçili tarih aralığında kiralama yapılamaz")
              
            }
          }))
          this.toastrService.success("Ana menüye yönlendiriliyorsunuz","İşlem Başarılı")
          this.router.navigate(["/cars"])
        }
        else{
          this.toastrService.error(response.message)
        }
        
    }))
 }
 else{
   this.toastrService.error("Kredi Kartı Bilgileriniz Eksik !!!")
 }
}


getDates(){
  
  let currentYear=new Date().getFullYear()
  for (let i = 0; i < 50; i++) {
      this.years[i]=currentYear+i;    
    
  }
  for (let i = 0; i < 12; i++) {
    this.months[i]=i+1;
    
  }
  
}


}

