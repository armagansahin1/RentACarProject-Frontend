import { Model } from "./model";

export interface Customer extends Model{
    customerId:Number
    firstName:string
    lastName:string
    email:string
    companyName:string
}