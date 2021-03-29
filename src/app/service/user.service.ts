import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../models/claim';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44356/api/users/"
  getUser(email:string){
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getbymail?email="+email)
  }

  update(user:User){
     return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user)
  }

  getClaims(user:User){
    return this.httpClient.post<ListResponseModel<Claim>>(this.apiUrl+"getclaims",user)
  }
}
