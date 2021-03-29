import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44356/api/auth/"
  constructor(private httpClient:HttpClient) { }
  login(LoginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",LoginModel)
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }

  updatePassword(registerModel:RegisterModel,userId:number){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"updatePassword?userId="+userId,registerModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true
    }
    else{
      return false
    }
  }

  
}
