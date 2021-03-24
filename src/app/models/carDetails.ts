import { CarImage } from "./carImage";


export interface CarDetails{
    carId:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImages:CarImage[]
    
}