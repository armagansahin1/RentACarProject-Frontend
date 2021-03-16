import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[]
  currentColor:Color
  removeColor:Color
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }
  getColors(){
   this.colorService.getColors().subscribe(response=>{
     this.colors=response.data
   })
  }
  setCurrentColor(color:Color){
    this.currentColor=color
    console.log(this.currentColor)
  }
  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item list-group-item-action active"
    }else{
      return "list-group-item list-group-item-action"
    }
  }
  removeCurrentColor(){
    this.currentColor=this.removeColor
    console.log(this.currentColor)
  }
  getAllColorsClass(){
    if(!this.currentColor){
      return "list-group-item list-group-item-action active"
    }else{
      return "list-group-item list-group-item-action"
    }
  }
  
}
