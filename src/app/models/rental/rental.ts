import { Model } from "../model";

export interface Rental{
    customerId?:number;
    rentalId?:number
    rentDate:Date
    returnDate:Date
    payment:number
    carId:number;

}