import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
   brandForm:FormGroup
   addBrandForm:FormGroup
   brands:Brand[]
   currentBrandId?:number
  constructor(private brandService:BrandService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllBrands()
    this.createBrandForm()
  }
  createBrandForm(){
    this.brandForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
    this.addBrandForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
getAllBrands(){
  this.brandService.getBrands().subscribe(respone=>{
    this.brands=respone.data
  })
}

setCurrentBrandId(brandId?:number){
  this.currentBrandId=brandId
  console.log(this.currentBrandId)
}

update(){
  this.brandForm.patchValue({brandId:this.currentBrandId})
  let brandModel:Brand=Object.assign({},this.brandForm.value)
  if(this.brandForm.valid){
    this.brandService.update(brandModel).subscribe(response=>{
      this.toastrService.success("Marka ismi Güncellendi")
    },
    responseError=>{
      if(responseError.error.Errors){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          
        }
      }
      this.toastrService.error(responseError.error.message)
      
     
    }
    )
  }else{
    this.toastrService.error("Eksik bilgi girdiniz")
  }
}
add(){
  
  
  if(this.addBrandForm.valid){
    let brandModel:Brand=Object.assign({},this.addBrandForm.value)
    this.brandService.add(brandModel).subscribe(response=>{
      this.toastrService.success("Marka eklendi")
    },
    responseError=>{
      if(responseError.error.Errors){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          
        }
      }
      this.toastrService.error(responseError.error.message)
      
     
    }
    )
  }else{
    this.toastrService.error("Eksik bilgi girdiniz")
  }
}
refresh(){
  
  
  window.location.reload();
  
}
delete(brandName:string,brandId?:number){
  let brandToDelete:Brand={brandId:brandId,brandName:brandName}
  this.brandService.delete(brandToDelete).subscribe(response=>{
    this.toastrService.info("Marka ismi silindi !!!")
  })
}
}
