import { CarImage } from "./carImage";
import { Model } from "./model";

export interface Car extends Model{
    carId:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    carImages:CarImage[]
    
}