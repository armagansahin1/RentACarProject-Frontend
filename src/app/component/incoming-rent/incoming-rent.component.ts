import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RentalDto } from 'src/app/models/rental/rentalDto';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-incoming-rent',
  templateUrl: './incoming-rent.component.html',
  styleUrls: ['./incoming-rent.component.css']
})
export class IncomingRentComponent implements OnInit {

  constructor(private activatedRoot:ActivatedRoute,private rentalService:RentalService) { }
  rentals:RentalDto[]
  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["customerId"]){
        this.getInComingRents(params["customerId"])
      }
    })
  }

  getInComingRents(customerId:number){
    this.rentalService.getIncomingRentals(customerId).subscribe(response=>{
      this.rentals=response.data
    })
  } 
}
