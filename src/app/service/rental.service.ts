import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental/rental';
import { RentalDto } from '../models/rental/rentalDto';

import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44356/api/rentals';
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath=this.apiUrl+"/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  addRent(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/add"
    
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }

  checkRentabilty(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/checkrentability"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
