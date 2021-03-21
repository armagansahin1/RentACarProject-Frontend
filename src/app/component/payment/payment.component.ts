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
import { DebitCard } from 'src/app/models/debitCard';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  rental: Rental;
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
    });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      ccv: ['', Validators.required],
      expYear: ['', Validators.required],
      expMonth: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }
  getRental(){
    console.log(this.rental)
  }
  paymentAdd() {
    if (this.paymentForm.valid) {
      let debitCardModel:DebitCard = Object.assign({}, this.paymentForm.value);
      this.paymentService.verify(debitCardModel).subscribe((response => {
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
   this.toastrService.error("doğrulanamadı")
 }
}

}
