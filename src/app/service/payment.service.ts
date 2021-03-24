import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard} from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:44356/api/CreditCards"
  constructor(private httpClient:HttpClient) { }

  verify(creditCard:CreditCard ):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/verify"
    return this.httpClient.post<ResponseModel>(newPath,creditCard)
  }
}
