import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDto } from 'src/app/models/rental/rentalDto';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDtos:RentalDto[]
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentalDtos=response.data;
    })
  }
}
