import { Model } from "./model";

export interface CarImage extends Model{
    carImageId:number
    carId:number
    imagePath:string
    date:Date
}