import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { DataResponseModel } from '../models/dataResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44356/api/cars/"
  constructor(private httpClient:HttpClient) { }
  
    add(car:Car):Observable<ResponseModel>{
      let newUrl=this.apiUrl+"add"
      return this.httpClient.post<ResponseModel>(newUrl,car)
    }
    update(car:Car):Observable<ResponseModel>{
      let newUrl=this.apiUrl+"update"
      return this.httpClient.post<ResponseModel>(newUrl,car)
    }
    delete(car:Car):Observable<ResponseModel>{
      let newUrl=this.apiUrl+"delete"
      return this.httpClient.post<ResponseModel>(newUrl,car)
    }
    getById(carId:number):Observable<ListResponseModel<Car>>{
      let newUrl=this.apiUrl+"getbyid"
      return this.httpClient.get<ListResponseModel<Car>>(newUrl)
    }
}
