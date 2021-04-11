import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  uploadImage=new FormData();
  apiUrl="https://localhost:44356/api/carimages/"

  constructor(private httpClient:HttpClient) { }
  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"getbycarid?carid="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }


}
