import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/service/brand.service';
import { ColorService } from 'src/app/service/color.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
   colors:Color[]
   brands:Brand[]
   currentBrandId:number
   currentColorId:number 

  constructor(private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.getColors()
    
    this.getBrands()
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
   }

getBrands(){
  this.brandService.getBrands().subscribe(response=>{
    this.brands=response.data
  })
}
  
}
