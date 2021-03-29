import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import {CustomerDetails } from '../models/customerDetails';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl="https://localhost:44356/api/customers/"
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponseModel<CustomerDetails>>{
    return this.httpClient.get<ListResponseModel<CustomerDetails>>(this.apiUrl+"getcustomerdetails")

  }
  add(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",customer)
  }

  getByUser(userId:number){
    return this.httpClient.get<SingleResponseModel<Customer>>(this.apiUrl+"getbyuser?userId="+userId)
  }
}
