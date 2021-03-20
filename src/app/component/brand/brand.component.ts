import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]
  currentBrand:Brand
  removeBrand:Brand
  filterText:string="";
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands(){
   this.brandService.getBrands().subscribe(response=>{
     this.brands=response.data
   })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand
    console.log(this.currentBrand)
    
  }
  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item list-group-item-action active";
    }else{
      return "list-group-item list-group-item-action";
    }
  }
  getAllBrandsClass(){
    if(!this.currentBrand){
      return "list-group-item list-group-item-action active";
    }else{
      return "list-group-item list-group-item-action";
    }
  }
  removeCurrentBrand(){
    this.currentBrand=this.removeBrand
    console.log(this.currentBrand)
  }
  
  
}
