import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard} from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl="https://localhost:44356/api/CreditCards"
  constructor(private httpClient:HttpClient) { }

  getByCardNumber(cardNumber:number){
    let newPath=this.apiUrl+"/getbycardnumber?cardnumber="+cardNumber
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }
  getById(creditCardId?:number){
    let newPath=this.apiUrl+"/getbyid?creditCardId="+creditCardId
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }
  add(creditCard:CreditCard){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",creditCard)
  }

  delete(creditCard:CreditCard){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete",creditCard)
  }
  update(creditCard:CreditCard){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",creditCard)
  }
  getCustomerCards(customerId?:number){
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"/getcustomercards?customerId="+customerId)
  }
}
