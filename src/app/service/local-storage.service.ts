import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  sendObjectToLocalStroge<T>(key:string,object:T){
      localStorage.setItem(key,JSON.stringify(object))
  }

  getObjectFromLocalStorage(key:string){
    let value=localStorage.getItem(key)
       if(value){
        let object=JSON.parse(value)
        return object
       }
      
       return null
   
  }
}
