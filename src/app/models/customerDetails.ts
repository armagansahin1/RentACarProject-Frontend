import { Model } from "./model";

export interface CustomerDetails{
    customerId:Number
    
    firstName:string
    lastName:string
    email:string
    companyName?:string
    findeksPoint?:number
}