import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44356/api/"
  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
