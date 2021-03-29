import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalDto } from 'src/app/models/rental/rentalDto';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-past-rentals',
  templateUrl: './past-rentals.component.html',
  styleUrls: ['./past-rentals.component.css']
})
export class PastRentalsComponent implements OnInit {

  constructor(private rentalService:RentalService,private activatedRoot:ActivatedRoute) { }
  rentals:RentalDto[]
  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["customerId"]){
        this.getPastRents(params["customerId"])
      }
    })
  }
 
  getPastRents(customerId:number){
    this.rentalService.getPastRentals(customerId).subscribe(response=>{
      this.rentals=response.data
    })
  }
}
