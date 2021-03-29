import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetails';
import { CarImage } from '../models/carImage';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CardetailService {
  apiUrl="https://localhost:44356/api/"
  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?brandid="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorid="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
  }
  getCarByCarId(carId:number){
    let newPath=this.apiUrl+"cars/getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetails>>(newPath)
  }

  getFilteredCars(brandId:number,colorId:number):Observable<ListResponseModel<CarDetails>>{
    let newPath=this.apiUrl+"cars/getbybrandandcolor?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath)
    
  }
}
