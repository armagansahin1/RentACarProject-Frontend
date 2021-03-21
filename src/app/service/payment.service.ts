import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DebitCard } from '../models/debitCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:44356/api/DebitCards"
  constructor(private httpClient:HttpClient) { }

  verify(debitCard:DebitCard ):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/verify"
    return this.httpClient.post<ResponseModel>(newPath,debitCard)
  }
}
