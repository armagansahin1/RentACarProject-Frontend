import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/models/rental/rental';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/service/rental.service';
import { CreditCard } from 'src/app/models/creditCard';
import { CarDetails } from 'src/app/models/carDetails';

import { CreditCardService } from 'src/app/service/creditCard.service';

import { Customer } from 'src/app/models/customer';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  carDetails: CarDetails;
  customer: Customer;
  rental: Rental;
  payment: number;
  customerCards: CreditCard[];
  askForSave: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private router: Router,
    private creditCardService: CreditCardService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
    this.customer = this.localStorageService.getObjectFromLocalStorage('customer');
    this.rental = this.localStorageService.getObjectFromLocalStorage('rental');
    this.carDetails = this.localStorageService.getObjectFromLocalStorage('carDetail');
    this.getCustomerCards();
  }
  getCustomerCards() {
    this.creditCardService
      .getCustomerCards(this.customer.customerId)
      .subscribe((response) => {
        this.customerCards = response.data;
      });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

      cvv: ['', Validators.required],
      expYear: ['', Validators.required],

      expMonth: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }
  makeAPayment() {
    this.rentalService.addRent(this.rental).subscribe(
      (response) => {
        this.toastrService.success(
          'Ödeme işleminiz Başarıyla gerçekleştirildi'
        );

        localStorage.removeItem('carDetail');
        localStorage.removeItem('rental');
        this.router.navigate(['']);
      },
      (errorResponse) => {
        if (errorResponse.error.Errors) {
          for (let i = 0; i < errorResponse.error.Errors.length; i++) {
            this.toastrService.error(errorResponse.error.Errors.Message[i]);
          }
        } else {
          this.toastrService.warning(errorResponse.error.message, 'Üzgünüz');
        }
      }
    );
  }

  checkCard() {
    if (this.paymentForm.valid) {
      let creditCardModel = Object.assign({}, this.paymentForm.value);
      this.creditCardService
        .getByCardNumber(creditCardModel.cardNumber)
        .subscribe((response) => {
          if (response.data == null) {
            this.askForSave = true;
          } else {
            this.makeAPayment();
          }
        });
    } else {
      this.toastrService.error('Kredi Kartı Bilgileriniz Eksik');
    }
  }

  saveCard() {
    let cardModel: CreditCard = Object.assign({}, this.paymentForm.value);
    cardModel.customerId = this.customer.customerId;
    this.creditCardService.add(cardModel).subscribe((response) => {
      this.toastrService.success('Kartınız Hesabınıza Kaydedildi');
      this.makeAPayment();
    });
  }
}
